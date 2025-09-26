import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaStore } from "react-icons/fa";
import SearchBar from "../components/SearchBar";

import logo from "../assets/logo.png.avif";
import product1 from "../assets/product1.jpg";
import product2 from "../assets/product2.jpg";
import product3 from "../assets/product3.jpg";

const productImages = {
  "product1.jpg": product1,
  "product2.jpg": product2,
  "product3.jpg": product3,
};

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        const uniqueCats = [...new Set(res.data.map((p) => p.category || "Uncategorized"))];
        setCategories(uniqueCats);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = products.filter((p) =>
    selectedCategory ? p.category === selectedCategory : true
  );

  return (
    <div className="container-fluid p-3">
      {/* Top bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <Link
            to="/my-shop"
            className="btn btn-warning d-flex align-items-center"
          >
            <FaStore size={20} />
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="d-flex justify-content-center align-items-center mb-4 p-3 bg-light rounded shadow-sm">
        <div className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            style={{ height: "120px" }}
            className="me-3"
          />
          <h1 className="h3 mb-0 fw-bold">E-Market</h1>
        </div>
      </header>

      {/* Action Buttons */}
      <div className="text-center mb-5">
        <Link to="/dashboard" className="btn btn-success me-3">
          Purchase
        </Link>
        <Link to="/add-product" className="btn btn-danger">
          Post Product
        </Link>
      </div>

      {/* Category Filter */}
      <SearchBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Show Products */}
      <section>
        <h2 className="text-center mb-4 fw-semibold">New Products!</h2>
        <div className="row g-4">
          {filteredProducts.length === 0 && (
            <p className="text-center text-muted">No products yet</p>
          )}

          {filteredProducts.slice(0, 3).map((p, index) => {
            const imgSrc =
              productImages[p.image] ||
              [product1, product2, product3][index] ||
              "/no-image.jpg";

            return (
              <div key={p._id} className="col-12 col-sm-6 col-md-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={imgSrc}
                    alt={p.name}
                    style={{
                      height: "220px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                    className="card-img-top"
                    onError={(e) => (e.currentTarget.src = "/no-image.jpg")}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text flex-grow-1">{p.description}</p>
                    <p className="fw-bold mb-2">${p.price}</p>

                    <Link to="/cart" className="btn btn-primary mt-auto">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
