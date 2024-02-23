import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/dp.js';
import products from './data/products.js';
import userRoutes from './routes/userRoutes.js'

dotenv.config();
connectDB();
const app = express();

app.use(express.json())

app.get('/', (req,res) =>{
    res.send("Api is Running...")
});


app.use('/api/users', userRoutes)

app.get('/api/products', (req,res) => {
    res.json(products)
});

app.get('/api/products/:id', (req,res) => {
const product = products.find((p) => p._id === parseInt(req.params.id)); 
    res.json(product);
});

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is Running on Port ${PORT}`));



