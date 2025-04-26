import React, { useMemo, useContext } from "react";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/AuthProvider";
import useLoadPage from "../../../hooks/useLoadPage";

export default function BookReviewsTable({ bookId }) {
    const { token, username, role } = useContext(AuthContext);
    const { handleLoad } = useLoadPage();

    const url = useMemo(() => `api/review?bookId=${bookId}`, [bookId]);
    const options = useMemo(() => ({ headers: { 'Authorization': `Bearer ${token}` } }), [token]);

    const { data, loading, error } = useFetch(url, options)

    const handleClick = (e) => {
        e.preventDefault();
        console.log(e.currentTarget.id)
        handleLoad(`api/review/${e.currentTarget.id}`, 'review')
    }

    if (loading) return <div>Loading Records...</div>;
    if (error) return <div className="mb-5 text-danger">Error: Failed to load reviews.</div>;
    if (Object.keys(data).length === 0) return <div>No reviews to display.</div>
    return (
        <div className="container">
            <table className="table table-hover">
                <thead className="table-secondary text-center">
                    <tr>
                        {data[0] && Object.keys(data[0]).map(key => {
                            if (key != "id" && key != "bookId" && key != "privacy" && key != "isAdmin") {
                                return (
                                    <th scope="col" key={key}>{key.toUpperCase()}</th>
                                )
                            }
                        })}
                        {data[0] && <th>EDIT YOUR REVIEW</th>}
                    </tr>
                </thead>
                <tbody className="text-center">
                    {data && Array.from(data).map(el => {
                        return (
                            <tr key={el["id"]}>
                                {Object.entries(el).map(([key, value]) => {
                                    if (key != "id" && key != "bookId" && key != "privacy" && key != "isAdmin") {
                                        if (key === "username") {
                                            return (<td className="text-capitalize" key={key}>{value}</td>)
                                        } else {
                                            return (<td key={key}>{value}</td>)
                                        }
                                    }
                                })}
                                <td key={el["id"] + "btn"}>
                                    {(el.username === username || role === "ADMIN") &&
                                        <i className="bi bi-pencil-square h3" onClick={handleClick} id={el["id"]}></i>
                                    }
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}