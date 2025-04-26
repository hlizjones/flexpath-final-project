import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { DataContext } from "../../../context/DataProvider";
import CollectionManager from "./CollectionManager";
import CollectionBooksTable from "./CollectionBooksTable";
import usePrivacy from "../../../hooks/usePrivacy";


export default function Collection() {
    const { username, role } = useContext(AuthContext);
    const { data, loading, error } = useContext(DataContext);
    const [privacy, setPrivacy] = useState(data.privacy);
    const { handlePrivacy } = usePrivacy(setPrivacy);
    const [show, setShow] = useState(false)

    const reveal = (e) => {
        e.preventDefault();
        setShow(show => !show)
    }

    if (loading) return <div>Loading collection...</div>;
    if (error) return <div className="mb-5 text-danger">Error: Failed to load collection.</div>;

    const handleClick = (e) => {
        e.preventDefault();
        const id = e.currentTarget.id
        handlePrivacy(`api/collection/${id}`, privacy)
    }

    return (
        <>
            <div className="container text-center mb-5">
                <h1>{data.name}</h1>
                <h4 className="text-capitalize">Created by: {data.username}</h4>
                <h4 className="fst-italic">{data.description}</h4>
                {(username === data.username || role === "ADMIN") &&
                    <>
                        {privacy && <i className="bi bi-lock h1" id={data.id} onClick={handleClick}></i>}
                        {!privacy && <i className="bi bi-unlock h1" id={data.id} onClick={handleClick}></i>}
                    </>
                }
            <div className="d-flex"><button className="btn btn-secondary col-2" type="button" onClick={reveal}>Edit collection</button></div>
            </div>
            {((username === data.username || role === "ADMIN") && show) && <CollectionManager id={data.id} show ={show} setShow = {setShow} />}
            <CollectionBooksTable id={data.id} username={username} />
        </>
    );
}