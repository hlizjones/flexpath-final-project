import React, { useContext, useState } from "react";
import { DataContext } from "../../../context/DataProvider"

export default function CreateCollection() {


    const handleSubmit = (e) => {
        e.preventDefault();
        let map = new Map();

        map.set(`api`, 'collection')

        map.set('name', document.getElementById("name").value)

        if (document.getElementById("description").value !== "") {
            map.set('description', document.getElementById("description").value)
        }
        if (document.getElementById("favorite").checked) {
            map.set('favorite', true)
        }
        if (document.getElementById("privacy").checked) {
            map.set('favorite', true)
        }

        console.log(map)

        // setMap(map);
    }

    return (
        <div className='container'>
            <div className='col-md-6 mb-3'>
                <h4>Create new collection.</h4>
                <form onSubmit={handleSubmit}>
                    <div className="d-grid gap-3 mb-3">
                        <input className="form-control" type="text" id="name" placeholder="Name of Collection" required></input>
                        <textarea className="form-control" type="description" id="description" placeholder="Describe your collection"></textarea>
                        <div className="form-check">
                            <label className="form-label text-nowrap" htmlFor="favorite" >Favorite</label>
                            <input className="form-check-input" type="checkbox" id="favorite"></input>
                        </div>
                        <div className="form-check" >
                            <label className="form-label text-nowrap" htmlFor="privacy" >Privacy</label>
                            <input className="form-check-input" type="checkbox" id="privacy"></input>
                        </div>
                    </div>
                    <div className="col-md-5 d-grid gap-3 mb-3">
                        <button className="btn btn-secondary" type="submit">Search</button>
                    </div>
                </form>
            </div>
        </div>
    )
};