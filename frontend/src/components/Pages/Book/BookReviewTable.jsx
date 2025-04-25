import React, { useMemo, useContext } from "react";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/AuthProvider";
import useLoadPage from "../../../hooks/useLoadPage";

export default function BookReviewsTable({ bookId }) {
    const { token } = useContext(AuthContext);
    const { handleLoad } = useLoadPage();

    const url = useMemo(() => `api/review?bookId=${bookId}`, [bookId]);
    const options = useMemo(() => ({ headers: { 'Authorization': `Bearer ${token}` } }), [token]);

    const { data, loading, error } = useFetch(url, options)

    const handleClick = (e) => {
        e.preventDefault();
        handleLoad(`api/review/${e.currentTarget.id}`, 'review')
    }

    if (loading) return <div>Loading Records...</div>;
    if (error) return <div className="mb-5 text-danger">Error: Failed to load reviews.</div>;
    return (
        <>
            <table className="table table-hover">
                <thead className="table-secondary">
                    <tr>
                        {data[0] && Object.keys(data[0]).map(key => {
                            if (key != "id" && key != "bookId" && key != "privacy" && key != "isAdmin") {
                                return (
                                    <th scope="col" key={key}>{key.toUpperCase()}</th>
                                )
                            }
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data && Array.from(data).map(el => {
                        return (
                            <tr key={el["id"]} onClick={handleClick} id={el["id"]}>
                                {Object.entries(el).map(([key, value]) => {
                                    if (key != "id" && key != "bookId" && key != "privacy" && key != "isAdmin") {
                                        return (<th key={key}>{value}</th>)
                                    }
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}