import React, { useContext, useMemo, useEffect } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import Login from "./Login";
import User from "./User";
import UserCollections from "./UserCollections"
import CreateCollection from "./CreateCollection"
import useLoadPage from "../../../hooks/useLoadPage";
export default function Profile() {
    const { token } = useContext(AuthContext);
    const {handleLoad} = useLoadPage();
    const url = useMemo(() => `api/collection?profile=true`, []);

    useEffect(() => {
        if (token) {
        handleLoad(url)
        }
    }, [url, token])


    return (
        <>
            {!token && <Login />}
            {token && <User />}
            {token && <UserCollections />}
            {token && <CreateCollection />}
        </>
    );
}