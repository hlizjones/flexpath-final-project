import React from "react";
import useCreateRequest from "../../../hooks/useCreateRequest";
import useMessageTimeout from "../../../hooks/useMessageTimeout";


export default function AddToCollectionForm({ formData, bookId }) {
    const { handleRequest, data, loading, error } = useCreateRequest();
    useMessageTimeout(data, error);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRequest(null, `api/book_collection?bookId=${bookId}&collectionId=${document.getElementById("selectCollection").value}`, "POST");
    }

    return (
        <div>
            <h4>Add book to a collection.</h4>
            <form aria-label="form" onSubmit={handleSubmit}>
                <div className="d-grid gap-3 mt-3 mb-3">
                    {Object.keys(formData).length === 0 && <select className="form-select" name="selectCollection" id="selectCollection" disabled><option>Create a collection to add books.</option></select>}
                    {Object.keys(formData).length > 0 && <select className="form-select" name="selectCollection" id="selectCollection" >
                        {formData.map(el => {
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
                        {Object.keys(formData).length === 0 && <button className="btn btn-secondary" type="submit" disabled>Add</button>}
                        {Object.keys(formData).length > 0 && <button className="btn btn-secondary" type="submit">Add</button>}
                    </div>
                </div>
            </form>
            {Object.keys(data).length > 0 && <div className="visible" id="dataMsg">{data}</div>}
            {loading && <div>Adding book...</div>}
            {error && <div className="visible mb-5 text-danger" id="errorMsg">Error: Failed to add book.</div>}
        </div>
    )
}