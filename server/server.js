import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import dbConnect from './config/mongoose.config.js';
import productRoutes from './routes/Product.routes.js';
import cartRoutes from './routes/cart.routes.js';

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// Connect DB
dbConnect();

// Static folder for images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use('/api/carts', cartRoutes);
app.use('/api/products', productRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
