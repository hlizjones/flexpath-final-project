import React from "react";
import useCreateRequest from "./useCreateRequest";

export default function usePrivacy(setPrivacy) {
    const { handleRequest } = useCreateRequest();

    const handlePrivacy = (url, currentPrivacy) => {
        let bool;
        if (currentPrivacy) {
            bool = false;
            setPrivacy(false);
        } else {
            bool = true;
            setPrivacy(true)
        }
        handleRequest({ privacy: bool }, url, "PUT")
    }

    return ({ handlePrivacy })
}