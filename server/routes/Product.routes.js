
import express from "express";
import multer from "multer";
import path from "path";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/Product.controller.js";

const router = express.Router();

//  Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // save files in /uploads folder
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname)); // keep original extension
  },
});

const upload = multer({ storage });

//  Routes
// POST product with multiple images (field name: "images")
router.post("/", upload.array("images", 5), createProduct);

router.get("/", getProducts);
router.get("/:id", getProductById);

// Allow updating product with optional new images
router.put("/:id", upload.array("images", 5), updateProduct);

router.delete("/:id", deleteProduct);

export default router;
