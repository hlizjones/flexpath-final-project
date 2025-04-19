import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <Link to="/profile" className="navbar-brand ms-4 nav-link">Profile</Link>
        <Link to="/search" className="navbar-brand ms-4 nav-link">Search</Link>
      </nav>
    );
}