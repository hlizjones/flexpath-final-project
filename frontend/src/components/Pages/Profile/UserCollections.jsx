import React, { useMemo, useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import FavoriteCollection from "./FavoriteCollection";
import useLoadPage from "../../../hooks/useLoadPage";
import useFetch from "../../../hooks/useFetch";
import { DataContext } from "../../../context/DataProvider";
import useSort from "../../../hooks/useSort";

export default function UserCollections() {
    const { token } = useContext(AuthContext);
    const { refresh } = useContext(DataContext);
    const { handleLoad } = useLoadPage();

    const url = useMemo(() => `api/collection?profile=true`, []);
    const options = useMemo(() => ({ headers: { 'Authorization': `Bearer ${token}` } }), [token]);
    const { data, loading, error } = useFetch(url, options, refresh);

    const [sort, setSort] = useState({ key: null, order: true });
    const { sortedData } = useSort(data, sort, setSort);

    const handleClick = (e) => {
        const id = e.currentTarget.closest(".card-body").id;
        e.preventDefault();
        handleLoad(`api/collection/${id}`, "collection");
    }

    const handleSort = (e) => {
        const key = e.currentTarget.id;
        setSort({ key: key, order: key === sort.key ? !sort.order : true });
    }

    return (
        <>
            <div className="container dropdown mb-3">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Sort by
                </button>
                <ul className="dropdown-menu">
                    <li data-testid="Alphabetical Ascending"><a className="dropdown-item" id={"name"} onClick={handleSort}>Alphabetical Ascending</a></li>
                    <li data-testid="Alphabetical Descending"><a className="dropdown-item" id={"name"} onClick={handleSort}>Alphabetical Descending</a></li>
                </ul>
            </div>
            <div className="container mb-5">
                {loading && <div>Loading collections...</div>}
                {error && <div className="mb-5 text-danger">Error: Failed to load collections.</div>}
                {!error && sortedData.length === 0 && <div>No collections to display.</div>}
                {sortedData.length > 0 && <div className="row row-cols-1 row-cols-md-4 g-5 mb-4">
                    {sortedData && Array.from(sortedData).map(el => {
                        return (
                            <div className="col" key={el.id}>
                                <div className="card text-center" data-testid={"card"}>
                                    <div className="card-body" id={el.id}>
                                        <h4 className="card-title" onClick={handleClick}>
                                            {el.name}
                                        </h4>
                                        <p className="card-text">{el.description}</p>
                                        <FavoriteCollection collectionId={el.id} favorite={el.favorite} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>}
            </div>
        </>
    );
}