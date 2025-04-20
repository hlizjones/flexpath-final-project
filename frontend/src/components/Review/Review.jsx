import React, { useContext } from "react";
import { DataContext } from "../../context/DataProvider"
import UserReview from "./UserReview";

export default function Review() {
    const { data, error } = useContext(DataContext)

    if (error && !data) return <div>{error.message}</div>;
    if (!data && !error) return <div>Search book</div>;

    return (
        <>
            <div className="container text-center mb-5">
                <h4>{data.rating}/5</h4>
                <h4>{data.content}</h4>
                <UserReview />
            </div>
        </>
    );
}