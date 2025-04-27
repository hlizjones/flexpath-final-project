import React, { useContext, useEffect, useMemo } from "react";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/AuthProvider";
import { DataContext } from "../../../context/DataProvider";
import useCreateRequest from "../../../hooks/useCreateRequest";
import useLoadPage from "../../../hooks/useLoadPage";
import useMessageTimeout from "../../../hooks/useMessageTimeout";

export default function CollectionBooksTable({ id }) {
    const { role, token, username: authUsername } = useContext(AuthContext);
    const { setRefresh } = useContext(DataContext);
    const { handleLoad } = useLoadPage();
    const { handleRequest, data : removeBookData, loading : removeBookLoading, error: removeBookError } = useCreateRequest();
    useMessageTimeout(removeBookError);

    const url = useMemo(() => (`api/book_collection?id=${id}`),[id]);
    const options = useMemo(() => ( { headers: { 'Authorization': `Bearer ${token}` } } ) ,[token]);
    const { data, loading, error } = useFetch(url, options);

    const handleClick = (e) => {
        e.preventDefault();
        const bookId = e.currentTarget.closest('tr').id;
        handleLoad(`api/book/${bookId}`, 'book');
    }

    const removeBook = (e) => {
        e.preventDefault();
        const bookId = e.currentTarget.closest('tr').id;
        handleRequest(null, `api/book_collection?bookId=${bookId}&collectionId=${id}`, "DELETE");
    }

    useEffect(() => {
        if (typeof removeBookData === "string" ) {
            setRefresh(refresh => !refresh);
        }
    }, [removeBookData, setRefresh]);

    if (loading) return <div>Loading Records...</div>;
    if (error) return <div className="mb-5 text-danger">Error: Failed to load books.</div>
    if (Object.keys(data).length === 0) return <div>No books to display.</div>
    if (removeBookLoading) return <div>Removing book from collection...</div>
    if (removeBookError) return <div className="visible mb-5 text-danger" id="errorMsg">Error: Failed to remove book.</div>
    return (
        <div className="container">
            <table className="table table-hover">
                <thead className="table-secondary text-center">
                    <tr>
                        {data[0] && Object.keys(data[0]).map(key => {
                            if (key != "id" && key != "username" && key != "favorite" && key != "privacy" && key != "isAdmin") {
                                return (
                                    <th className="text-uppercase" scope="col" key={key}>{key}</th>
                                )
                            }
                        })}
                        {(data[0] && (data.username === authUsername || role === 'ADMIN'))&& <th>DELETE</th>}
                    </tr>
                </thead>
                <tbody className="text-center">
                    {data && Array.from(data).map(el => {
                        return (
                            <tr key={el["id"]} id={el["id"]}>
                                {Object.entries(el).map(([key, value]) => {
                                    if (key != "id" && key != "username" && key != "favorite" && key != "privacy" && key != "isAdmin") {
                                        return (<td className="text-capitalize" key={key} onClick={handleClick}>{value}</td>)
                                    }
                                })}
                                
                                {(el.username === authUsername || role === 'ADMIN') && <td ><i className="bi bi-trash3-fill h3" onClick={removeBook}></i></td>}
                                
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}