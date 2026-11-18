
const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

// API endpoint
app.post("/send", async (req, res) => {

    const student = {
        name: "Swathi",
        course: "MCA",
        marks: 85
    };

    try {
        // Send data to n8n webhook
        const response = await axios.post(
            "https://zub-123.app.n8n.cloud/webhook-test/student-data",
            student
        );

        // Log n8n response
        console.log("Response from n8n:", response.data);

        res.json({
            message: "Data sent successfully",
            n8nResponse: response.data
        });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            message: "Failed to send data"
        });
    }
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
