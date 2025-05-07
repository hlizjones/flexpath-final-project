import React from "react";
import useLoadPage from "../../../hooks/useLoadPage";
import useSort from "../../../hooks/useSort";

export default function SearchResults({ page, data, loading, error, setSort, sort }) {
    const { handleLoad } = useLoadPage();
    const { sortedData } = useSort(data, sort);

    const handleClick = (e) => {
        e.preventDefault();
        handleLoad(`api/${page}/${e.currentTarget.id}`, page);
    }

    const handleSort = (e) => {
        const key = e.currentTarget.id;
        setSort({ key: key, order: key === sort.key ? !sort.order : true });
    }

    return (
        <div className="container">
            {loading && <div>Loading search results...</div>}
            {error && <div className="mb-5 text-danger">Error: Failed to load search results.</div>}
            {!error && sortedData.length === 0 && <div>Search to find a book or collection!</div>}
            {sortedData.length > 0 &&
                <table className="table table-hover">
                    <thead className="table-secondary">
                        <tr>
                            {sortedData[0] && Object.keys(sortedData[0]).map(key => {
                                if (key != "id" && key != "privacy" && key != "favorite" && key != "isAdmin") {
                                    return (
                                        <th className="text-uppercase align-middle" scope="col" key={key} id={key} onClick={handleSort}>
                                            {key}
                                            <i className="bi bi-caret-up-fill" id={key+"caret"}></i>
                                        </th>
                                    )
                                }
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData && Array.from(sortedData).map(el => {
                            return (
                                <tr key={el["id"]} data-testid={"objectRow"} onClick={handleClick} id={el["id"]}>
                                    {Object.entries(el).map(([key, value]) => {
                                        if (key != "id" && key != "privacy" && key != "favorite" && key != "isAdmin")
                                            return (<td className="text-capitalize" key={value}>{value}</td>)
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            }
        </div>
    );
}