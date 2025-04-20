import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";

export default function UserReview() {
    const [url, setUrl] = useState()
    const [body, setBody] = useState({})
    const { data, error, loading } = useFetch(url, body)

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

    const handleSubmit = () => {


    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="d-grid gap-3 mb-3">
                    <input className="form-control" type="number" min="1" max="5" id="rating" placeholder="Rating"></input>
                    <textarea className="form-control" type="search" id="review" placeholder="Share your thoughts"></textarea>
                </div>
                <div className="d-grid gap-3 mb-3">
                    <button className="btn btn-secondary" type="submit">Add/Update Review</button>
                    <button className="btn btn-secondary" type="submit">Delete Review</button>
                </div>
            </form>
        </>
    )

}