import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: ""
  });

  const categories = [
    "Electronics",
    "Clothing",
    "Books",
    "Home & Kitchen",
    "Beauty",
    "Sports",
    "Toys",
    "Other"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock)
      };

      // ✅ Add to BOTH Seller Shop & Dashboard
      await Promise.all([
        axios.post("http://localhost:5000/api/products", payload),
        axios.post("http://localhost:5000/api/dashboard", payload),
      ]);

      // ✅ Redirect to My Shop after success
      navigate("/my-shop");
    } catch (error) {
      console.error("❌ Error adding product:", error);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      stock: ""
    });
  };

  return (
    <>
      {/* 🔗 Top Navigation */}
      <div className="d-flex justify-content-end gap-3 p-3 bg-light">
        <Link to="/">🏠 Home</Link>
        <Link to="/my-shop">🛍️ My Shop</Link>
        <Link to="/dashboard">📦 View Products</Link>
      </div>

      {/* Add Product Form */}
      <div className="container mt-4">
        <h2 className="mb-4 text-center">Add New Product</h2>

        <form className="mx-auto" style={{ maxWidth: "600px" }} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Price ($)</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* ✅ Category Dropdown */}
          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">-- Select a Category --</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              className="form-control"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Stock Quantity</label>
            <input
              type="number"
              className="form-control"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>

          {/* ✅ Action Buttons */}
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success w-50 me-2">
              ➕ Add Product
            </button>
            <button
              type="button"
              className="btn btn-outline-danger w-50 ms-2"
              onClick={handleCancel}
            >
              ✖ Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
