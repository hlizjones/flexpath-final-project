import React, { useEffect } from "react";
import useCreateRequest from "../../../hooks/useCreateRequest";
import { useNavigate } from "react-router-dom";
import useLoadPage from "../../../hooks/useLoadPage";
import useMessageTimeout from "../../../hooks/useMessageTimeout";

export default function DeleteReview({ reviewId, bookId }) {
    const navigate = useNavigate();
    const { handleRequest: handleDelete, data: deleteReviewData, loading: deleteReviewLoading, error: deleteReviewError } = useCreateRequest();
    const { handleLoad } = useLoadPage();
    useMessageTimeout(deleteReviewError);

    const handleDeleteButton = () => {
        handleDelete(null, `api/review/${reviewId}`, "DELETE");
    }

    useEffect(() => {
        if (Object.keys(deleteReviewData).length > 0) {
            handleLoad(`api/book/${bookId}`, 'book');
        }
    }, [deleteReviewData, navigate, bookId, handleLoad]);

    return (
        <div className="d-grid gap-3 mb-3">
            <button className="btn btn-danger" type="button" onClick={handleDeleteButton}>Delete review</button>
            {deleteReviewLoading && <div>Deleting review...</div>}
            {deleteReviewError && <div className="visible mb-5 text-danger" id="errorMsg">Error: Failed to delete review.</div>}
        </div>
    );
}