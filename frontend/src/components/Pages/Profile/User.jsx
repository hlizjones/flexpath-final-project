import React, { useContext, useEffect, useState, useMemo } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import useFetch from "../../../hooks/useFetch";

export default function User() {
    const { setUsername, username, setRole, role, token } = useContext(AuthContext);

    const userUrl = useMemo(() => `api/profile`, [])
    const roleUrl = useMemo(() => `api/profile/roles`, [])
    const body = useMemo(() => ({headers: {'Authorization': `Bearer ${token}`}}), [token])
    const { data: userData, loading: userLoading, error: userError } = useFetch(userUrl, body)
    const { data: roleData, loading: roleLoading, error: roleError } = useFetch(roleUrl, body)
    

    useEffect(() => {
        if (userData) {
            localStorage.setItem("username", userData.username);
            setUsername(userData.username)
        }
    }, [userData])

    useEffect(() => {
        if (roleData) {
            localStorage.setItem("username", roleData[0]);
            setRole(roleData[0])
        }
    }, [roleData])

    const toProper = (text) => {
        if (!text) {
            return ""
        }
        return (text.charAt(0).toUpperCase() + text.substring(1).toLowerCase())
    }

    return (
     <div className="container text-center mb-5">
                {(userLoading || roleLoading) && <div className="mb-5">Loading...</div>}
                <h1>Username: {toProper(username)} </h1>
                <h4>Role: {toProper(role)} </h4>
                {(userError || roleError) && <div className="mb-5 text-danger">Failed to load user profile.</div>}
            </div>
    );
}