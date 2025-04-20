import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Profile from "./components/Pages/Profile/Profile";
import Search from "./components/Pages/Search/Search";
import Book from "./components/Pages/Book/Book";
import Collection from "./components/Collection/Collection"
import Review from "./components/Review/Review";
import NotFound from "./components/Pages/404/NotFound";
import DataProvider from "./context/DataProvider";

function App() {
  return (
    <div>
      <Navbar />
      < hr />
      <DataProvider>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/book" element={<Book />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/review" element={<Review />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
