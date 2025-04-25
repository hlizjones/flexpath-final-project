import React, { useContext } from "react";
import { DataContext } from "../../../context/DataProvider";
import { AuthContext } from "../../../context/AuthProvider";
import BookReviewsTable from "./BookReviewTable";
import BookManager from "./BookManager";

export default function Book() {
    const { role } = useContext(AuthContext)
    const { data, loading, error } = useContext(DataContext)

    if (loading) return <div>Loading book...</div>;
    if (error) return <div className="mb-5 text-danger">Error: Failed to load book.</div>
    return (
        <>
            <div className="container text-center mb-5">
                <h1>Title: {data.title}</h1>
                <h4>Author: {data.author} | Genre: {data.genre}</h4>
            </div>
            {(role === "ADMIN") && <BookManager id={data.id} />}
            <BookReviewsTable bookId={data.id} />
        </>
    );
}