import React, { useContext, useMemo, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function UserCollections() {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [favUrl, setFavUrl] = useState()
    const [favBody, setFavBody] = useState()

    const { data: favData } = useFetch(favUrl, favBody)

    const url = useMemo(() => `api/collection?profile=true`, [])
    const body = useMemo(() => ({ headers: { 'Authorization': `Bearer ${token}` } }), [token])

    const { data, loading, error } = useFetch(url, body)


    const handleClick = (e) => {
        e.preventDefault();
        // let newMap = new Map();
        // newMap.set(`api`, `${page}/${e.currentTarget.id}`)
        // setMap(newMap)
        navigate(`/collection`)
    }


    const handleFavorite = (e) => {
        e.preventDefault();
        let bool;
        if (e.currentTarget.className.includes('fill')) {
            bool = false
            document.getElementById(e.currentTarget.id).className = "bi bi-heart h2"
        } else {
            bool = true
            document.getElementById(e.currentTarget.id).className = "bi bi-heart-fill h2"
        }

        setFavUrl(`api/collection/${e.currentTarget.id}`)
        setFavBody({
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                favorite: bool,
            })
        })
    }


    if (loading) return <div>Loading collections...</div>;
    return (
        <>
            <div className="container mb-5">
                {error && <p className="mb-5 text-danger" id="resultsError">Error: Failed to load collections.</p>}
                <div className="row row-cols-1 row-cols-md-4 g-5 mb-4">
                    {data && Array.from(data).map(el => {
                        return (
                            <div className="col" key={el.id}>
                                <div className="card text-center">
                                    <div className="card-body">
                                        <h4 className="card-title" onClick={handleClick}>{el.name}</h4>
                                        <p className="card-text">{el.description}</p>
                                        {el.favorite && <i className="bi bi-heart-fill h2" id={el.id} onClick={handleFavorite}></i>}
                                        {!el.favorite && <i className="bi bi-heart h2" id={el.id} onClick={handleFavorite}></i>}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </>
    );
}