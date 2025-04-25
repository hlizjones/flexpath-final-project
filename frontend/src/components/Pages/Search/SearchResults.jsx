import React from "react";
import useLoadPage from "../../../hooks/useLoadPage";

export default function SearchResults({loading, data, error, map}) {
    const { handleLoad } = useLoadPage();

    const handleClick = (e) => {
        e.preventDefault();
        const page = map.get(`api`)
        handleLoad(`api/${page}/${e.currentTarget.id}`, page)
    }

    if (loading) return <div>Loading records...</div>;
    if (error) return <div className="mb-5 text-danger">Error: Failed to load records.</div>

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
                                    return (<th key={value}>{value}</th>)})}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
}
        </>
    
    );
}