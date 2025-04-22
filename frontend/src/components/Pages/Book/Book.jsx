import React, { useContext } from "react";
import { DataContext } from "../../../context/DataProvider";
import ReviewsTable from "./ReviewsTable";
import CollectionManagement from "./CollectionManagement"

export default function Book() {
    const { data, error } = useContext(DataContext)

    if (error && !data) return <div>{error.message}</div>;
    if (!data && !error) return <div>Search book</div>;

    return (
            <div className="container text-center mb-5">
                <h1>Title: {data.title}</h1>
                <h4>Author: {data.author} | Genre: {data.genre}</h4>
                <CollectionManagement />
                <ReviewsTable bookId={data.id} />
            </div>
    );
}