import React from "react";

export default function CollectionManagement() {

    const handleSubmit = () => {


    }

    return (
        <form onSubmit={handleSubmit}>
        <div className="d-grid mt-5 mb-3">
            <select className="form-control" type="search" id="selectCollection" placeholder="Name of Collection"></select>
        </div>
        <div className="d-grid gap-3 mb-5">
            <button className="btn btn-secondary" type="submit">Add/Delete Collection</button>
        </div>
    </form>
    )

}