import React from "react";
import UserInput from "./UserInput";
import SearchResults from "./SearchResults"
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import useUrlBuilder from "../../../hooks/useUrlBuilder"

export default function Search() {
    const [map, setMap] = useState();
    const url = useUrlBuilder(map)
    const { data, loading, error} = useFetch(url);

    console.log(url, data)

    return (
        <div className="container">
            <UserInput setMap = {setMap}/>
            <SearchResults result = {{data, loading, error}} />
        </div>
    );
}