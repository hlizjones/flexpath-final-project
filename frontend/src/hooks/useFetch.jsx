import { useState, useEffect } from "react";

export default function useFetch(url, options) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    console.log("usefetch", url)

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
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [url, options]);

    console.log("usefetchdata", data)

    return { data, loading, error };
}

