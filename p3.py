
from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)


# Database connection
def get_db_connection():
    conn = sqlite3.connect('students.db')
    conn.row_factory = sqlite3.Row
    return conn


# Create students table
def create_table():
    conn = get_db_connection()

    conn.execute('''
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            course TEXT NOT NULL
        )
    ''')

    conn.commit()
    conn.close()


# CREATE - Insert student
@app.route('/students', methods=['POST'])
def add_student():
    data = request.get_json()

    name = data['name']
    email = data['email']
    course = data['course']

    conn = get_db_connection()

    conn.execute(
        'INSERT INTO students (name, email, course) VALUES (?, ?, ?)',
        (name, email, course)
    )

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Student added successfully"
    }), 201


# READ - Fetch all students
@app.route('/students', methods=['GET'])
def get_students():
    conn = get_db_connection()

    students = conn.execute(
        'SELECT * FROM students'
    ).fetchall()

    conn.close()

    result = []

    for student in students:
        result.append({
            "id": student["id"],
            "name": student["name"],
            "email": student["email"],
            "course": student["course"]
        })

    return jsonify(result)


# READ - Fetch one student
@app.route('/students/<int:id>', methods=['GET'])
def get_student(id):
    conn = get_db_connection()

    student = conn.execute(
        'SELECT * FROM students WHERE id = ?',
        (id,)
    ).fetchone()

    conn.close()

    if student is None:
        return jsonify({
            "message": "Student not found"
        }), 404

    return jsonify({
        "id": student["id"],
        "name": student["name"],
        "email": student["email"],
        "course": student["course"]
    })


# UPDATE - Update student
@app.route('/students/<int:id>', methods=['PUT'])
def update_student(id):
    data = request.get_json()

    name = data['name']
    email = data['email']
    course = data['course']

    conn = get_db_connection()

    cursor = conn.execute(
        'UPDATE students SET name = ?, email = ?, course = ? WHERE id = ?',
        (name, email, course, id)
    )

    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
        return jsonify({
            "message": "Student not found"
        }), 404

    return jsonify({
        "message": "Student updated successfully"
    })


# DELETE - Delete student
@app.route('/students/<int:id>', methods=['DELETE'])
def delete_student(id):
    conn = get_db_connection()

    cursor = conn.execute(
        'DELETE FROM students WHERE id = ?',
        (id,)
    )

    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
        return jsonify({
            "message": "Student not found"
        }), 404

    return jsonify({
        "message": "Student deleted successfully"
    })


# Run Flask application
if __name__ == '__main__':
    create_table()
    app.run(debug=True)
