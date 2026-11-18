
const express = require("express");
const app = express();

app.use(express.json());

// Temporary storage for orders
let orders = [];

// Endpoint 1: Add Orders
app.post("/addOrders", (req, res) => {

    const order = {
        id: orders.length + 1,
        product: req.body.product,
        quantity: req.body.quantity,
        price: req.body.price
    };

    orders.push(order);

    res.json({
        message: "Order added successfully",
        order: order
    });
});

// Endpoint 2: Show Recent Orders
app.get("/showOrders", (req, res) => {

    res.json({
        message: "Recent Orders",
        orders: orders.slice().reverse()
    });
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
