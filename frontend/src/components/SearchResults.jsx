import React from "react";

export default function SearchResults(props) {
    const { data, loading, error } = props.result;

    if (loading) return <div>Loading Records...</div>;

    const handleClick = (e) => {
        e.preventDefault();
        console.log(e.currentTarget.dataset.id)
    }

    return (
        <>
            {error && <p id="resultsError">Error: {error.message}</p>}
            <table className="table table-striped">
                <thead>
                    <tr>
                        {data[0] && Object.keys(data[0]).map(key => {
                            if (key != "id") {
                            return (
                            <th scope="col" key={key}>{key.toUpperCase()}</th>
                            )
                        }
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data && data.map(el => {
                        console.log(el["id"])
                        return (
                            <tr key={el["id"]} onClick={handleClick} data-id={el["id"]}>
                                {Object.values(el).map(value => { 
                                    if (!Number.isInteger(value))
                                    return (<th key={value}>{value}</th>)})}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}