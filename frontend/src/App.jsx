import 'bootstrap-icons/font/bootstrap-icons.css';
import React, {useContext} from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Profile from "./components/Pages/Profile/Profile";
import Search from "./components/Pages/Search/Search";
import Book from "./components/Pages/Book/Book";
import Collection from "./components/Pages/Collection/Collection"
import Review from './components/Pages/Review/Review';
import CreateBook from './components/Pages/CreateBook';
import NotFound from "./components/Pages/404/NotFound";
import DataProvider from "./context/DataProvider";
import { AuthContext } from './context/AuthProvider';

function App() {
  const { token, role } = useContext(AuthContext);
  return (
    <div>
      <Navbar />
      < hr />
      <DataProvider>
      <Routes>
        <Route path="/" element ={<Profile/>}/>
        <Route path="/profile" element={<Profile />} />
        {token && <Route path="/search" element={<Search />} />}
        {token && <Route path="/book" element={<Book />} />}
        {token && <Route path="/collection" element={<Collection />} />}
        {token && <Route path="/review" element={<Review />} />}
        {role === "ADMIN" && <Route path="/createbook" element={<CreateBook />} />}
        <Route path="/*" element={<NotFound />} />
      </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
