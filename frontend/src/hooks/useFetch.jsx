import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";


export default function useFetch(url, options, refresh) {
    const { setUsername, setRole, setToken, setTokenExpMessage } = useContext(AuthContext);
    const navigate = useNavigate()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        async function fetchData() {
            try {
                if (url !== null && url !== undefined) {
                    let response = await fetch(url, options);
                    if (!response.ok) {
                        throw response;
                    } else {
                        if (response.headers.get("content-type").includes("application/json")) {
                            let json = await response.json();
                            setData(json);
                        } else {
                            let text = await response.text();
                            setData(text);
                        }
                    }
                } else {
                    setData([]);
                }
            } catch (error) {
                console.log(error)
                if (error.status == 401 || error.status == 403) {
                    localStorage.clear()
                    setUsername(null)
                    setRole(null)
                    setToken(null)
                    setTokenExpMessage("Sign-in expired. Please sign-in again.")
                    navigate(`/profile`)
                }
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [url, options, refresh]);

    return { data, loading, error };
}

