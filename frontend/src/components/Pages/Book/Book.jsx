import React, { useContext, useState } from "react";
import { DataContext } from "../../../context/DataProvider";
import { AuthContext } from "../../../context/AuthProvider";
import BookReviewsTable from "./BookReviewTable";
import CreateReview from "./CreateReview";
import AddToCollection from "./AddToCollection";
import BookManager from "./BookManager";

export default function Book() {
    const { role } = useContext(AuthContext)
    const { data, loading, error } = useContext(DataContext)
    const [show, setShow] = useState(false)

    const reveal = (e) => {
        e.preventDefault();
        setShow(show => !show)
    }
    console.log("book", data.id)

    if (loading) return <div>Loading book...</div>;
    if (error) return <div className="mb-5 text-danger">Error: Failed to load book.</div>
    return (
        <>
            <div className="container text-center mb-3">
                <h1>Title: {data.title}</h1>
                <h4 className="mb-3">Author: {data.author} | Genre: {data.genre}</h4>
                <div className="d-flex justify-content-center"><button className="btn btn-outline-secondary col-2" type="button" onClick={reveal}>Edit book</button></div>
            </div>
            <div className="container mb-5"> 
                {(role === "ADMIN" && show) && <BookManager id = {data.id} show ={show} setShow = {setShow}/>}
            </div>
            <div className="container mb-5">
                <div className="row g-5">
                    <div className="col">
                        <AddToCollection/>
                    </div>
                    <div className="col">
                        <CreateReview id = {data.id} />
                    </div>
                </div>
            </div >
            <BookReviewsTable bookId={data.id} />
        </>
    );
}