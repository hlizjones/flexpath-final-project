import React, { useEffect } from "react";

export default function useMessageTimeout(error, data) {
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (error) {
                document.getElementById("errorMsg").className = "invisible";
            }
            if (data !== undefined && data !== null && Object.keys(data).length > 0) {
                document.getElementById("dataMsg").className = "invisible";
            }
        }, 5000)

        return () => {
            clearTimeout(timeout);
        }

    }, [data, error])
}