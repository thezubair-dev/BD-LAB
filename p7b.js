
const express = require("express");
const app = express();

app.use(express.json());

let tasks = [];

// Add task
app.post("/tasks", (req, res) => {
    const { title, status } = req.body;

    // Input validation
    if (!title || typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({
            error: "Title is required and must be a non-empty string."
        });
    }

    // Status validation
    const validStatuses = ["pending", "in-progress", "completed"];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({
            error: "Status must be pending, in-progress, or completed."
        });
    }

    // Add task
    const task = {
        title: title.trim(),
        status: status
    };

    tasks.push(task);

    res.status(201).json({
        message: "Task added successfully",
        task: task
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
