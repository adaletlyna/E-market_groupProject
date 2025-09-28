import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBar from "../components/SearchBar";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [quantities, setQuantities] = useState({});
  const [favoriteCart, setFavoriteCart] = useState([]);

  const navigate = useNavigate();

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

  // Fetch products
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Handle quantity change
  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: value < 1 ? 1 : value,
    }));
  };

  // Add to favorites
  const handleAddToFavorite = (product) => {
    const quantity = quantities[product._id] || 1;
    const existing = favoriteCart.find((p) => p._id === product._id);

    if (existing) {
      setFavoriteCart((prev) =>
        prev.map((p) =>
          p._id === product._id
            ? { ...p, quantity: p.quantity + quantity }
            : p
        )
      );
    } else {
      setFavoriteCart((prev) => [...prev, { ...product, quantity }]);
    }
  };

  // Shop Now → Add to backend cart + go to /cart
  const handleShopNow = async (productId) => {
    try {
      let cartId = localStorage.getItem("cartId");
      const quantity = quantities[productId] || 1;

      // If no cart exists, create one
      if (!cartId) {
        const newCart = await axios.post("http://localhost:5000/api/carts");
        cartId = newCart.data._id;
        localStorage.setItem("cartId", cartId);
      }

      // Add product with chosen quantity
      await axios.put(`http://localhost:5000/api/carts/${cartId}/items`, {
        product: productId,
        quantity,
      });

      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Something went wrong while adding to cart!");
    }
  };

  // Go to favorites page
  const handleGoToFavorites = () => {
    navigate("/favorites", { state: { favoriteCart } });
  };

  // Filter products by category
  const filteredProducts = products.filter((p) =>
    selectedCategory ? p.category === selectedCategory : true
  );

  return (
    <div className="container-fluid p-4">
      {/* Top Navigation */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <Link to="/" className="me-3">🏠 Home</Link>
          <Link to="/categories">📂 Category</Link>
        </div>
        <button
          className="btn btn-outline-success"
          onClick={handleGoToFavorites}
        >
          🛒 ({favoriteCart.length})
        </button>
      </div>

      {/* Category Filter */}
      <SearchBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Products Section */}
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
                {/* Product Images */}
                {p.images && p.images.length > 0 ? (
                  <div
                    id={`carousel-${p._id}`}
                    className="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner">
                      {p.images.map((img, idx) => (
                        <div
                          key={idx}
                          className={`carousel-item ${idx === 0 ? "active" : ""}`}
                        >
                          <img
                            src={img}
                            className="d-block w-100 card-img-top"
                            alt={p.name}
                            onError={(e) =>
                              (e.currentTarget.src = "/no-image.jpg")
                            }
                          />
                        </div>
                      ))}
                    </div>
                    {p.images.length > 1 && (
                      <>
                        <button
                          className="carousel-control-prev"
                          type="button"
                          data-bs-target={`#carousel-${p._id}`}
                          data-bs-slide="prev"
                        >
                          <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                          className="carousel-control-next"
                          type="button"
                          data-bs-target={`#carousel-${p._id}`}
                          data-bs-slide="next"
                        >
                          <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Next</span>
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <img
                    src="/no-image.jpg"
                    className="card-img-top"
                    alt="No image available"
                  />
                )}

                {/* Product Info */}
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
                    <button
                      className="btn btn-sm btn-primary flex-grow-1"
                      onClick={() => handleShopNow(p._id)}
                    >
                      Shop Now
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
