import React, { useState, useContext, useMemo } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { DataContext } from "../../context/DataProvider"
import ReviewManager from "./ReviewManager";
import usePrivacy from "../../hooks/usePrivacy";
import useFetch from "../../hooks/useFetch";


export default function Review() {
    const { username, role, token } = useContext(AuthContext)
    const { data, loading, error } = useContext(DataContext)
    const [privacy, setPrivacy] = useState(data.privacy);
    const { handlePrivacy } = usePrivacy(setPrivacy);

    console.log(data)

    // const url = useMemo(() => `api/book/${data.bookId}`, [data.bookId]);
    // const options = useMemo(() => ({ headers: { 'Authorization': `Bearer ${token}` } }), [token]);

    // const { data: bookData, error: bookError } = useFetch(url, options)


    const handleClick = (e) => {
        e.preventDefault();
        const id = e.currentTarget.id
        handlePrivacy(`api/review/${id}?bookId=${data.bookId}`, privacy)
    }

    if (loading) return <div>Loading review...</div>;
    if (error) return <div className="mb-5 text-danger">Error: Failed to load review.</div>;
    return (
        <>
            {(data.username === username || role === "ADMIN") &&
                <div className="container text-center mb-5">
                    {/* {bookError && <h1>Title: {bookData.title}</h1>}
                    {bookError && <h4 className="mb-3">Author: {bookData.author} | Genre: {bookData.genre}</h4>} */}
                    <h4>{data.rating}/5</h4>
                    <h4>{data.content}</h4>
                    <>
                        {privacy && <i className="bi bi-lock h1" id={data.id} onClick={handleClick}></i>}
                        {!privacy && <i className="bi bi-unlock h1" id={data.id} onClick={handleClick}></i>}
                    </>
                    <ReviewManager id={data.id} bookId={data.bookId} />
                </div>
            }
        </>
    );
}