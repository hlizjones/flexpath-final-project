import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/AuthProvider";
import { DataContext } from "../../../context/DataProvider";
import useCreateRequest from "../../../hooks/useCreateRequest";
import useLoadPage from "../../../hooks/useLoadPage";
import useMessageTimeout from "../../../hooks/useMessageTimeout";
import useSort from "../../../hooks/useSort";

export default function CollectionBooksTable({ collectionId, username, url, options }) {
    const { role, username: authUsername } = useContext(AuthContext);
    const { setRefresh } = useContext(DataContext);
    const { handleLoad } = useLoadPage();
    const { handleRequest, data: removeBookData, loading: removeBookLoading, error: removeBookError } = useCreateRequest();
    useMessageTimeout(removeBookError);

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
        handleRequest(null, `api/book_collection?bookId=${bookId}&collectionId=${collectionId}`, "DELETE");
    }

    useEffect(() => {
        if (typeof removeBookData === "string") {
            setRefresh(refresh => !refresh);
        }
    }, [removeBookData, setRefresh]);

    const handleSort = (e) => {
        const key = e.currentTarget.id;
        setSort({ key: key, order: key === sort.key ? !sort.order : true });
    }

    return (
        <div className="container">
            {loading && <div>Loading books...</div>}
            {error && <div className="mb-5 text-danger">Error: Failed to load books.</div>}
            {(!error && sortedData.length === 0) && <div>No books to display.</div>}
            {removeBookLoading && <div>Removing book from collection...</div>}
            {removeBookError && <div className="visible mb-5 text-danger" id="errorMsg">Error: Failed to remove book.</div>}
            {sortedData.length > 0 && <table className="table table-hover">
                <thead className="table-secondary text-center">
                    <tr>
                        {sortedData[0] && Object.keys(sortedData[0]).map(key => {
                            if (key != "id") {
                                return (
                                    <th data-testid="headers" className="text-uppercase" scope="col" key={key} id={key} onClick={handleSort}>
                                        {key}
                                        <i className="bi bi-caret-up-fill" id={key + "caret"}></i>
                                    </th>
                                )
                            }
                        })}
                        {(sortedData[0] && (username === authUsername || role === 'ADMIN')) && <th>REMOVE BOOK</th>}
                    </tr>
                </thead>
                <tbody className="text-center">
                    {sortedData && Array.from(sortedData).map(el => {
                        return (
                            <tr data-testid={"bookRow"} key={el["id"]} id={el["id"]}>
                                {Object.entries(el).map(([key, value]) => {
                                    if (key != "id") {
                                        return (<td className="text-capitalize" key={key} onClick={handleClick}>{value}</td>)
                                    }
                                })}
                                {(username === authUsername || role === 'ADMIN') && <td ><i data-testid={"deleteIcon"} className="bi bi-trash3-fill h3" onClick={removeBook}></i></td>}
                            </tr>
                        );
                    })}
                </tbody>
            </table>}
        </div>
    );
}