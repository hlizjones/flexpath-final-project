import React, { useState } from "react";
import useUrlBuilder from "../../../hooks/useUrlBuilder";
import ToggleFields from "./ToggleFields";

export default function UserInput({ setPage, setUrl, setSort }) {
    const { buildUrl } = useUrlBuilder();
    const [firstInputField, setFirstInputField] = useState("Title");
    const [secondInputField, setSecondInputField] = useState("Author");
    const [thirdInputField, setThirdInputField] = useState("Genre");

    const handleSubmit = (e) => {
        e.preventDefault();
        let map = new Map();
        const page = document.getElementById("toggleSearch").value;
        map.set(`api`, page);

        if (document.getElementById("firstInput").value !== "") {
            map.set(firstInputField.toLowerCase(), document.getElementById("firstInput").value);
        }
        if (document.getElementById("secondInput").value !== "") {
            map.set(secondInputField.toLowerCase(), document.getElementById("secondInput").value);
        }
        if (document.getElementById("thirdInput") && document.getElementById("thirdInput").value !== "") {
            map.set(thirdInputField.toLowerCase(), document.getElementById("thirdInput").value);
        }

        setUrl(buildUrl(map));
        localStorage.setItem("searchUrl", buildUrl(map));
        setPage(page);
        localStorage.setItem("page", page);
        setSort({ key: null, order: true });
        

        document.getElementById("firstInput").value = "";
        document.getElementById("secondInput").value = "";
        if (document.getElementById("thirdInput")) {
            document.getElementById("thirdInput").value = "";
        }
    }

    return (
        <>
        <ToggleFields firstInputField={firstInputField} setFirstInputField={setFirstInputField} secondInputField={secondInputField} setSecondInputField={setSecondInputField} thirdInputField={thirdInputField} setThirdInputField={setThirdInputField} />
        <div className='container mb-5'>
            <form onSubmit={handleSubmit}>
                <div className="col-md-5 d-grid gap-3 mb-3">
                    <button className="btn btn-secondary" type="submit">Search</button>
                </div>
            </form>
        </div>
        </>
    );
}