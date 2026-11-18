
const express = require("express");
const app = express();

app.use(express.json());

let tasks = [];

// Add task
app.post("/tasks", (req, res) => {
    const { title, status } = req.body;

    tasks.push({
        title: title,
        status: status
    });

    res.json({
        message: "Task added successfully"
    });
});

// View tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port http://localhost:3000");
});
