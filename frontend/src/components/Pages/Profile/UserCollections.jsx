import React, { useContext, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/AuthProvider";
import { DataContext } from "../../../context/DataProvider"
import { useNavigate } from "react-router-dom";


export default function UserCollections({ url, options }) {
    const { token } = useContext(AuthContext);
    const { setMap, setOptions } = useContext(DataContext);
    const navigate = useNavigate();

    const { data, loading, error } = useFetch(url, options);

    const [favUrl, setFavUrl] = useState();
    const [favOptions, setFavOptions] = useState();
    useFetch(favUrl, favOptions);

    const handleClick = (e) => {
        const id = e.currentTarget.closest(".card-body").id;
        e.preventDefault();
        let newMap = new Map();
        newMap.set(`api`, `collection/${id}`);
        setMap(newMap);
        setOptions({ headers: { 'Authorization': `Bearer ${token}` } })
        navigate(`/collection`);
    }

    const handleFavorite = (e) => {
        const id = e.currentTarget.closest(".card-body").id
        e.preventDefault();
        let boolFav;
        if (e.currentTarget.className.includes('fill')) {
            boolFav = false;
            document.getElementById(id + "btn").className = "bi bi-heart h2";
        } else {
            boolFav = true;
            document.getElementById(id + "btn").className = "bi bi-heart-fill h2";
        }

        setFavUrl(`api/collection/${id}`);
        setFavOptions({
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                favorite: boolFav,
            }),
        });
    }


    if (loading) return <div>Loading collections...</div>;
    if (error) return <div className="mb-5 text-danger">Error: Failed to load collections.</div>;
    return (
        <>
            <div className="container mb-5">
                <div className="row row-cols-1 row-cols-md-4 g-5 mb-4">
                    {data && Array.from(data).map(el => {
                        return (
                            <div className="col" key={el.id}>
                                <div className="card text-center">
                                    <div className="card-body" id={el.id}>
                                        <h4 className="card-title" onClick={handleClick}>{el.name}</h4>
                                        <p className="card-text">{el.description}</p>
                                        {el.favorite && <i className="bi bi-heart-fill h2" id={el.id + "btn"} onClick={handleFavorite}></i>}
                                        {!el.favorite && <i className="bi bi-heart h2" id={el.id + "btn"} onClick={handleFavorite}></i>}
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