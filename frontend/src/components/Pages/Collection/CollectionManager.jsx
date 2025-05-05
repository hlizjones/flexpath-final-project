import React, { useContext, useEffect } from "react";
import { DataContext } from "../../../context/DataProvider";
import useCreateRequest from "../../../hooks/useCreateRequest";
import useMessageTimeout from "../../../hooks/useMessageTimeout";
import DeleteCollection from "./DeleteCollection";

export default function CollectionManager({ id }) {
    const { setRefresh } = useContext(DataContext);
    const { handleRequest, data, loading, error } = useCreateRequest();
    useMessageTimeout(data);

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
                    <DeleteCollection id={id} />
                </div >
                <div className='col-md-6 mb-3'>
                    {loading && <div>Updating collection...</div>}
                    {error && <div className="visible mb-5 text-danger" id="errorMsg">Error: Failed to update collection.</div>}
                </div>
            </div >
        </div >
    );
}