import React from "react";
import useFetch from "../../../hooks/useFetch";

export default function ReviewsTable(props) {

    const {data, loading, error} = useFetch(`api/review?bookId=${props.bookId}`)

    // [
    //     {
    //         "id": 1,
    //         "bookId": 1,
    //         "rating": 5,
    //         "content": "Love Celaena!",
    //         "privacy": false,
    //         "username": "admin",
    //         "isAdmin": null
    //     }
    // ]

    const handleClick = (e) => {
        e.preventDefault();
        const page = map.get(`api`)
        let newMap = new Map();
        newMap.set(`api`, `${page}/${e.currentTarget.id}`)
        setMap(newMap)
        navigate(`/${page}`)
    }

    if (loading) return <div>Loading Records...</div>;
    return (
        <>
            {error && <p id="resultsError">Error: {error.message}</p>}
            <h6 onClick={handleClick}>Your review</h6>
            <table className="table table-hover">
                <thead className="table-secondary">
                    <tr>
                        {data[0] && Object.keys(data[0]).map(key => {
                            if (key != "id" && key != "bookId" && key != "privacy" && key != "isAdmin") {
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
                            <tr key={el["id"]} onClick={handleClick} id={el["id"]}>
                                {Object.entries(el).map(([key, value]) => { 
                                    if (key != "id" && key != "bookId" && key != "privacy" && key != "isAdmin") {
                                    return (<th key={key}>{value}</th>)}})}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}