import React, { createContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import useUrlBuilder from "../hooks/useUrlBuilder"

export const DataContext = createContext();

export default function DataProvider({ children }) {
    const [map, setMap] = useState(null);
    const [body, setOptions] = useState(null);
    const url = useUrlBuilder(map);
    console.log(url)
    const { data, loading, error } = useFetch(url, body);

    return (
        <>
            <DataContext.Provider value={{ map, setMap, setOptions, data, loading, error }}>
                {children}
            </DataContext.Provider>
        </>
    );

}