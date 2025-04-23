import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import Login from "./Login";
import User from "./User";
import UserCollections from "./UserCollections"
import CreateCollection from "./CreateCollection"

export default function Profile() {
    const { token } = useContext(AuthContext);
    const [refresh, setRefresh] = useState(false);
    const url = `api/collection?profile=true`;
    const options = { headers: { 'Authorization': `Bearer ${token}`}};

    return (
        <>
            {!token && <Login />}
            {token && <User />}
            {token && <UserCollections url={url} options={options} />}
            {token && <CreateCollection setRefresh={setRefresh} />}
        </>
    );
}