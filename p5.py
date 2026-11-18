
const express = require('express');

const app = express();

// Middleware to read JSON data
app.use(express.json());


// Sample product list
let products = [
    { id: 1, name: "Laptop", price: 55000 },
    { id: 2, name: "Mobile Phone", price: 25000 },
    { id: 3, name: "Headphones", price: 2000 }
];


// GET /products
// Returns all products
app.get('/products', (req, res) => {
    res.json(products);
});


// POST /products
// Adds a new product
app.post('/products', (req, res) => {

    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    };

    products.push(newProduct);

    res.status(201).json({
        message: "Product added successfully",
        product: newProduct
    });

});


// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
