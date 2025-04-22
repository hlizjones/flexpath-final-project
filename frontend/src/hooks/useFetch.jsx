import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";


export default function useFetch(url, options) {
    const { setUser, setRole, setToken, setTokenExpMessage } = useContext(AuthContext);
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
                        let json = await response.json();
                        setData(json);
                    }
                } else {
                    setData([]);
                }
            } catch (error) {
                if (error.status == 401 || error.status == 403){
                        localStorage.clear()
                        setUser(null)
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
    }, [url, options]);

    return { data, loading, error };
}

