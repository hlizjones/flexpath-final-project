import React, { useContext, useMemo } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { DataContext } from "../../../context/DataProvider"
import ReviewManager from "./ReviewManager";
import usePrivacy from "../../../hooks/usePrivacy";
import useFetch from "../../../hooks/useFetch";


export default function Review() {
    const { username, role, token } = useContext(AuthContext);
    const { data, loading, error } = useContext(DataContext);
    const { handlePrivacy } = usePrivacy();

    const url = useMemo(() => `api/book/${data.bookId}`, [data.bookId]);
    const options = useMemo(() => ({ headers: { 'Authorization': `Bearer ${token}` } }), [token]);
    const { data: bookData } = useFetch(url, options);

    const handleClick = (e) => {
        e.preventDefault();
        const id = e.currentTarget.id;
        handlePrivacy(e, `api/review/${id}?bookId=${data.bookId}`);
    }

    if (loading) return <div>Loading review...</div>
    if (error) return <div className="mb-5 text-danger">Error: Failed to load review.</div>
    return (
        <>
            {(data.username === username || role === "ADMIN") &&
                <div className="container text-center mb-5">
                    <h1>Title: {bookData.title}</h1>
                    <h4 className="mb-3">Author: {bookData.author} | Genre: {bookData.genre}</h4>
                    <h4>{data.rating}/5</h4>
                    <h4 className="fst-italic">{data.content}</h4>
                    <>
                        {data.privacy && <i className="bi bi-lock h1" id={data.id} onClick={handleClick}></i>}
                        {!data.privacy && <i className="bi bi-unlock h1" id={data.id} onClick={handleClick}></i>}
                    </>
                    <ReviewManager id={data.id} bookId={data.bookId} />
                </div>
            }
        </>
    );
}