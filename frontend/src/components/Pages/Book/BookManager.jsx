import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { DataContext } from "../../../context/DataProvider";
import useFetch from "../../../hooks/useFetch";
// import DeleteCollection from "./DeleteCollection";

export default function BookManager({ id }) {
    const { token } = useContext(AuthContext);
    const { setRefresh } = useContext(DataContext);

    const [submitUrl, setSubmitUrl] = useState();
    const [submitOptions, setSubmitOptions] = useState();
    const { data, loading, error } = useFetch(submitUrl, submitOptions);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const collectionToUpdate = {};

        if (document.getElementById('name').value !== "") {
            collectionToUpdate['name'] = document.getElementById('name').value;
        }
        if (document.getElementById('description').value !== "") {
            collectionToUpdate['description'] = document.getElementById('description').value;
        }

        setSubmitUrl(`api/collection/${id}`);
        setSubmitOptions({
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                collectionToUpdate
            ),
        });
 
        document.getElementById('name').value = "";
        document.getElementById('description').value = "";
    }

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            setRefresh(refresh => !refresh)
            console.log("Refreshing...")
        }
    }, [data, setRefresh]);


    return (
        <div className='container'>
            <div className="row row-cols-1 g-5">
                <div className='col-md-6 mb-3'>
                    <h4>Update Collection</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="d-grid gap-3 mt-3 mb-3">
                            <input className="form-control" type="text" id="name" placeholder="Name of Collection"></input>
                            <textarea className="form-control" type="description" id="description" placeholder="Describe your collection"></textarea>
                        </div>
                        <div className="col-md-5 d-grid gap-3 mb-3">
                            <button className="btn btn-secondary" type="submit">Update</button>
                        </div>
                    </form >
                  {/* <DeleteCollection id = {id} token = {token}/> */}
                </div >
                <div className='col-md-6 mb-3'>
                    {loading && <div>Updating collection...</div>}
                    {error && <div className="mb-5 text-danger">Error: Failed to update collection.</div>}
                </div>
            </div >
        </div >
    );
}