import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../context/DataProvider";
import { AuthContext } from "../../../context/AuthProvider";
import BookReviewsTable from "./BookReviewsTable";
import CreateReview from "./CreateReview";
import AddToCollection from "./AddToCollection";
import BookManager from "./BookManager";

export default function Book() {
    const { role, token } = useContext(AuthContext);
    const { data, loading, error } = useContext(DataContext);
    const [show, setShow] = useState(false);
    const [reviewsUrl, setReviewsUrl] = useState(null);
    const [reviewsOptions, setReviewsOptions] = useState(null);

    const reveal = (e) => {
        e.preventDefault();
        setShow(show => !show);
    }

    useEffect(() => {
        if (data.id) {
            setReviewsUrl(`api/review?bookId=${data.id}`);
            setReviewsOptions({ headers: { 'Authorization': `Bearer ${token}` } });
        }
    }, [data, token])

    return (
        <>
            <div className="container text-center mb-3">
                {loading && <div>Loading book...</div>}
                {error && <div className="mb-5 text-danger">Error: Failed to load book.</div>}
                {!error && <div><h1>Title: {data.title}</h1>
                    <h4 className="mb-3">Author: {data.author} | Genre: {data.genre}</h4></div>}
                {role === "ADMIN" && <div className="d-flex justify-content-center"><button className="btn btn-outline-secondary col-2" type="button" onClick={reveal}>Edit book</button></div>}
            </div>
            <div className="container mb-5">
                {(role === "ADMIN" && show) && <BookManager bookId={data.id} show={show} setShow={setShow} />}
            </div>
            <div className="container mb-5">
                <div className="row g-5 ">
                    <div className="col">
                        <AddToCollection bookId={data.id} />
                    </div>
                    <div className="col">
                        <CreateReview bookId={data.id} />
                    </div>
                </div>
            </div >
            <BookReviewsTable url={reviewsUrl} options={reviewsOptions} />
        </>
    );
}