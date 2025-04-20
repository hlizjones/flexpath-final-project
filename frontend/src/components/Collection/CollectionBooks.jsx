import React from "react";
import useFetch from "../../hooks/useFetch";

export default function CollectionBooks(props) {

    const {data, loading, error} = useFetch(`api/review?collectionId=${props.collectionId}`)

    if (loading) return <div>Loading Records...</div>;
    return (
        <>
            {error && <p id="resultsError">Error: {error.message}</p>}
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
                    </tr>
                </thead>
                <tbody>
                    {data && Array.from(data).map(el => {
                        console.log(el["id"])
                        return (
                            <tr key={el["id"]}>
                                {Object.entries(el).map(([key, value]) => { 
                                    if (key != "id" && key != "username" && key != "favorite" && key != "privacy" && key != "isAdmin") {
                                    return (<th key={key}>{value}</th>)}})}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}