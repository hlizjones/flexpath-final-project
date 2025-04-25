import React, { useState } from "react";
import useCreateRequest from "../../../hooks/useCreateRequest";

export default function CollectionPrivacy({ id, collectionPrivacy }) {
    const { handleRequest } = useCreateRequest();
    const [privacy, setPrivacy] = useState(collectionPrivacy);

    const handlePrivacy = (e) => {
        const id = e.currentTarget.id
        e.preventDefault();
        let bool;
        if (e.currentTarget.className.includes('bi-lock')) {
            bool = false;
            setPrivacy(false);
        } else {
            bool = true;
            setPrivacy(true)
        }
        handleRequest({privacy: bool}, `api/collection/${id}`, "PUT")
    }

    return (
        <>
            {privacy && <i className="bi bi-lock h1" id={id} onClick={handlePrivacy}></i>}
            {!privacy && <i className="bi bi-unlock h1" id={id} onClick={handlePrivacy}></i>}
        </>
    )
}