import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataProvider"
import { AuthContext } from "../context/AuthProvider";


export default function useLoadPage() {
    const { token } = useContext(AuthContext);
    const { setUrl, setOptions } = useContext(DataContext);
    const navigate = useNavigate();

    const handleLoad = (url, page) => {
        const options = { headers: { 'Authorization': `Bearer ${token}` } };
        setUrl(url);
        setOptions(options);
        localStorage.setItem("url", url);
        localStorage.setItem("options", JSON.stringify(options));

        if (page) {
        navigate(`/${page}`);
        }
    }

    return (
       { handleLoad }
    );
}