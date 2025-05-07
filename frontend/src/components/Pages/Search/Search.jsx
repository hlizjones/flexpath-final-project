import React, { useState, useContext, useMemo } from "react";
import UserInput from "./UserInput";
import SearchResults from "./SearchResults";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/AuthProvider";

export default function Search() {
    const { token } = useContext(AuthContext);

    const storedPage = localStorage.getItem("page");
    const [page, setPage] = useState(storedPage ? storedPage : null);

    const storedUrl = localStorage.getItem("searchUrl");
    const [url, setUrl] = useState(storedUrl ? storedUrl : null);
    const options = useMemo(() => ({ headers: { 'Authorization': `Bearer ${token}` } }), [token]);
    const { data, loading, error } = useFetch(url, options);

    const [sort, setSort] = useState({ key: null, order: true });

    return (
        <div className="container">
            <UserInput setPage={setPage} setUrl={setUrl} setSort={setSort} />
            <SearchResults page={page} data={data} loading={loading} error={error} setSort={setSort} sort={sort} />
        </div>
    );
}