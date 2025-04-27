import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import useCreateRequest from "../../../hooks/useCreateRequest";
import useMessageTimeout from "../../../hooks/useMessageTimeout";

export default function Login() {
    const { setToken, tokenExpMessage } = useContext(AuthContext);
    const { handleRequest, data, error } = useCreateRequest();
    useMessageTimeout(error);

    useEffect(() => {
        if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken.token);
            setToken(data.accessToken.token);
        }
    }, [data, setToken]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        handleRequest({ username: `${username}`, password: `${password}` }, "auth/login", "POST", null)
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    }

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center align-items-center ">
                <div className="col-md-4 d-grid gap-3 mt-5">
                    <input className="form-control" type="text" id="username" placeholder="Username"></input>
                    <input className="form-control" type="password" id="password" placeholder="Password" autoComplete="on"></input>
                    <button className="btn btn-secondary" type="submit">Login</button>
                    {error && <div className="visible mb-5 text-danger" id="errorMsg">Sign-in failed.</div>}
                    {tokenExpMessage && <div className="mb-5 text-danger">{tokenExpMessage}</div>}
                </div>
            </div>
        </form>
    );
}