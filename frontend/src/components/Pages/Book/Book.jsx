import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../context/DataProvider";
import BookReviewsTable from "./BookReviewTable";
import BookManagement from "./BookManagement"
import useToProper from "../../../hooks/useToProper";

export default function Book() {
    const { data, loading, error } = useContext(DataContext)

    // useEffect(() => {
    //     if (Object.keys(data).length > 0) {
    //         localStorage.setItem("book", JSON.stringify(data));
    //         setBook(data);
    //     }
    // }, [data])

    // const storedBook = localStorage.getItem("book");
    // const [book, setBook] = useState(storedBook ? JSON.parse(storedBook) : "")
    // const title = useToProper(book.title)
    // const author = useToProper(book.author)
    // const genre = useToProper(book.genre)


    if (loading) return <div>Loading collection...</div>;
    if (error) return <div className="mb-5 text-danger">Error: Failed to load book.</div>;

    return (
        <>
            <div className="container text-center mb-5">
                <h1>Title: {data.title}</h1>
                <h4>Author: {data.author} | Genre: {data.genre}</h4>
            </div>
            {/* <BookManagement /> */}
            <BookReviewsTable bookId={data.id} />
        </>
    );
}