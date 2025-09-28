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
    stock: "",
  });

  const [existingImages, setExistingImages] = useState([]); // already stored
  const [newImages, setNewImages] = useState([]); // files to upload
  const [errors, setErrors] = useState({}); // validation errors

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
          stock: data.stock || "",
        });
        setExistingImages(data.images || []);
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

  const handleImageChange = (e) => {
    setNewImages(Array.from(e.target.files)); // multiple files
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // reset

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("description", formData.description);
      payload.append("price", formData.price);
      payload.append("category", formData.category);
      payload.append("stock", formData.stock);

      if (newImages.length > 0) {
        newImages.forEach((file) => payload.append("images", file));
      }

      await axios.put(`http://localhost:5000/api/products/${id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Product updated successfully!");
      navigate("/my-shop");
    } catch (error) {
      if (error.response?.data?.errors) {
        // Backend validation errors
        const backendErrors = {};
        Object.keys(error.response.data.errors).forEach((key) => {
          backendErrors[key] = error.response.data.errors[key].message;
        });
        setErrors(backendErrors);
      } else {
        alert("❌ Failed to update product");
        console.error("❌ Error updating product:", error.response?.data || error.message);
      }
    }
  };

  const handleCancel = () => {
    navigate("/my-shop");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">✏️ Edit Product</h2>

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
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
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
            <option value="">-- Select a category --</option>
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
          <label className="form-label">Stock Quantity</label>
          <input
            type="number"
            className={`form-control ${errors.stock ? "is-invalid" : ""}`}
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
          {errors.stock && (
            <div className="invalid-feedback">{errors.stock}</div>
          )}
        </div>

        {/* ✅ Show existing images */}
        {existingImages.length > 0 && (
          <div className="mb-3">
            <label className="form-label">Current Images</label>
            <div className="d-flex gap-2 flex-wrap">
              {existingImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img.startsWith("http") ? img : `http://localhost:5000/${img}`}
                  alt={`Current ${idx}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* ✅ Upload new images (optional) */}
        <div className="mb-3">
          <label className="form-label">Upload New Images</label>
          <input
            type="file"
            className={`form-control ${errors.images ? "is-invalid" : ""}`}
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          {errors.images && (
            <div className="invalid-feedback">{errors.images}</div>
          )}
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
