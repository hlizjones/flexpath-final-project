import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import Login from "./Login";
import User from "./User";
import UserCollections from "./UserCollections"
import CreateCollection from "./CreateCollection"


export default function Profile() {
    const { token } = useContext(AuthContext);

    return (
        <>
            {!token && <Login />}
            {token && <User />}
            {token && <UserCollections />}
            {token && <CreateCollection />}
        </>
    );
}