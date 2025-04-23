import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../../context/DataProvider";
import CollectionManager from "./CollectionManager";
import CollectionBooksTable from "./CollectionBooksTable";
import useToProper from "../../../hooks/useToProper";


export default function Collection() {
    const { data, loading, error } = useContext(DataContext)

    // useEffect(() => {
    //     setMap(null);
    //     setOptions(null);
    // }, [data, setMap, setOptions]);

    // useEffect(() => {
    //     if (Object.keys(data).length > 0) {
    //         localStorage.setItem("collection", JSON.stringify(data));
    //         setCollection(data);
    //     }

    // }, [data])

    // const storedCollection = localStorage.getItem("collection");
    // const [collection, setCollection] = useState(storedCollection ? JSON.parse(storedCollection) : {})
    // const username = useToProper(collection.username)

    if (loading) return <div>Loading collection...</div>;
    if (error) return <div className="mb-5 text-danger">Error: Failed to load collection.</div>;

    return (
        <>
            <div className="container text-center mb-5">
                <h1>Name: {data.name}</h1>
                <h4>Username: {data.name}</h4>
            </div>
            <CollectionManager/>
            <CollectionBooksTable collectionId={data.id}/>
        </>
    );
}