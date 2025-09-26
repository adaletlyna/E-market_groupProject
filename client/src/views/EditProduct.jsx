import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const categories = [
    "Electronics",
    "Sports",
    "Fashion",
    "Books",
    "Home & Kitchen",
    "High-Tec",
  ];

  // ✅ Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setFormData({
          name: data.name || "",
          description: data.description || "",
          price: data.price || "",
          category: data.category || "",
          image: data.image || "",
          stock: data.stock || "",
        });
      } catch (err) {
        console.error("❌ Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      });
      alert("✅ Product updated successfully!");
      navigate("/my-shop");
    } catch (error) {
      console.error("❌ Error updating product:", error);
      alert("Failed to update product");
    }
  };

  const handleCancel = () => {
    navigate("/my-shop");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">✏️ Edit Product</h2>

      {/* Navigation Links */}
      <div className="d-flex justify-content-end gap-3 mb-4">
        <Link to="/">🏠 Home</Link>
        <Link to="/my-shop">🛍️ My Shop</Link>
      </div>

      <form
        className="mx-auto"
        style={{ maxWidth: "600px" }}
        onSubmit={handleSubmit}
      >
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

        {/* ✅ Category as Dropdown */}
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">-- Select a category --</option>
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

        <div className="d-flex gap-3">
          <button type="submit" className="btn btn-success w-50">
            💾 Save Changes
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary w-50"
          >
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
