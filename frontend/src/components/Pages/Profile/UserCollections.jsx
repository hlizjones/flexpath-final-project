import React, { useMemo, useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import FavoriteCollection from "./FavoriteCollection";
import useLoadPage from "../../../hooks/useLoadPage";
import useFetch from "../../../hooks/useFetch";

export default function UserCollections() {
    const { token } = useContext(AuthContext);
    const { handleLoad } = useLoadPage();

    const url = useMemo(() => `api/collection?profile=true`, []);
    const options = useMemo(() => ({ headers: { 'Authorization': `Bearer ${token}` } }), [token]);
    const { data, loading, error } = useFetch(url, options);

    const handleClick = (e) => {
        const id = e.currentTarget.closest(".card-body").id;
        e.preventDefault();
        handleLoad(`api/collection/${id}`, "collection");
    }

    if (loading) return <div>Loading collections...</div>
    if (error) return <div className="mb-5 text-danger">Error: Failed to load collections.</div>
    if (Object.keys(data).length === 0) return <div>No collections to display.</div>
    return (
        <>
            <div className="container mb-5">
                <div className="row row-cols-1 row-cols-md-4 g-5 mb-4">
                    {data && Array.from(data).map(el => {
                        return (
                            <div className="col" key={el.id}>
                                <div className="card text-center">
                                    <div className="card-body" id={el.id}>
                                        <h4 className="card-title" onClick={handleClick}>
                                            {el.name}
                                        </h4>
                                        <p className="card-text">{el.description}</p>
                                        <FavoriteCollection id={el.id} favorite={el.favorite} />
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