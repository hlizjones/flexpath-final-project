import React, { useContext, useEffect, useMemo } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import useFetch from "../../../hooks/useFetch";

export default function User() {
    const { setUsername, username, setRole, token } = useContext(AuthContext);

    const userUrl = useMemo(() => `api/profile`, []);
    const roleUrl = useMemo(() => `api/profile/roles`, []);
    const options = useMemo(() => ({ headers: { 'Authorization': `Bearer ${token}` } }), [token]);
    const { data: userData, loading: userLoading, error: userError } = useFetch(userUrl, options);
    const { data: roleData, loading: roleLoading, error: roleError } = useFetch(roleUrl, options);

    useEffect(() => {
        if (userData) {
            localStorage.setItem("username", userData.username);
            setUsername(userData.username);
        }
    }, [userData, setUsername]);

    useEffect(() => {
        if (roleData) {
            localStorage.setItem("role", roleData[0]);
            setRole(roleData[0]);
        }
    }, [roleData, setRole]);

    if ((userLoading || roleLoading)) return <div className="mb-5">Loading profile...</div>
    if ((userError || roleError)) return <div className="mb-5 text-danger">Failed to load user profile.</div>
    return (
        <div className="container text-center mb-5">
            <h1 className="text-capitalize">Welcome back to your library, {username}!</h1>
        </div>
    );
}