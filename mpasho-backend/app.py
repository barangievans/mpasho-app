import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
from flask_cors import CORS
from models import db, Article, Category

# Initialize the Flask application
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mpasho.db'  # Replace with your preferred DB URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'uploads'  # Folder where the uploaded audio files will be stored
app.config['ALLOWED_EXTENSIONS'] = {'mp3', 'wav'}  # Allowed file types for audio

# Initialize the database
db.init_app(app)

# Function to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

# Endpoint to upload articles (with optional audio files)
@app.route('/api/upload', methods=['POST'])
def upload_article():
    title = request.form['title']
    content = request.form['content']
    audio_file = request.files.get('audio')

    # Handle the audio file upload
    audio_url = None
    if audio_file and allowed_file(audio_file.filename):
        filename = secure_filename(audio_file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)

        # Save the file to the server
        audio_file.save(filepath)

        # Create a URL for the audio file
        audio_url = f'/uploads/{filename}'  # The URL to access the audio file

    # Create a new article and add it to the database
    new_article = Article(title=title, content=content, audio_url=audio_url)
    db.session.add(new_article)
    db.session.commit()

    return jsonify({'message': 'Article uploaded successfully!'}), 201

# Endpoint for dynamic categories (this is the missing part)
@app.route('/api/categories')
def get_categories():
    # Example categories list (this could be dynamic if you are storing categories in a database)
    categories = ['News', 'Politics', 'Nationalism and African States', 'Sports', 'Entertainment', 'Technology']
    
    # Return the categories as a JSON response
    return jsonify(categories)

if __name__ == '__main__':
    app.run(debug=True)
