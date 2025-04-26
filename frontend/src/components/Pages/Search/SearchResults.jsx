import React, {useContext} from "react";
import useLoadPage from "../../../hooks/useLoadPage";
import {DataContext} from "../../../context/DataProvider";

export default function SearchResults({page}) {
    const {  data, loading, error, url  } = useContext(DataContext);
    const { handleLoad } = useLoadPage();

    const handleClick = (e) => {
        e.preventDefault();
        handleLoad(`api/${page}/${e.currentTarget.id}`, page)
    }

    if (loading) return <div>Loading records...</div>;
    if (error) return <div className="mb-5 text-danger">Error: Failed to load records.</div>
    if (Object.keys(data).length === 0 || url === "api/collection?profile=true") return <div>Search to see results!</div>
    return (
        <>
        {data &&
            <table className="table table-hover">
                <thead className="table-secondary">
                    <tr>
                        {data[0] && Object.keys(data[0]).map(key => {
                            if (key != "id" && key != "privacy" && key != "favorite" && key != "isAdmin") {
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
                                    if (key != "id" && key != "privacy" && key != "favorite" && key != "isAdmin")
                                    return (<td className="text-capitalize" key={value}>{value}</td>)})}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
}
        </>
    
    );
}