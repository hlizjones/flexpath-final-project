import React from "react";
import useCreateRequest from "./useCreateRequest";

export default function usePrivacy() {
    const { handleRequest } = useCreateRequest();

    const handlePrivacy = (e, url) => {
        let bool;
        if (e.currentTarget.className.includes('bi-lock')) {
            bool = false;
            e.currentTarget.className = "bi bi-unlock h1"
        } else {
            bool = true;
            e.currentTarget.className = "bi bi-lock h1"
        }
        handleRequest({ privacy: bool }, url, "PUT")
    }

    return ({ handlePrivacy })
}