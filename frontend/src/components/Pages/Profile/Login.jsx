import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";

export default function Login() {
    const [url, setUrl] = useState()
    const [body, setBody] = useState({})
    const { data, error } = useFetch(url, body)
    if (data.accessToken) {
    localStorage.setItem("accessToken", data.accessToken.token);
    console.log(data.accessToken.token)
    }


    

    const handleSubmit = (e) => {
        e.preventDefault();
        setUrl(`auth/login`)
        setBody({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: 'admin', password: 'admin' }),
          })
    }

            return (
                <form className="container" onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-center align-items-center ">
                        <div className="col-md-4 d-grid gap-3 mt-5">
                            <input className="form-control" type="text" id="username" placeholder="Username"></input>
                            <input className="form-control" type="password" id="username" placeholder="Password"></input>
                            <button className="btn btn-secondary" type="submit">Login</button>
                            {error && <div className="mb-5">Sign-in failed.</div>}
                        </div>
                    </div>
                </form>
            );
        }