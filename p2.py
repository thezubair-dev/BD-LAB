
from flask import Flask, request, jsonify
import re

app = Flask(__name__)

# Validate email
def is_valid_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None

# Student registration
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    if not data:
        return jsonify({"success": False, "message": "No data provided"}), 400

    name = data.get("name")
    email = data.get("email")

    if not name:
        return jsonify({"success": False, "message": "Name is required"}), 400

    if not email:
        return jsonify({"success": False, "message": "Email is required"}), 400

    if not is_valid_email(email):
        return jsonify({"success": False, "message": "Invalid email format"}), 400

    return jsonify({
        "success": True,
        "message": "Student registered successfully",
        "student": {
            "name": name,
            "email": email
        }
    }), 201

# Run server
if __name__ == '__main__':
    app.run(debug=True)
