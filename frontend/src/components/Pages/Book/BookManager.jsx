import React, { useContext, useEffect } from "react";
import { DataContext } from "../../../context/DataProvider";
import useCreateRequest from "../../../hooks/useCreateRequest";
import { useNavigate } from "react-router-dom";

export default function BookManager({show, setShow, id}) {
    const { setRefresh } = useContext(DataContext);
    const navigate = useNavigate();
    const { handleRequest, data, loading, error } = useCreateRequest();
    const { handleRequest: handleDelete, data: deleteBookData, loading: deleteBookLoading, error: deleteBookError } = useCreateRequest();

    const handleSubmit = (e) => {
        e.preventDefault();
        const object = {};
        if (document.getElementById('title').value !== "") {
            object['title'] = document.getElementById('title').value;
        }
        if (document.getElementById('author').value !== "") {
            object['author'] = document.getElementById('author').value;
        }
        if (document.getElementById('genre').value !== "") {
            object['genre'] = document.getElementById('genre').value;
        }

        handleRequest(object, `api/book/${id}`, "PUT");

        document.getElementById('title').value = "";
        document.getElementById('author').value = "";
        document.getElementById('genre').value = "";
    }

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            setShow(false)
            setRefresh(refresh => !refresh)
        }
    }, [data, setRefresh]);

    const handleDeleteButton = () => {
        handleDelete(null, `api/book/${id}`, "DELETE")
    }

    useEffect(() => {
        if (Object.keys(deleteBookData).length > 0) {
            navigate(`/search`);
        }
    }, [deleteBookData, navigate]);
    console.log(show)

    return (
        <>
        {show &&
        <div className='container'>
            <div className="row row-cols-1 g-5">
                <div className='col-md-6 mb-3'>
                    <h4>Update book.</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="d-grid gap-3 mt-3 mb-3">
                            <input className="form-control" type="text" id="title" placeholder="Title"></input>
                            <input className="form-control" type="text" id="author" placeholder="Author"></input>
                            <input className="form-control" type="text" id="genre" placeholder="Genre"></input>
                        </div>
                        <div className="col-md-5 d-grid gap-3 mb-3">
                            <button className="btn btn-secondary" type="submit">Update</button>
                        </div>
                    </form >
                    <div className="col-md-5 d-grid gap-3 mb-3">
                        <button className="btn btn-danger" type="button" onClick={handleDeleteButton}>Delete book</button>
                    </div>
                </div >
                <div className='col-md-6 mb-3'>
                    {loading && <div>Updating book...</div>}
                    {error && <div className="mb-5 text-danger">Error: Failed to update book.</div>}
                    {deleteBookLoading && <div>Deleting book...</div>}
                    {deleteBookError && <div className="mb-5 text-danger">Error: Failed to delete book.</div>}
                </div>
            </div >
        </div >
}
        </>
    );
}