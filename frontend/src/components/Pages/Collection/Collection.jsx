import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { DataContext } from "../../../context/DataProvider";
import CollectionManager from "./CollectionManager";
import CollectionBooksTable from "./CollectionBooksTable";
import CollectionPrivacy from "./CollectionPrivacy";


export default function Collection() {
    const { token, username, role } = useContext(AuthContext);
    const { data, loading, error } = useContext(DataContext);

    const url = `api/book_collection?id=${data.id}`;
    const options = { headers: { 'Authorization': `Bearer ${token}` } }

    if (loading) return <div>Loading collection...</div>;
    if (error) return <div className="mb-5 text-danger">Error: Failed to load collection.</div>;

    return (
        <>
            <div className="container text-center mb-5">
                <h1>{data.name}</h1>
                <h4 className="text-capitalize">Created by : {data.username}</h4>
                <h4 className="fst-italic">{data.description}</h4>
                {(username === data.username || role === "ADMIN") && <CollectionPrivacy id={data.id} collectionPrivacy = {data.privacy} />}
            </div>
            {(username === data.username || role === "ADMIN") && <CollectionManager id={data.id} />}
            <CollectionBooksTable id={data.id} username={username} url={url} options={options} />
        </>
    );
}