import React, { useContext, useEffect, useMemo } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import useFetch from "../../../hooks/useFetch";
import useToProper from "../../../hooks/useToProper";

export default function User() {
    const { setUsername, username, setRole, role, token } = useContext(AuthContext);

    const userUrl = useMemo(() => `api/profile`, []);
    const roleUrl = useMemo(() => `api/profile/roles`, []);
    const body = useMemo(() => ({headers: {'Authorization': `Bearer ${token}`}}), [token]);
    const { data: userData, loading: userLoading, error: userError } = useFetch(userUrl, body);
    const { data: roleData, loading: roleLoading, error: roleError } = useFetch(roleUrl, body);

    const properUsername = useToProper(username)
    const properRole = useToProper(role)
    

    useEffect(() => {
        if (userData) {
            localStorage.setItem("username", userData.username);
            setUsername(userData.username);
        }
    }, [userData]);

    useEffect(() => {
        if (roleData) {
            localStorage.setItem("username", roleData[0]);
            setRole(roleData[0]);
        }
    }, [roleData]);

    if ((userLoading || roleLoading)) return <div className="mb-5">Loading profile...</div>;
    if ((userError || roleError)) return <div className="mb-5 text-danger">Failed to load user profile.</div>

  return (
     <div className="container text-center mb-5">
                <h1>Username: {properUsername} </h1>
                <h4>Role: {properRole} </h4>
            </div>
    );
}