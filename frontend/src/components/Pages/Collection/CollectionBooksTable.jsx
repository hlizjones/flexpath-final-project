import React, { useContext, useEffect, useMemo, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/AuthProvider";
import { DataContext } from "../../../context/DataProvider";
import useCreateRequest from "../../../hooks/useCreateRequest";
import useLoadPage from "../../../hooks/useLoadPage";
import useMessageTimeout from "../../../hooks/useMessageTimeout";
import useSort from "../../../hooks/useSort";

export default function CollectionBooksTable({ id }) {
    const { role, token, username: authUsername } = useContext(AuthContext);
    const { setRefresh } = useContext(DataContext);
    const { handleLoad } = useLoadPage();
    const { handleRequest, data: removeBookData, loading: removeBookLoading, error: removeBookError } = useCreateRequest();
    useMessageTimeout(removeBookError);

    const url = useMemo(() => (`api/book_collection?id=${id}`), [id]);
    const options = useMemo(() => ({ headers: { 'Authorization': `Bearer ${token}` } }), [token]);
    const { data, loading, error } = useFetch(url, options);

    const [sort, setSort] = useState({ key: null, order: true });
    const { sortedData } = useSort(data, sort, setSort);

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
        if (typeof removeBookData === "string") {
            setRefresh(refresh => !refresh);
        }
    }, [removeBookData, setRefresh]);

    const handleSort = (e) => {
        const key = e.currentTarget.id;
        setSort({key: key, order: key === sort.key ? !sort.order : sort.order});
    }

    return (
        <div className="container">
            {loading && <div>Loading Records...</div>}
            {error && <div className="mb-5 text-danger">Error: Failed to load books.</div>}
            {(!error && Object.keys(sortedData).length === 0) && <div>No books to display.</div>}
            {removeBookLoading && <div>Removing book from collection...</div>}
            {removeBookError && <div className="visible mb-5 text-danger" id="errorMsg">Error: Failed to remove book.</div>}
            <table className="table table-hover">
                <thead className="table-secondary text-center">
                    <tr>
                        {sortedData[0] && Object.keys(sortedData[0]).map(key => {
                            if (key != "id" && key != "username" && key != "favorite" && key != "privacy" && key != "isAdmin") {
                                return (
                                    <th className="text-uppercase" scope="col" key={key} id={key} onClick={handleSort}>
                                        {key}
                                        <i className="bi bi-caret-up-fill" id={key+"caret"}></i>
                                        </th>
                                )
                            }
                        })}
                        {(sortedData[0] && (sortedData.username === authUsername || role === 'ADMIN')) && <th>DELETE</th>}
                    </tr>
                </thead>
                <tbody className="text-center">
                    {sortedData && Array.from(sortedData).map(el => {
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