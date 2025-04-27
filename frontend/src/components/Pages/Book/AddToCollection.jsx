import React, { useContext, useMemo } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import useFetch from "../../../hooks/useFetch";
import useCreateRequest from "../../../hooks/useCreateRequest";
import useMessageTimeout from "../../../hooks/useMessageTimeout";

export default function AddToCollection({ id }) {
    const { token, username, role } = useContext(AuthContext);
    const { handleRequest, data: addBookData, loading: addBookLoading, error: addBookError } = useCreateRequest();
    useMessageTimeout(addBookData, addBookError);

    let urlToMemoize;
    if (role === "ADMIN") {
        urlToMemoize = `api/collection`
    } else {
        urlToMemoize = `api/collection?username=${username}`
    }
    const url = useMemo(() => urlToMemoize, [urlToMemoize]);
    const options = useMemo(() => ({ headers: { 'Authorization': `Bearer ${token}` } }), [token]);
    const { data } = useFetch(url, options)

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRequest(null, `api/book_collection?bookId=${id}&collectionId=${document.getElementById("selectCollection").value}`, "POST");
    }

    return (
        <div>
            <h4>Add book to a collection.</h4>
            <form onSubmit={handleSubmit}>
                <div className="d-grid gap-3 mt-3 mb-3">
                    {Object.keys(data).length === 0 && <select className="form-select" name="selectCollection" id="selectCollection" disabled><option selected>Create a collection to add books.</option></select>}
                    {Object.keys(data).length > 0 && <select className="form-select" name="selectCollection" id="selectCollection" >
                        {data.map(el => {
                            return (
                                Object.entries(el).map(([key, value]) => {
                                    if (key === "name") {
                                        return (
                                            <option value={el.id} key={el.id + el.name}>{value}</option>
                                        )
                                    }
                                })
                            )
                        })}
                    </select>}
                    <div className="col-md-5 d-grid gap-3 mb-3">
                        {Object.keys(data).length === 0 && <button className="btn btn-secondary" type="submit" disabled>Add</button>}
                        {Object.keys(data).length > 0 && <button className="btn btn-secondary" type="submit">Add</button>}
                    </div>
                </div>
            </form>
            {Object.keys(addBookData).length > 0 && <div className="visible" id="dataMsg">{addBookData}</div>}
            {addBookLoading && <div>Adding book...</div>}
            {addBookError && <div className="visible mb-5 text-danger" id="errorMsg">Error: Failed to create book.</div>}
        </div>

    );
}