import Product from "../models/Product.model.js";


// CREATE
const createProduct = async (req, res) => {
  try {
    const imagePaths = req.files ? req.files.map((file) => "/uploads/" + file.filename) : [];

    const product = await Product.create({
      ...req.body,
      images: imagePaths,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// READ all
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ one
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateProduct = async (req, res) => {
  try {
    const imagePaths = req.files
      ? req.files.map((file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`)
      : [];


    const updatedData = {
      ...req.body,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
    };

    // If new images uploaded, replace the old ones
    if (imagePaths.length > 0) {
      updatedData.images = imagePaths;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
