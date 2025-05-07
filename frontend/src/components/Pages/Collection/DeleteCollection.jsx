import React, { useEffect } from "react";
import useCreateRequest from "../../../hooks/useCreateRequest";
import { useNavigate } from "react-router-dom";
import useLoadPage from "../../../hooks/useLoadPage";
import useMessageTimeout from "../../../hooks/useMessageTimeout";

export default function DeleteCollection({ collectionId }) {
    const navigate = useNavigate();
    const { handleLoad } = useLoadPage();
    const { handleRequest, data, loading, error } = useCreateRequest();
    useMessageTimeout(error);


    const handleDeleteButton = () => {
        handleRequest(null, `api/collection/${collectionId}`, "DELETE");
    }

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            handleLoad(`api/collection?profile=true`, `profile`);
        }
    }, [data, navigate, handleLoad]);


    return (
        <div className="col-md-5 d-grid gap-3 mb-3">
            <button className="btn btn-danger" type="button" onClick={handleDeleteButton}>Delete collection</button>
            {loading && <div>Deleting collection...</div>}
            {error && <div className="visible mb-5 text-danger" id="errorMsg">Error: Failed to delete collection.</div>}
        </div>
    )
}