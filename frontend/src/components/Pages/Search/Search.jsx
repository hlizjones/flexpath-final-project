import React, {useState} from "react";
import useFetch from "../../../hooks/useFetch";
import useUrlBuilder from "../../../hooks/useUrlBuilder";
import UserInput from "./UserInput";
import SearchResults from "./SearchResults";

export default function Search() {
    const [map, setMap] = useState();
    const url = useUrlBuilder(map);
    const { data, loading, error} = useFetch(url);

    return (
        <div className="container">
            <UserInput setMap = {setMap}/>
            <SearchResults result = {{data, loading, error}} />
        </div>
    );
}