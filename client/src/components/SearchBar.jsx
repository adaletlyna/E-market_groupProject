import React from "react";

export default function SearchBar({ selectedCategory, onCategoryChange }) {
  // Hardcoded categories list
  const categories = [
    "Electronics",
    "Clothes",
    "Books",
    "Home & Kitchen",
    "Beauty",
    "Sports",
    "Toys",
    "Other"
  ];

  return (
    <div className="d-flex align-items-center gap-2 mb-3">
      <label htmlFor="categorySelect" className="fw-bold mb-0">
        Category:
      </label>
      <select
        id="categorySelect"
        className="form-select"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        style={{ maxWidth: "200px" }}
      >
        <option value="">All</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

