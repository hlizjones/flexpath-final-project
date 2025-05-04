import React, { useEffect, useState } from "react";

export default function useSort(data, { key, order }) {
    const [sortedData, setSortedData] = useState([]);

    useEffect(() => {
        const getSortedData = () => {
            if (data && data.length > 0) {
                if (key && order === true) {
                    setSortedData([...data].sort((a, b) => String(a[key]).toLowerCase() > String(b[key]).toLowerCase() ? 1 : -1));
                    if (document.getElementById(key + "caret")) {
                        document.getElementById(key + "caret").className = "bi bi-caret-up-fill";
                    }
                } else if (key && order === false) {
                    setSortedData([...data].sort((a, b) => String(a[key]).toLowerCase() > String(b[key]).toLowerCase() ? -1 : 1));
                    if (document.getElementById(key + "caret")) {
                        document.getElementById(key + "caret").className = "bi bi-caret-down-fill";
                    }
                } else {
                    setSortedData([...data]);
                }
            } if (data.length === 0) {
                setSortedData([])
            }
        }

        getSortedData();

    }, [key, order, data]);

    return (
        { sortedData }
    );
}