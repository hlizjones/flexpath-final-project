import React from "react";
import useCreateRequest from "../../../hooks/useCreateRequest";

export default function FavoriteCollection({ id, favorite }) {
    const { handleRequest } = useCreateRequest();

    const handleFavorite = (e) => {
        e.preventDefault();
        const id = e.currentTarget.closest(".card-body").id;
        let bool;
        if (e.currentTarget.className.includes('fill')) {
            bool = false;
            e.currentTarget.className = "bi bi-heart h2";
        } else {
            bool = true;
            e.currentTarget.className = "bi bi-heart-fill h2";
        }
        
        handleRequest({favorite: bool}, `api/collection/${id}`, "PUT");
    }

    return (
        <>
            {favorite && <i className="bi bi-heart-fill h2" id={id + "btn"} onClick={handleFavorite}></i>}
            {!favorite && <i className="bi bi-heart h2" id={id + "btn"} onClick={handleFavorite}></i>}
        </>
    );
}