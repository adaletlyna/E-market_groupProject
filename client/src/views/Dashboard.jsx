import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBar from "../components/SearchBar";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [quantities, setQuantities] = useState({});
  const [favoriteCart, setFavoriteCart] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        // Extract unique categories
        const uniqueCats = [...new Set(res.data.map((p) => p.category || "Uncategorized"))];
        setCategories(uniqueCats);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: value < 1 ? 1 : value,
    }));
  };

  const handleAddToFavorite = (product) => {
    const quantity = quantities[product._id] || 1;
    const existing = favoriteCart.find((p) => p._id === product._id);

    if (existing) {
      setFavoriteCart((prev) =>
        prev.map((p) =>
          p._id === product._id ? { ...p, quantity: p.quantity + quantity } : p
        )
      );
    } else {
      setFavoriteCart((prev) => [...prev, { ...product, quantity }]);
    }
  };

  const handleBuyNow = (product) => {
    const quantity = quantities[product._id] || 1;
    alert(
      `You bought ${quantity} of "${product.name}" for $${product.price * quantity}`
    );
  };

  const handleGoToFavorites = () => {
    navigate("/favorites", { state: { favoriteCart } });
  };

  // Filter products by search & category
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container-fluid p-4">
      {/* Top Navigation */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <Link to="/" className="me-3">🏠 Home</Link>
          <Link to="/categories">📂 Category</Link>
        </div>
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-outline-success" onClick={handleGoToFavorites}>
            🛒 ({favoriteCart.length})
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <SearchBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <header style={{ textAlign: "center", margin: "20px 0" }}>
        <h1 style={{ margin: 0 }}>All Products</h1>
      </header>

      <section>
        <div className="row g-4">
          {filteredProducts.length === 0 && (
            <p style={{ textAlign: "center" }}>No products found</p>
          )}

          {filteredProducts.map((p) => (
            <div key={p._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm">
                <img
                  src={p.image || "/no-image.jpg"}
                  className="card-img-top"
                  alt={p.name}
                  onError={(e) => (e.currentTarget.src = "/no-image.jpg")}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text flex-grow-1">{p.description}</p>
                  <p className="fw-bold mb-2">${p.price}</p>

                  {/* Quantity Selector */}
                  <div className="d-flex align-items-center mb-2">
                    <label className="me-2">Quantity:</label>
                    <input
                      type="number"
                      min="1"
                      value={quantities[p._id] || 1}
                      onChange={(e) =>
                        handleQuantityChange(p._id, parseInt(e.target.value))
                      }
                      className="form-control"
                      style={{ width: "80px" }}
                    />
                  </div>

                  {/* Buttons */}
                  <div className="d-flex gap-2 mt-auto">
                    <button
                      className="btn btn-sm btn-success flex-grow-1"
                      onClick={() => handleAddToFavorite(p)}
                    >
                      Add to Favorite
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
