import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStore } from "react-icons/fa";
import SearchBar from "../components/SearchBar";
import logo from "../assets/logo.png.avif";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Hardcoded categories
  const categories = [
    "Electronics",
    "Clothes",
    "Books",
    "Home & Kitchen",
    "Beauty",
    "Sports",
    "Toys",
  ];

  // Filter products by category
  const filteredProducts = products.filter((p) =>
    selectedCategory ? p.category === selectedCategory : true
  );

  // 🟢 Handle "Shop Now" click
  const handleShopNow = async (productId) => {
    try {
      let cartId = localStorage.getItem("cartId");

      // If no cart exists, create one
      if (!cartId) {
        const newCart = await axios.post("http://localhost:5000/api/carts");
        cartId = newCart.data._id;
        localStorage.setItem("cartId", cartId);
      }

      // Add product to cart
      await axios.put(`http://localhost:5000/api/carts/${cartId}/items`, {
        product: productId,
        quantity: 1,
      });

      // Redirect to cart page
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Something went wrong while adding to cart!");
    }
  };

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

      {/* Search Bar */}
      <SearchBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Action Buttons */}
      <div className="text-center mb-5">
        <Link to="/dashboard" className="btn btn-success me-3">
          Purchase
        </Link>
        <Link to="/add-product" className="btn btn-danger">
          Post Product
        </Link>
      </div>

      {/* Show Products */}
      <section>
        <h2 className="text-center mb-4 fw-semibold">New Products!</h2>
        <div className="row g-4">
          {filteredProducts.length === 0 && (
            <p className="text-center text-muted">No products yet</p>
          )}

          {filteredProducts.slice(0, 3).map((p) => {
            const imgSrc = p.image
              ? `http://localhost:5000${p.image}`
              : "/no-image.jpg";

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

                    <button
                      className="btn btn-primary mt-auto"
                      onClick={() => handleShopNow(p._id)}
                    >
                      Shop Now
                    </button>
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
