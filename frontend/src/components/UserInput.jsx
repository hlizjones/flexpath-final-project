import React from "react";
import { useState } from "react";

export default function UserInput(props) {
    const [firstInputField, setFirstInputField] = useState("Title");
    const [secondInputField, setSecondInputField] = useState("Author");
    const [thirdInputField, setThirdInputField] = useState("Genre");


    const toggleSearch = (e) => {
        e.preventDefault();
        if (e.target.value === "books") {
            setFirstInputField("Title");
            setSecondInputField("Author");
            setThirdInputField("Genre");
        } else if (e.target.value === "collections") {
            setFirstInputField("Name");
            setSecondInputField("Username");
            setThirdInputField(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let map = new Map();

        map.set(`api`, document.getElementById("toggleSearch").value)
        
        if (document.getElementById("firstInput") && document.getElementById("firstInput").value !== "") {
            map.set(firstInputField.toLowerCase(), document.getElementById("firstInput").value)
        }
        if (document.getElementById("secondInput") && document.getElementById("secondInput").value !== "") {
            map.set(secondInputField.toLowerCase(), document.getElementById("secondInput").value)
        }
        if (document.getElementById("thirdInput") && document.getElementById("thirdInput").value !== "") {
            map.set(thirdInputField.toLowerCase(), document.getElementById("thirdInput").value)
        }

        props.setMap(map);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="col-md-2 mb-3">
                <label className="form-label text-nowrap" htmlFor="toggleSearch">Search for</label>
                <select className="form-select" name="toggleSearch" id="toggleSearch" defaultValue="books" onChange={toggleSearch}>
                    <option value="books">Book</option>
                    <option value="collections">Collection</option>
                </select>
            </div>
            <div className="col-md-5 d-grid gap-3 mb-3">
                <input className="form-control" type="search" id="firstInput" placeholder={firstInputField}></input>
                <input className="form-control" type="search" id="secondInput" placeholder={secondInputField}></input>
                {thirdInputField === "Genre" &&
                    <input className="form-control" type="search" id="thirdInput" placeholder="Genre"></input>}
            </div>
            <div className="col-md-5 d-grid gap-3 mb-3">
                <button className="btn btn-secondary" type="submit">Search</button>
            </div>
        </form>
    );
}