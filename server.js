const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const dotenv = require("dotenv");
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mern-product-manager-db"

app.use(cors());
app.use(express.json());
// Connect to MongoDB


mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// Define routes and middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const productSchema = new mongoose.Schema({
  name: String,
  description : String,
  price: Number,
  itemsInStock: Number
});

const Product = mongoose.model('Product', productSchema);

// Add this to server.js
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Create a new Product
app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json(newProduct);
});
// Update an existing Product
app.put('/products/:id', async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: false });
  res.json(updatedProduct);
});
// Delete a Product
app.delete('/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted successfully' });
});