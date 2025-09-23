import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/mongoose.config.js';

import cartRoutes from './routes/cart.routes.js';
const app = express();
app.use(express.json(), cors());
dotenv.config();
const PORT = 5000 ;
dbConnect();

app.use('/api/carts', cartRoutes)



app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`)
);