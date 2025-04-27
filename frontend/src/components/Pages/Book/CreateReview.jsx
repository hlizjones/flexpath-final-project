import React, { useContext, useEffect } from "react";
import { DataContext } from "../../../context/DataProvider";
import useCreateRequest from "../../../hooks/useCreateRequest";
import useMessageTimeout from "../../../hooks/useMessageTimeout";

export default function CreateReview({id}) {
    const { setRefresh } = useContext(DataContext);
    const { handleRequest, data, loading, error } = useCreateRequest();
    useMessageTimeout(error);

    const handleSubmit = (e) => {
        e.preventDefault();

        const object = { 'rating': document.getElementById('rating').value};
        if (document.getElementById('content').value !== "") {
            object['content'] = document.getElementById('content').value;
        }
        if (document.getElementById('privacy').checked) {
            object['privacy'] = true;
        } else {
            object['privacy'] = false;
        }

        handleRequest(object, `api/review?bookId=${id}`, "POST");

        document.getElementById('rating').value = "";
        document.getElementById('content').value = "";
        document.getElementById('privacy').checked = false;
    }

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            console.log(data)
            setRefresh(refresh => !refresh);
        }
    }, [data, setRefresh]);

    return (
        <div>
            <h4>Create new review.</h4>
            <form onSubmit={handleSubmit}>
                <div className="d-grid gap-3 mt-3 mb-3">
                <input className="form-control" type="number" min="1" max="5" id="rating" placeholder="Rating"></input>
                <textarea className="form-control" type="search" id="content" placeholder="Share your thoughts"></textarea>
                    <div className="form-check" >
                        <label className="form-label text-nowrap" htmlFor="privacy" >Private</label>
                        <input className="form-check-input" type="checkbox" id="privacy"></input>
                    </div>
                </div>
                <div className="col-md-5 d-grid gap-3 mb-3">
                    <button className="btn btn-secondary" type="submit">Create</button>
                </div>
            </form >
            <div className='col-md-6 mb-3'>
                {loading && <div>Creating review...</div>}
                {error && <div className="visible mb-5 text-danger" id="errorMsg">Error: Failed to create review.</div>}
            </div>
        </div>
    );
}