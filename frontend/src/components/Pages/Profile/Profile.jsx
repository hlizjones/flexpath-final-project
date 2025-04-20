import React from "react";
import Login from "./Login";
import { useContext } from "react";
import { DataContext } from "../../../context/DataProvider";
import UserCollections from "./UserCollections";

export default function Profile() {
    const {user, setUser} = useContext(DataContext)
    
    if (user === null) return <Login/>;
    
    return (
        <>
        <UserCollections/>
        </>
    );
}