import React, { useContext, useEffect } from "react";
import { DataContext } from "../../../context/DataProvider";
import useCreateRequest from "../../../hooks/useCreateRequest";
import useMessageTimeout from "../../../hooks/useMessageTimeout";
import DeleteBook from "./DeleteBook";

export default function BookManager({ show, setShow, bookId }) {
    const { setRefresh } = useContext(DataContext);
    const { handleRequest, data, loading, error } = useCreateRequest();
    useMessageTimeout(error);

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

        handleRequest(object, `api/book/${bookId}`, "PUT");

        document.getElementById('title').value = "";
        document.getElementById('author').value = "";
        document.getElementById('genre').value = "";
    }

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            setShow(false);
            setRefresh(refresh => !refresh);
        }
    }, [data, setRefresh, setShow]);

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
                            <DeleteBook bookId={bookId} />
                        </div >
                        <div className='col-md-6 mb-3'>
                            {loading && <div>Updating book...</div>}
                            {error && <div className="visible mb-5 text-danger" id="errorMsg">Error: Failed to update book.</div>}
                        </div>
                    </div >
                </div >
            }
        </>
    );
}