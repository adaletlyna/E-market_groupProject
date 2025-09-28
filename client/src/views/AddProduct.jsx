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
    stock: "",
    images: [],
  });

  const [errors, setErrors] = useState({}); // store validation errors

  const categories = [
    "Electronics",
    "Clothing",
    "Books",
    "Home & Kitchen",
    "Beauty",
    "Sports",
    "Toys",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      images: Array.from(e.target.files),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // reset errors

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("description", formData.description);
      payload.append("price", formData.price);
      payload.append("category", formData.category);
      payload.append("stock", formData.stock);

      if (formData.images.length > 0) {
        formData.images.forEach((file) => {
          payload.append("images", file); // must match backend
        });
      }

      await axios.post("http://localhost:5000/api/products", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/my-shop");
    } catch (error) {
      if (error.response?.data?.errors) {
        // Mongoose validation errors
        const backendErrors = {};
        Object.keys(error.response.data.errors).forEach((key) => {
          backendErrors[key] = error.response.data.errors[key].message;
        });
        setErrors(backendErrors);
      } else {
        alert(
          "Failed to add product. Check console for details."
        );
        console.error("Error adding product:", error.response?.data || error.message);
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      images: [],
    });
    setErrors({});
  };

  return (
    <>
      <div className="d-flex justify-content-end gap-3 p-3 bg-light">
        <Link to="/">🏠 Home</Link>
        <Link to="/my-shop">🛍️ My Shop</Link>
        <Link to="/dashboard">📦 View Products</Link>
      </div>

      <div className="container mt-4">
        <h2 className="mb-4 text-center">Add New Product</h2>

        <form
          className="mx-auto"
          style={{ maxWidth: "600px" }}
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className={`form-control ${errors.description ? "is-invalid" : ""}`}
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Price ($)</label>
            <input
              type="number"
              className={`form-control ${errors.price ? "is-invalid" : ""}`}
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
            {errors.price && (
              <div className="invalid-feedback">{errors.price}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className={`form-select ${errors.category ? "is-invalid" : ""}`}
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
            {errors.category && (
              <div className="invalid-feedback">{errors.category}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Product Images</label>
            <input
              type="file"
              name="images"
              className={`form-control ${errors.images ? "is-invalid" : ""}`}
              onChange={handleImageChange}
              accept="image/*"
              multiple
            />
            {errors.images && (
              <div className="invalid-feedback">{errors.images}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Stock Quantity</label>
            <input
              type="number"
              className={`form-control ${errors.stock ? "is-invalid" : ""}`}
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
            {errors.stock && (
              <div className="invalid-feedback">{errors.stock}</div>
            )}
          </div>

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

