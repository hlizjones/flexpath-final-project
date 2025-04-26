import React, { useState } from "react";
import UserInput from "./UserInput";
import SearchResults from "./SearchResults";

export default function Search() {
    const [page, setPage] = useState();

    return (
        <div className="container">
            <UserInput setPage={setPage} />
            <SearchResults page={page} />
        </div>
    );
}