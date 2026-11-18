
const express = require("express");
const app = express();

// GET /weather
app.get("/weather", async (req, res) => {

    try {
        // Weather API URL
        const weatherURL = "https://api.open-meteo.com/v1/forecast?latitude=12.9716&longitude=77.5946&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m";

        // Fetch weather data
        const response = await fetch(weatherURL);

        if (!response.ok) {
            throw new Error("API status: " + response.status);
        }

        // Convert response to JSON
        const data = await response.json();

        // Send weather details
        res.json({
            city: "Bengaluru",
            temperature: data.current.temperature_2m + " °C",
            humidity: data.current.relative_humidity_2m + "%",
            windSpeed: data.current.wind_speed_10m + " km/h",
            weatherCode: data.current.weather_code
        });

    } catch (error) {

        console.error("Actual error:", error.message);

        res.status(500).json({
            error: "Unable to fetch weather data",
            reason: error.message
        });
    }
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
