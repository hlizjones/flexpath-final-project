import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import useFetch from "../../../hooks/useFetch";

export default function CreateCollection({setRefresh}) {
    const { token } = useContext(AuthContext);
    const [url, setUrl] = useState();
    const [body, setBody] = useState();
    const { data, loading, error } = useFetch(url, body);

    const handleSubmit = (e) => {
        e.preventDefault();
        setUrl(`api/collection`);

        const collectionToCreate = { 'name': document.getElementById('name').value };

        if (document.getElementById('description').value !== "") {
            collectionToCreate['description'] = document.getElementById('description').value;
        }
        if (document.getElementById('favorite').checked) {
            collectionToCreate['favorite'] = true;
        } else {
            collectionToCreate['favorite'] = false;
        }
        if (document.getElementById('privacy').checked) {
            collectionToCreate['privacy'] = true;
        } else {
            collectionToCreate['privacy'] = false;
        }

        setBody({
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                collectionToCreate
            ),
        });

        document.getElementById('name').value = "";
        document.getElementById('description').value = "";
        document.getElementById('favorite').checked = false;
        document.getElementById('privacy').checked = false;

    }
    
    useEffect(() => {
        if(Object.keys(data).length > 0) {
        setRefresh(refresh => !refresh)
        }
    }, [data]);

    return (
        <div className='container'>
            <div className="row row-cols-1 g-5">
                <div className='col-md-6 mb-3'>
                    <h4>Create new collection.</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="d-grid gap-3 mt-3 mb-3">
                            <input className="form-control" type="text" id="name" placeholder="Name of Collection" required></input>
                            <textarea className="form-control" type="description" id="description" placeholder="Describe your collection"></textarea>
                            <div className="form-check">
                                <label className="form-label text-nowrap" htmlFor="favorite" >Favorite</label>
                                <input className="form-check-input" type="checkbox" id="favorite"></input>
                            </div>
                            <div className="form-check" >
                                <label className="form-label text-nowrap" htmlFor="privacy" >Privacy</label>
                                <input className="form-check-input" type="checkbox" id="privacy"></input>
                            </div>
                        </div>
                        <div className="col-md-5 d-grid gap-3 mb-3">
                            <button className="btn btn-secondary" type="submit">Create</button>
                        </div>
                    </form >
                </div >
                <div className='col-md-6 mb-3'>
                    {loading && <div>Creating collection...</div>}
                    {error && <div className="mb-5 text-danger">Error: Failed to create collection.</div>}
                </div>
            </div >
        </div >
    );
}