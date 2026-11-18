
from flask import Flask, jsonify

app = Flask(__name__)

users = [
    {"id": 1, "name": "Rahul", "age": 20, "city": "Bangalore"},
    {"id": 2, "name": "Priya", "age": 21, "city": "Mysore"},
    {"id": 3, "name": "Kiran", "age": 22, "city": "Hyderabad"},
    {"id": 4, "name": "Anjali", "age": 20, "city": "Chennai"},
    {"id": 5, "name": "Rohan", "age": 23, "city": "Mumbai"}
]

# Get all users
@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(users)

# Get user by ID
@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    for user in users:
        if user["id"] == id:
            return jsonify(user)

    return jsonify({"message": "User not found"}), 404

# Run server
if __name__ == '__main__':
    app.run(debug=True)
