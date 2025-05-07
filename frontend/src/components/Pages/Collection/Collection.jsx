import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { DataContext } from "../../../context/DataProvider";
import CollectionManager from "./CollectionManager";
import CollectionBooksTable from "./CollectionBooksTable";
import usePrivacy from "../../../hooks/usePrivacy";


export default function Collection() {
    const { username, role, token } = useContext(AuthContext);
    const { data, loading, error } = useContext(DataContext);
    const { handlePrivacy } = usePrivacy();
    const [show, setShow] = useState(false);
    const [reviewsUrl, setBooksUrl] = useState(null);
    const [reviewsOptions, setBooksOptions] = useState(null);

    const reveal = (e) => {
        e.preventDefault();
        setShow(show => !show);
    }

    const handleClick = (e) => {
        e.preventDefault();
        const id = e.currentTarget.id;
        handlePrivacy(e, `api/collection/${id}`);
    }

    useEffect(() => {
        if (data.id) {
            setBooksUrl(`api/book_collection?id=${data.id}`);
            setBooksOptions({ headers: { 'Authorization': `Bearer ${token}` } });
        }
    }, [data, token])

    return (
        <>
            {loading && <div>Loading collection...</div>}
            {error && <div className="mb-5 text-danger">Error: Failed to load collection.</div>}
            <div className="container text-center mb-5">
                {!error && <div><h1>{data.name}</h1>
                    <h4 className="text-capitalize">Created by: {data.username}</h4>
                    <h4 className="fst-italic">{data.description}</h4></div>}
                {(username === data.username || role === "ADMIN") &&
                    <>
                        {data.privacy && <i className="bi bi-lock h1" id={data.id} onClick={handleClick}></i>}
                        {!data.privacy && <i className="bi bi-unlock h1" id={data.id} onClick={handleClick}></i>}
                    </>
                }
                <div className="d-flex"><button className="btn btn-secondary col-2" type="button" onClick={reveal}>Edit collection</button></div>
            </div>
            {((username === data.username || role === "ADMIN") && show) && <CollectionManager collectionId={data.id} show={show} setShow={setShow} />}
            <CollectionBooksTable collectionId={data.id} username={data.username} url={reviewsUrl} options={reviewsOptions} />
        </>
    );
}