import React, { useContext, useEffect } from "react";
import { DataContext } from "../../../context/DataProvider";
import useCreateRequest from "../../../hooks/useCreateRequest";
import useMessageTimeout from "../../../hooks/useMessageTimeout";
import DeleteReview from "./DeleteReview";

export default function ReviewManager({ reviewId, bookId }) {
    const { setRefresh } = useContext(DataContext);
    const { handleRequest, data, loading, error } = useCreateRequest();
    useMessageTimeout(error);

    const handleSubmit = (e) => {
        e.preventDefault();

        const object = {};
        if (document.getElementById('rating').value !== "") {
            object['rating'] = document.getElementById('rating').value;
        }
        if (document.getElementById('content').value !== "") {
            object['content'] = document.getElementById('content').value;
        }

        handleRequest(object, `api/review/${reviewId}?bookId=${bookId}`, "PUT");

        document.getElementById('rating').value = "";
        document.getElementById('content').value = "";
    }

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            setRefresh(refresh => !refresh);
        }
    }, [data, setRefresh]);

    return (
        <div className='container mt-5'>
            <div className='d-flex justify-content-center'>
                <div className='col-md-6 mb-3'>
                    <h4>Update your review.</h4>
                    <form aria-label="form" onSubmit={handleSubmit}>
                        <div className="d-grid gap-3 mb-3">
                            <input className="form-control" type="number" min="1" max="5" id="rating" placeholder="Rating"></input>
                            <textarea className="form-control" type="search" id="content" placeholder="Share your thoughts"></textarea>
                        </div>
                        <div className="d-grid gap-3 mb-3">
                            <button className="btn btn-secondary" type="submit">Update Review</button>
                        </div>
                    </form>
                    <DeleteReview reviewId={reviewId} bookId={bookId} />
                    <div className='col-md-6 mb-3'>
                        {loading && <div>Updating review...</div>}
                        {error && <div className="visible mb-5 text-danger" id="errorMsg">Error: Failed to update review.</div>}
                    </div>
                </div>
            </div >
        </div>
    );
}