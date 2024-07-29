from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from encryption import encrypt_and_hash, homomorphic_addition, compiler_setup
import zipfile
import io
import json

app = Flask(__name__)
CORS(app, origins=['http://localhost:5173'])

#global variable for encrypted objects
encrypted_objects = []

circuit = compiler_setup()

@app.route('/encrypt', methods=['POST'])
def encrypt():
    data = request.json
    array = data['array']
    hash = encrypt_and_hash(array, circuit, encrypted_objects)
    return jsonify({'hash': hash})

@app.route('/homomorphic_add', methods=['GET'])
def add():
    print("Encrypted objects list inside 'add' route: ", len(encrypted_objects))
    result, encrypted_result = homomorphic_addition(circuit, encrypted_objects)
    # encrypted_objects.clear()
    return jsonify({'result': result, 'encrypted_result': encrypted_result}) 

@app.route('/clear-encrypted-objects', methods=['POST'])
def clear_encrypted_objects():
    encrypted_objects.clear()
    return jsonify({'status': 'success'})

@app.route('/download-zip', methods=['GET'])
def download_zip():
    memory_file = io.BytesIO()

    with zipfile.ZipFile(memory_file, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for i, obj in enumerate(encrypted_objects):
            # Save each serialized bytes object to a separate file in the zip
            zipf.writestr(f'encrypted_object_{i}.bin', obj)

    # Seek to the beginning of the memory file
    memory_file.seek(0)

    # Send the zip file as a response
    response = send_file(memory_file, download_name='encrypted_objects.zip', as_attachment=True)
    return response

if __name__ == '__main__':
    app.run(debug=True)
