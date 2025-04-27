import React from "react";
import useCreateRequest from "../../hooks/useCreateRequest";
import useLoadPage from "../../hooks/useLoadPage";
import useMessageTimeout from "../../hooks/useMessageTimeout";

export default function CreateBook() {
    const { handleRequest, data, loading, error } = useCreateRequest();
    const { handleLoad } = useLoadPage();
    useMessageTimeout(error);


    const handleSubmit = (e) => {
        e.preventDefault();
        const object = { 'title': document.getElementById('title').value,
            'author': document.getElementById('author').value,
            'genre': document.getElementById('genre').value,
         }

         handleRequest(object, "api/book", "POST");

        document.getElementById('title').value = " ";
        document.getElementById('author').value = " ";
        document.getElementById('genre').value = " ";
    }

    const handleClick = (e) => {
        e.preventDefault();
        handleLoad(`api/book/${data.id}`, `book`);
    }

    return (
        <div className='container'>
            <div className="row row-cols-1 g-5">
                <div className='col-md-6 mb-3 p-5'>
                    <h4>Create new book.</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="d-grid gap-3 mt-3 mb-3">
                            <input className="form-control" type="text" id="title" placeholder="Title of Book" required></input>
                            <input className="form-control" type="text" id="author" placeholder="Author of Book" required></input>
                            <input className="form-control" type="text" id="genre" placeholder="Genre of Book" required></input>
                        </div>
                        <div className="col-md-5 d-grid gap-3 mb-3">
                            <button className="btn btn-secondary" type="submit">Create</button>
                        </div>
                    </form >
                    {loading && <div>Creating book...</div>}
                    {error && <div className="visible mb-5 text-danger" id="errorMsg">Error: Failed to create book.</div>}
                    {Object.keys(data).length > 0 && <button className="btn btn-outline-success" type="button" onClick={handleClick}>Go to book!</button>}
                </div >
            </div >
        </div >
    );
}