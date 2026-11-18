
const express = require("express");
const app = express();

app.use(express.json());

// Hardcoded credentials
const VALID_USERNAME = "admin";
const VALID_PASSWORD = "admin123";

// POST /api/login
app.post("/api/login", (req, res) => {

    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Username and password are required"
        });
    }

    // Check credentials
    if (
        username === VALID_USERNAME &&
        password === VALID_PASSWORD
    ) {
        return res.status(200).json({
            success: true,
            message: "Login successful"
        });
    }

    // Invalid credentials
    return res.status(401).json({
        success: false,
        message: "Invalid username or password"
    });
});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
