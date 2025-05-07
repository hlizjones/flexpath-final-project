import React from "react";

export default function useUrlBuilder() {

    const buildUrl = (map) => {
        let url = 'api/';

        if (map !== null && map !== undefined) {
            const arr = Array.from(map);

            for (let i = 0; i < arr.length; i++) {
                const [key, value] = arr[i];

                if (i === 0) {
                    url += `${value}`;
                    if (arr.length > 1) {
                        url += `?`;
                    }
                } else if (value) {
                    url += `${key}=${value}`;
                    if (i < arr.length - 1) {
                        url += `&`;
                    }
                }
            }
        }
        return (url);
    }

    return (
        { buildUrl }
    )
}


