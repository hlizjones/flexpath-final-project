import React, { createContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import useUrlBuilder from "../hooks/useUrlBuilder"

export const DataContext = createContext();

export default function DataProvider({ children }) {
    const [map, setMap] = useState();
    const url = useUrlBuilder(map)
    const { data, loading, error } = useFetch(url);

    return (
        <>
            <DataContext.Provider value={{ map, setMap, data, loading, error }}>
                {children}
            </DataContext.Provider>
        </>
    );

}