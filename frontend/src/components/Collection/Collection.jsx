import React, { useContext } from "react";
import { DataContext } from "../../context/DataProvider"
import CollectionBooks from "./CollectionBooks"

export default function Collection() {
    const { data, error } = useContext(DataContext)

    if (error && !data) return <div>{error.message}</div>;
    if (!data && !error) return <div>Search book</div>;

    return (
        <>
            <div className="container text-center mb-5">
                <h1>Name: {data.name}</h1>
                <h4>Username: {data.username}</h4>
            </div>
            <CollectionBooks collectionId={data.id}/>
        </>
    );
}