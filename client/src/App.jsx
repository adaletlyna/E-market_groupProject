// App.jsx
import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import './App.css';
// Pages
import HomePage from "./views/HomePage";
import Dashboard from "./views/Dashboard";
import AddProduct from "./views/AddProduct";
import MyShop from "./views/MyShop";
import EditProduct from "./views/EditProduct";
import Favorites from "./views/favorites";
import ViewCart from "./views/viewCart";

// Components
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";

function App() {
  // Search state shared between HomePage/Dashboard if needed
  //const [searchCategory, setSearchCategory] = useState("");

  return (
    
      <div className="App">
        {/* Optional: Global SearchBar if you want it on top of all pages */}
        {/*<SearchBar onSearch={setSearchCategory} />*/}

        <Routes>
          <Route path="/" element={<HomePage searchCategory={searchCategory} />} />
          <Route path="/dashboard" element={<Dashboard searchCategory={searchCategory} />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/my-shop" element={<MyShop />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<ViewCart />} />
        </Routes>

        <Footer />
      </div>
    
  );
}

export default App;
