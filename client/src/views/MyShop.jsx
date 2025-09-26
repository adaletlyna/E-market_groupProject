import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const MyShop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      alert("✅ Product deleted successfully");
    } catch (err) {
      console.error("❌ Error deleting product:", err);
      alert("Failed to delete product");
    }
  };

  // ✏️ Edit product → navigate to edit page
  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {/* 🔗 Navigation Links - Top right */}
      <div className="d-flex justify-content-end gap-3 p-3 bg-light">
        <Link to="/">🏠 Home</Link>
        <Link to="/add-product">➕ Add Product</Link>
        <Link to="/view-products">📦 View Products</Link>
      </div>

      <div className="container mt-4">
        <h2 className="text-center mb-4">🛍️ My Shop</h2>

        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center">No products available. Start by adding a new one.</p>
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4 mb-4">
                <div className="card shadow-sm h-100">
                  {product.image && (
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-muted">{product.category}</p>
                    <p className="card-text">
                      <strong>${product.price}</strong>
                    </p>
                    <p className="card-text small">
                      Stock: {product.stock ?? "N/A"}
                    </p>

                    {/* Buttons at bottom */}
                    <div className="mt-auto d-flex gap-2">
                      <button
                        onClick={() => handleEdit(product._id)}
                        className="btn btn-primary w-50"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-danger w-50"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyShop;