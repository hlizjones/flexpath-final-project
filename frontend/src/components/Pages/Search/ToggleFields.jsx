import React from "react";

export default function ToggleFields({ firstInputField, setFirstInputField, secondInputField, setSecondInputField, thirdInputField, setThirdInputField }) {

    const toggleSearch = (e) => {
        e.preventDefault();

        console.log('toggleSearch fired with value:', e.target.value);        
        if (e.target.value === "book") {
            setFirstInputField("Title");
            setSecondInputField("Author");
            setThirdInputField("Genre");
        } else if (e.target.value === "collection") {
            setFirstInputField("Name");
            setSecondInputField("Username");
            setThirdInputField(false);
        }
    }

    return (
        <>
            <div className="col-md-2 mb-3">
                <label className="form-label text-nowrap" htmlFor="toggleSearch">Search for</label>
                <select className="form-select" name="toggleSearch" id="toggleSearch" defaultValue="books" onChange={toggleSearch}>
                    <option value="book">Book</option>
                    <option value="collection">Collection</option>
                </select>
            </div>
            <div className="col-md-5 d-grid gap-3 mb-3">
                <input className="form-control" type="search" id="firstInput" data-testid="firstInput" placeholder={firstInputField}></input>
                <input className="form-control" type="search" id="secondInput" data-testid="secondInput" placeholder={secondInputField}></input>
                {thirdInputField &&
                    <input className="form-control" type="search" id="thirdInput" data-testid="thirdInput" placeholder={thirdInputField}></input>}
            </div>
        </>
    );
}