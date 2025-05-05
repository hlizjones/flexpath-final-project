import React, { useContext, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/AuthProvider";
import useLoadPage from "../../../hooks/useLoadPage";
import { DataContext } from "../../../context/DataProvider";
import useSort from "../../../hooks/useSort";

export default function BookReviewsTable({ url, options }) {
    const { username, role } = useContext(AuthContext);
    const { refresh } = useContext(DataContext);
    const { handleLoad } = useLoadPage();

    const { data, loading, error } = useFetch(url, options, refresh);

    const [sort, setSort] = useState({ key: null, order: true });
    const { sortedData } = useSort(data, sort, setSort);

    const handleClick = (e) => {
        e.preventDefault();
        handleLoad(`api/review/${e.currentTarget.id}`, 'review');
    }

    const handleSort = (e) => {
        const key = e.currentTarget.id;
        setSort({ key: key, order: key === sort.key ? !sort.order : sort.order });
    }

    return (
        <div className="container">
            {loading && <div>Loading reviews...</div>}
            {(error && sortedData.length === 0) && <div className="mb-5 text-danger">Error: Failed to load reviews.</div>}
            {(!error && sortedData.length === 0) && <div>No reviews to display.</div>}
            {sortedData.length > 0 && <table className="table table-hover">
                <thead className="table-secondary text-center">
                    <tr>
                        {sortedData[0] && Object.keys(sortedData[0]).map(key => {
                            if (key != "id" && key != "bookId" && key != "privacy" && key != "isAdmin") {
                                if (key != "content") {
                                    return (
                                        <th data-testid="headers" className="text-uppercase align-middle" scope="col" key={key} id={key} onClick={handleSort}>
                                            {key}
                                            <i className="bi bi-caret-up-fill" id={key + "caret"}></i>
                                        </th>
                                    )
                                } else {
                                    return (
                                        <th className="text-uppercase align-middle" scope="col" key={key}>{key}</th>
                                    )
                                }
                            }
                        })}
                        {sortedData[0] && <th>EDIT YOUR REVIEW</th>}
                    </tr>
                </thead>
                <tbody className="text-center">
                    {sortedData && Array.from(sortedData).map(el => {
                        return (
                            <tr data-testid={"reviewRow"} key={el["id"]}>
                                {Object.entries(el).map(([key, value]) => {
                                    if (key != "id" && key != "bookId" && key != "privacy" && key != "isAdmin") {
                                        if (key === "username") {
                                            return (<td className="text-capitalize align-middle" key={key}>{value}</td>)
                                        } else if (key === "content") {
                                            return (<td className="text-start align-middle" key={key}>{value}</td>)
                                        } else {
                                            return (<td className="align-middle" key={key}>{value}</td>)
                                        }
                                    }
                                })}
                                <td className="align-middle" key={el["id"] + "btn"}>
                                    {(el.username === username || role === "ADMIN") &&
                                        <i data-testid={"editIcon"} className="bi bi-pencil-square h3 " onClick={handleClick} id={el["id"]}></i>
                                    }
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>}
        </div>
    );
}