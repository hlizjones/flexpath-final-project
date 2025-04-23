import { useState, useEffect } from "react";

export default function useUrlBuilder(map) {
    const [url, setUrl] = useState()

    useEffect(() => {

        if (map !== null && map !== undefined) {
            const arr = Array.from(map)
            let url = 'api/';

            for (let i = 0; i < arr.length; i++) {
                const [key, value] = arr[i]

                if (i === 0) {
                    url += `${value}`
                    if (arr.length > 1) {
                        url += `?`
                    }
                } else if (value) {
                    url += `${key}=${value}`
                    if (i < arr.length - 1) {
                        url += `&`
                    }
                }
            }
            setUrl(url)
        } else {
            setUrl(null)
        }
    }, [map])

    return (url)
}


