
const express = require("express");
const app = express();

app.use(express.json());

// Student API
app.post("/student", (req, res) => {

    const marks = req.body.marks;

    // Generate improved feedback
    let feedback;
    let grade;

    if (marks >= 90) {
        grade = "A+";
        feedback = "Outstanding performance!";
    }
    else if (marks >= 75) {
        grade = "A";
        feedback = "Excellent performance!";
    }
    else if (marks >= 50) {
        grade = "B";
        feedback = "Good performance. Keep improving!";
    }
    else {
        grade = "C";
        feedback = "Needs improvement. Work harder!";
    }

    // Improved API response
    res.status(200).json({
        status: "success",
        message: "Student details processed successfully",
        data: {
            marks: marks,
            grade: grade,
            feedback: feedback
        }
    });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
