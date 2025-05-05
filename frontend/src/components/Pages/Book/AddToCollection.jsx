import React, { useContext, useMemo } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import useFetch from "../../../hooks/useFetch";
import AddToCollectionForm from "./AddToCollectionForm";

export default function AddToCollection({ id }) {
    const { token, username, role } = useContext(AuthContext);

    let urlToMemoize;
    if (role === "ADMIN") {
        urlToMemoize = `api/collection`
    } else {
        urlToMemoize = `api/collection?username=${username}`
    }
    const url = useMemo(() => urlToMemoize, [urlToMemoize]);
    const options = useMemo(() => ({ headers: { 'Authorization': `Bearer ${token}` } }), [token]);
    const { data } = useFetch(url, options)

    return (
        <AddToCollectionForm formData={data} id={id} />
    );
}