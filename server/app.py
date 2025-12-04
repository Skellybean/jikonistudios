from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import sqlite3
import os
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-change-this')
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-key-change-this')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

jwt = JWTManager(app)

CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000", "http://127.0.0.1:3000"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

DATABASE = 'jikonistudios.db'

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initialize the database with tables"""
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS admins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            email TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            message TEXT NOT NULL,
            status TEXT DEFAULT 'new',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    cursor.execute("SELECT * FROM admins WHERE username = ?", ('admin',))
    if not cursor.fetchone():
        password_hash = generate_password_hash('admin123')
        cursor.execute(
            "INSERT INTO admins (username, password_hash, email) VALUES (?, ?, ?)",
            ('admin', password_hash, 'admin@jikonistudios.com')
        )
    
    conn.commit()
    conn.close()

init_db()

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "API is running"}), 200

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({"message": "Username and password required"}), 400
    
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM admins WHERE username = ?", (username,))
    admin = cursor.fetchone()
    conn.close()
    
    if admin and check_password_hash(admin['password_hash'], password):
        access_token = create_access_token(identity=admin['id'])
        return jsonify({
            "token": access_token,
            "admin": {
                "id": admin['id'],
                "username": admin['username'],
                "email": admin['email']
            }
        }), 200
    
    return jsonify({"message": "Invalid credentials"}), 401

@app.route('/api/auth/profile', methods=['GET'])
@jwt_required()
def get_profile():
    admin_id = get_jwt_identity()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, username, email FROM admins WHERE id = ?", (admin_id,))
    admin = cursor.fetchone()
    conn.close()
    
    if admin:
        return jsonify(dict(admin)), 200
    return jsonify({"message": "Admin not found"}), 404

@app.route('/api/messages', methods=['GET'])
@jwt_required()
def get_messages():
    status = request.args.get('status')
    
    conn = get_db()
    cursor = conn.cursor()
    
    query = "SELECT * FROM messages"
    params = []
    
    if status:
        query += " WHERE status = ?"
        params.append(status)
    
    query += " ORDER BY created_at DESC"
    
    cursor.execute(query, params)
    messages = [dict(row) for row in cursor.fetchall()]
    conn.close()
    
    return jsonify({"messages": messages}), 200

@app.route('/api/messages', methods=['POST'])
def create_message():
    data = request.get_json()
    
    if not data.get('name') or not data.get('email') or not data.get('message'):
        return jsonify({"message": "Name, email, and message are required"}), 400
    
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO messages (name, email, phone, message) VALUES (?, ?, ?, ?)",
        (data.get('name'), data.get('email'), data.get('phone', ''), data.get('message'))
    )
    conn.commit()
    conn.close()
    
    return jsonify({"message": "Message sent successfully"}), 201

@app.route('/api/messages/<int:message_id>', methods=['PUT'])
@jwt_required()
def update_message(message_id):
    data = request.get_json()
    status = data.get('status')
    
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("UPDATE messages SET status = ? WHERE id = ?", (status, message_id))
    conn.commit()
    conn.close()
    
    return jsonify({"message": "Message updated"}), 200

@app.route('/api/messages/<int:message_id>', methods=['DELETE'])
@jwt_required()
def delete_message(message_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM messages WHERE id = ?", (message_id,))
    conn.commit()
    conn.close()
    
    return jsonify({"message": "Message deleted"}), 200

@app.route('/api/dashboard/stats', methods=['GET'])
@jwt_required()
def get_dashboard_stats():
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute("SELECT COUNT(*) as total FROM messages")
    total_messages = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) as total FROM messages WHERE status = 'new'")
    new_messages = cursor.fetchone()[0]
  
    cursor.execute("SELECT * FROM messages ORDER BY created_at DESC LIMIT 5")
    recent_messages = [dict(row) for row in cursor.fetchall()]
    
    conn.close()
    
    return jsonify({
        "stats": {
            "total_messages": total_messages,
            "new_messages": new_messages,
        },
    }), 200

@app.route('/api/categories', methods=['GET'])
def get_categories():
    return jsonify({
        "categories": ["Kitchen", "Wardrobe", "Cabinetry", "Custom"]
    }), 200

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5000)