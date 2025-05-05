import React, { useEffect } from "react";
import useCreateRequest from "../../../hooks/useCreateRequest";
import { useNavigate } from "react-router-dom";
import useMessageTimeout from "../../../hooks/useMessageTimeout";

export default function DeleteBook({ id }) {
    const navigate = useNavigate();
    const { handleRequest, data, loading, error } = useCreateRequest();
    useMessageTimeout(error);

    const handleDeleteButton = () => {
        handleRequest(null, `api/book/${id}`, "DELETE");
    }

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            navigate(`/search`);
        }
    }, [data, navigate]);


    return (
        <div className="col-md-5 d-grid gap-3 mb-3">
            <button className="btn btn-danger" type="button" onClick={handleDeleteButton}>Delete book</button>
            {loading && <div>Deleting book...</div>}
            {error && <div className="visible mb-5 text-danger" id="errorMsg">Error: Failed to delete book.</div>}
        </div>
    )
}