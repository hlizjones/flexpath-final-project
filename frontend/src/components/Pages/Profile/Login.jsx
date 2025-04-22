import React, { useState, useContext } from "react";
import useFetch from "../../../hooks/useFetch"
import { AuthContext } from "../../../context/AuthProvider";
import { useEffect } from "react";

export default function Login() {
    const { setToken, tokenExpMessage } = useContext(AuthContext);
    const [url, setUrl] = useState()
    const [body, setBody] = useState({})
    const { data, error } = useFetch(url, body)

    useEffect(() => {
        if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken.token);
            setToken(data.accessToken.token)
        }
    }, [data])

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        setUrl(`auth/login`)
        setBody({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: `${username}`, password: `${password}` }),
        })
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    }

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center align-items-center ">
                <div className="col-md-4 d-grid gap-3 mt-5">
                    <input className="form-control" type="text" id="username" placeholder="Username"></input>
                    <input className="form-control" type="password" id="password" placeholder="Password"></input>
                    <button className="btn btn-secondary" type="submit">Login</button>
                    {error && <div className="mb-5 text-danger">Sign-in failed.</div>}
                    {tokenExpMessage && <div className="mb-5 text-danger">{tokenExpMessage}</div>}
                </div>
            </div>
        </form>
    );
}