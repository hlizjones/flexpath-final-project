import React, { useContext, useEffect } from "react";
import { DataContext } from "../../../context/DataProvider";
import useCreateRequest from "../../../hooks/useCreateRequest";
import { useNavigate } from "react-router-dom";
import useLoadPage from "../../../hooks/useLoadPage";
import useMessageTimeout from "../../../hooks/useMessageTimeout";

export default function CollectionManager({ id }) {
    const { setRefresh } = useContext(DataContext);
    const navigate = useNavigate();
    const { handleLoad } = useLoadPage();
    const { handleRequest, data, loading, error } = useCreateRequest();
    const { handleRequest: handleDelete, data: deleteCollectionData, loading: deleteCollectionLoading, error: deleteCollectionError } = useCreateRequest();
    useMessageTimeout(data);
    useMessageTimeout(deleteCollectionError);

    const handleSubmit = (e) => {
        e.preventDefault();

        const object = {};
        if (document.getElementById('name').value !== "") {
            object['name'] = document.getElementById('name').value;
        }
        if (document.getElementById('description').value !== "") {
            object['description'] = document.getElementById('description').value;
        }

        handleRequest(object, `api/collection/${id}`, "PUT");

        document.getElementById('name').value = "";
        document.getElementById('description').value = "";
    }

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            setRefresh(refresh => !refresh);
        }
    }, [data, setRefresh]);

    const handleDeleteButton = () => {
        handleDelete(null, `api/collection/${id}`, "DELETE");
    }

    useEffect(() => {
        if (Object.keys(deleteCollectionData).length > 0) {
            handleLoad(`api/collection?profile=true`, `profile`);
        }
    }, [deleteCollectionData, navigate, handleLoad]);

    return (
        <div className='container'>
            <div className="row row-cols-1 g-5">
                <div className='col-md-6 mb-3'>
                    <h4>Update your book collection.</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="d-grid gap-3 mt-3 mb-3">
                            <input className="form-control" type="text" id="name" placeholder="Name of Collection"></input>
                            <textarea className="form-control" type="description" id="description" placeholder="Describe your collection"></textarea>
                        </div>
                        <div className="col-md-5 d-grid gap-3 mb-3">
                            <button className="btn btn-secondary" type="submit">Update</button>
                        </div>
                    </form >
                    <div className="col-md-5 d-grid gap-3 mb-3">
                        <button className="btn btn-danger" type="button" onClick={handleDeleteButton}>Delete collection</button>
                    </div>
                </div >
                <div className='col-md-6 mb-3'>
                    {loading && <div>Updating collection...</div>}
                    {error && <div className="visible mb-5 text-danger" id="errorMsg">Error: Failed to update collection.</div>}
                    {deleteCollectionLoading && <div>Deleting collection...</div>}
                    {deleteCollectionError && <div className="visible mb-5 text-danger" id="errorMsg">Error: Failed to delete collection.</div>}
                </div>
            </div >
        </div >
    );
}