import React, { createContext, useState, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { AuthContext } from "./AuthProvider";

export const DataContext = createContext();

export default function DataProvider({ children }) {
     const { token } = useContext(AuthContext);
    const [options, setOptions] = useState({ headers: { 'Authorization': `Bearer ${token}` } });
    const [url, setUrl] = useState(null);
    const { data, loading, error } = useFetch(url, options);

    return (
        <>
            <DataContext.Provider value={{ setUrl, setOptions, data, loading, error }}>
                {children}
            </DataContext.Provider>
        </>
    );

}