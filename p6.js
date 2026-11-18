
const express = require("express");

const app = express();

app.use(express.json());


// Middleware to log request method and URL
app.use((req, res, next) => {
    console.log("Method:", req.method);
    console.log("URL:", req.url);
    next();
});


// Add product
app.post("/products", (req, res) => {

    const { name, price } = req.body;

    // Validation
    if (!name || name.trim() === "") {
        return res.status(400).json({
            message: "Product name cannot be empty"
        });
    }

    if (price <= 0 || price === undefined) {
        return res.status(400).json({
            message: "Price must be greater than 0"
        });
    }

    res.status(201).json({
        message: "Product added successfully",
        product: {
            name: name,
            price: price
        }
    });

});


// Start server
app.listen(3000, () => {
    console.log("Server running on port http://localhost:3000");
});
