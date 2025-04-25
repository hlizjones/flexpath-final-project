import React, { useContext, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/AuthProvider";
import { DataContext } from "../../../context/DataProvider";
import useCreateRequest from "../../../hooks/useCreateRequest";
import useLoadPage from "../../../hooks/useLoadPage";

export default function CollectionBooksTable({ id, username, url, options }) {
    const { role, username: authUsername } = useContext(AuthContext);
    const { setRefresh } = useContext(DataContext);
    const { handleLoad } = useLoadPage();
    const { handleRequest, data : removeBookData, loading : removeBookLoading, error: removeBookError } = useCreateRequest();

    const { data, loading, error } = useFetch(url, options)

    const handleClick = (e) => {
        e.preventDefault();
        const bookId = e.currentTarget.closest('tr').id
        handleLoad(`api/book/${bookId}`, 'book');
    }

    const removeBook = (e) => {
        e.preventDefault();
        const bookId = e.currentTarget.closest('tr').id
        handleRequest(null, `api/book_collection?bookId=${bookId}&collectionId=${id}`, "DELETE")
    }

    useEffect(() => {
        if (typeof removeBookData === "string" ) {
            setRefresh(refresh => !refresh)
        }
    }, [removeBookData, setRefresh]);

    if (loading) return <div>Loading Records...</div>;
    if (error) return <div className="mb-5 text-danger">Error: Failed to load books.</div>;
    if (removeBookLoading) return <div>Removing book from collection...</div>;
    if (removeBookError) return <div className="mb-5 text-danger">Error: Failed to remove book.</div>;
    return (
        <>
            <table className="table table-hover">
                <thead className="table-secondary">
                    <tr>
                        {data[0] && Object.keys(data[0]).map(key => {
                            if (key != "id" && key != "username" && key != "favorite" && key != "privacy" && key != "isAdmin") {
                                return (
                                    <th scope="col" key={key}>{key.toUpperCase()}</th>
                                )
                            }
                        })}
                        {data[0] && <th>DELETE</th>}
                    </tr>
                </thead>
                <tbody>
                    {data && Array.from(data).map(el => {
                        return (
                            <tr key={el["id"]} id={el["id"]}>
                                {Object.entries(el).map(([key, value]) => {
                                    if (key != "id" && key != "username" && key != "favorite" && key != "privacy" && key != "isAdmin") {
                                        return (<th key={key} onClick={handleClick}>{value}</th>)
                                    }
                                })}
                                {(username === authUsername || role === 'ADMIN') && <td onClick={removeBook}><i className="bi bi-trash3-fill h3 ms-2"></i></td>}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}