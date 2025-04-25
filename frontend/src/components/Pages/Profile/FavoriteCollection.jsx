import React, { useState } from "react";
import useCreateRequest from "../../../hooks/useCreateRequest";

export default function FavoriteCollection({ id, collectionFavorite }) {

    const { handleRequest } = useCreateRequest();
    const [favorite, setFavorite] = useState(collectionFavorite);

    const handleFavorite = (e) => {
        e.preventDefault();
        const id = e.currentTarget.closest(".card-body").id
        let boolFav;
        if (e.currentTarget.className.includes('fill')) {
            boolFav = false;
            setFavorite(false)
        } else {
            boolFav = true;
            setFavorite(true)
        }
        
        handleRequest({favorite: boolFav}, `api/collection/${id}`, "PUT")
    }

    return (
        <>
            {favorite && <i className="bi bi-heart-fill h2" id={id + "btn"} onClick={handleFavorite}></i>}
            {!favorite && <i className="bi bi-heart h2" id={id + "btn"} onClick={handleFavorite}></i>}
        </>
    )
}