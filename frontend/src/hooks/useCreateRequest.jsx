import React, { useState, useContext } from "react";
import useFetch from "./useFetch";
import { AuthContext } from "../context/AuthProvider";

export default function useCreateRequest() {
    const { token } = useContext(AuthContext);
    const [url, setUrl] = useState();
    const [options, setOptions] = useState();
    const { data, loading, error } = useFetch(url, options);

    const handleRequest = (object, argUrl, method) => {
        setUrl(argUrl);
        setOptions({
            method: method,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                object
            ),
        });
    }

    return (
       {handleRequest, data, loading, error}
    );
}