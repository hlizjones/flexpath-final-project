import React, { createContext, useState } from "react";
import useFetch from "../hooks/useFetch";

export const DataContext = createContext();

export default function DataProvider({ children }) {
    const [refresh, setRefresh] = useState(false);
    
    const storedUrl = localStorage.getItem("url");
    const [url, setUrl] = useState(storedUrl ? storedUrl : null);

    const storedOptions = localStorage.getItem("options");
    const [options, setOptions] = useState(storedOptions ? JSON.parse(storedOptions) : null);

    const { data, loading, error } = useFetch(url, options, refresh);

    return (
        <>
            <DataContext.Provider value={{ setUrl, setOptions, data, loading, error, url, options, setRefresh }}>
                {children}
            </DataContext.Provider>
        </>
    );

}