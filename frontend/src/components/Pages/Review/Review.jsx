import React, { useContext, useMemo } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { DataContext } from "../../../context/DataProvider"
import ReviewManager from "./ReviewManager";
import usePrivacy from "../../../hooks/usePrivacy";
import useFetch from "../../../hooks/useFetch";
import useLoadPage from "../../../hooks/useLoadPage";


export default function Review() {
    const { username, role, token } = useContext(AuthContext);
    const { data, loading, error } = useContext(DataContext);
    const { handlePrivacy } = usePrivacy();
    const { handleLoad}  = useLoadPage();

    const url = useMemo(() => `api/book/${data.bookId}`, [data.bookId]);
    const options = useMemo(() => ({ headers: { 'Authorization': `Bearer ${token}` } }), [token]);
    const { data: bookData } = useFetch(url, options);

    const handleNavigate = (e) => {
        e.preventDefault();
        handleLoad(`api/book/${e.currentTarget.id}`, 'book');
    }

    const handleClick = (e) => {
        e.preventDefault();
        const id = e.currentTarget.id;
        handlePrivacy(e, `api/review/${id}?bookId=${data.bookId}`);
    }

    return (
        <>
            {(data.username === username || role === "ADMIN") &&
                <div className="container text-center mb-5">
                    {loading && <div>Loading review...</div>}
                    {error && <div className="mb-5 text-danger">Error: Failed to load review.</div>}
                    <div className= "mb-5">
                        <h1 className="link-primary" style={{cursor: "pointer"}} id={bookData.id} onClick={handleNavigate}>Title: {bookData.title}</h1>
                        <h4 className="mb-3">Author: {bookData.author} | Genre: {bookData.genre}</h4>
                        <h4 className="text-capitalize">Rated by: {data.username}</h4>
                    </div>
                    <div>
                        <h4>{data.rating}/5</h4>
                        <h4 className="fst-italic">{data.content}</h4>
                    </div>
                    <>
                        {data.privacy && <i className="bi bi-lock h1" id={data.id} onClick={handleClick}></i>}
                        {!data.privacy && <i className="bi bi-unlock h1" id={data.id} onClick={handleClick}></i>}
                    </>
                    <ReviewManager reviewId={data.id} bookId={data.bookId} />
                </div>
            }
        </>
    );
}