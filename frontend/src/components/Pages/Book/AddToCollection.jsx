import React from "react";

export default function AddToCollection() {

    return (

        <form>
            <h4>Add book to a collection.</h4>
            <select className="form-select" name="selectCollection" id="selectCollection" defaultValue="books" >

            </select>
        </form>
    );
}