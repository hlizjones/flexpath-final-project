import React, { useContext, useEffect } from "react";
import { DataContext } from "../../../context/DataProvider";
import useCreateRequest from "../../../hooks/useCreateRequest";
import { useNavigate } from "react-router-dom";
import useLoadPage from "../../../hooks/useLoadPage";


export default function ReviewManager({ id, bookId }) {
    const { setRefresh } = useContext(DataContext);
    const navigate = useNavigate();
    const { handleRequest, data, loading, error } = useCreateRequest();
    const { handleRequest: handleDelete, data: deleteReviewData, loading: deleteReviewLoading, error: deleteReviewError } = useCreateRequest();
    const { handleLoad } = useLoadPage();

    const handleSubmit = (e) => {
        e.preventDefault();

        const object = {};
        if (document.getElementById('rating').value !== "") {
            object['rating'] = document.getElementById('rating').value;
        }
        if (document.getElementById('content').value !== "") {
            object['content'] = document.getElementById('content').value;
        }

        handleRequest(object, `api/review/${id}?bookId=${bookId}`, "PUT");

        document.getElementById('rating').value = "";
        document.getElementById('content').value = "";
    }

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            setRefresh(refresh => !refresh)
        }
    }, [data, setRefresh]);

    const handleDeleteButton = () => {
        handleDelete(null, `api/review/${id}`, "DELETE")
    }

    useEffect(() => {
        if (Object.keys(deleteReviewData).length > 0) {
            handleLoad(`api/book/${bookId}`, 'book');
        }
    }, [deleteReviewData, navigate, bookId, handleLoad]);

    return (
        <div className='container mt-5'>
            <div className='d-flex justify-content-center'>
                <div className='col-md-6 mb-3'>
                    <h4>Update your review.</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="d-grid gap-3 mb-3">
                            <input className="form-control" type="number" min="1" max="5" id="rating" placeholder="Rating"></input>
                            <textarea className="form-control" type="search" id="content" placeholder="Share your thoughts"></textarea>
                        </div>
                        <div className="d-grid gap-3 mb-3">
                            <button className="btn btn-secondary" type="submit">Update Review</button>
                        </div>
                    </form>
                    <div className="d-grid gap-3 mb-3">
                        <button className="btn btn-danger" type="button" onClick={handleDeleteButton}>Delete review</button>
                    </div>
                    <div className='col-md-6 mb-3'>
                        {loading && <div>Updating review...</div>}
                        {error && <div className="mb-5 text-danger">Error: Failed to update review.</div>}
                        {deleteReviewLoading && <div>Deleting review...</div>}
                        {deleteReviewError && <div className="mb-5 text-danger">Error: Failed to delete review.</div>}
                    </div>
                </div>
            </div >
        </div>
    );

}