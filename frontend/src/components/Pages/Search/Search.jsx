import React, { useState, useContext, useMemo } from "react";
import useFetch from "../../../hooks/useFetch";
import useUrlBuilder from "../../../hooks/useUrlBuilder";
import UserInput from "./UserInput";
import SearchResults from "./SearchResults";
import { AuthContext } from "../../../context/AuthProvider";

export default function Search() {
    const { token } = useContext(AuthContext);
    const options = useMemo(() => ({ headers: { 'Authorization': `Bearer ${token}` } }), [token]);

    const [map, setMap] = useState();
    const url = useUrlBuilder(map);
    const { data, loading, error } = useFetch(url, options);

    return (
        <div className="container">
            <UserInput setMap={setMap} />
            <SearchResults data={data} loading={loading} error={error} map={map} />
        </div>
    );
}