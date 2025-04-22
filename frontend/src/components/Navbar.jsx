import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function Navbar() {
  const { token, setUser, setRole, setToken } = useContext(AuthContext);

  const logOut = () => {
    localStorage.clear()
    setUser(null)
    setRole(null)
    setToken(null)
  }

  if (!token) {
    return (<nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <Link to="/profile" className="navbar-brand ms-4 nav-link">Login</Link>
    </nav>
    )
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <Link to="/profile" className="navbar-brand ms-4 nav-link">Profile</Link>
      <Link to="/search" className="navbar-brand ms-4 nav-link">Search</Link>
      <Link to="/profile" className="navbar-brand ms-4 nav-link" onClick={logOut}>Logout</Link>
    </nav>
  );
}