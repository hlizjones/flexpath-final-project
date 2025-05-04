import React, { useContext, useEffect } from "react";
import { DataContext } from "../../../context/DataProvider";
import useCreateRequest from "../../../hooks/useCreateRequest";
import useMessageTimeout from "../../../hooks/useMessageTimeout";

export default function CreateCollection() {
    const { setRefresh } = useContext(DataContext);
    const { handleRequest, data, loading, error } = useCreateRequest();
    useMessageTimeout(error);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(document.getElementById('collectionName'))
        const object = { 'name': document.getElementById('collectionName').value };
        if (document.getElementById('description').value !== "") {
            object['description'] = document.getElementById('description').value;
        }
        if (document.getElementById('favorite').checked) {
            object['favorite'] = true;
        } else {
            object['favorite'] = false;
        }
        if (document.getElementById('privacy').checked) {
            object['privacy'] = true;
        } else {
            object['privacy'] = false;
        }
        console.log(object)

        handleRequest(object, "api/collection", "POST");

        document.getElementById('collectionName').value = "";
        document.getElementById('description').value = "";
        document.getElementById('favorite').checked = false;
        document.getElementById('privacy').checked = false;
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
                    <h4>Create new book collection.</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="d-grid gap-3 mt-3 mb-3">
                            <input className="form-control" type="text" id="collectionName" placeholder="Name of Collection" required></input>
                            <textarea className="form-control" type="description" id="description" placeholder="Describe your collection"></textarea>
                            <div className="form-check">
                                <label className="form-label text-nowrap" htmlFor="favorite" >Favorite</label>
                                <input className="form-check-input" type="checkbox" id="favorite"></input>
                            </div>
                            <div className="form-check" >
                                <label className="form-label text-nowrap" htmlFor="privacy" >Private</label>
                                <input className="form-check-input" type="checkbox" id="privacy"></input>
                            </div>
                        </div>
                        <div className="col-md-5 d-grid gap-3 mb-3">
                            <button className="btn btn-secondary" type="submit">Create</button>
                        </div>
                    </form >
                    {loading && <div>Creating collection...</div>}
                    {error && <div className="visible mb-5 text-danger" id="errorMsg">Error: Failed to create collection.</div>}
                </div >
            </div >
        </div >
    );
}