import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Search from "./components/Search";
import Book from "./components/Book";
import Collection from "./components/Collection";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div>
      <Navbar />
      < hr />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/book" element={<Book />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
