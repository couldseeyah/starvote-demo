from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
# from encryption import encrypt_and_hash, homomorphic_addition, compiler_setup, verification
from encryption2 import encryption_setup, encrypt_and_hash, homomorphic_addition, rechecking_tally
import zipfile
import io
import json

app = Flask(__name__)
CORS(app, origins=['http://localhost:5173'])

#global variable for encrypted objects
encrypted_objects = []
encrypted_result_store = []
random_total = [1]

public_key, private_key = encryption_setup()

@app.route('/encrypt', methods=['POST'])
def encrypt():
    data = request.json
    array = data['array']
    hash = encrypt_and_hash(array, public_key, encrypted_objects, random_total)
    return jsonify({'hash': hash})

@app.route('/homomorphic_add', methods=['GET'])
def add():
    result, encrypted_result = homomorphic_addition(private_key, encrypted_objects, encrypted_result_store)
    return jsonify({'result': result, 'encrypted_result': encrypted_result, 'random': str(random_total[0])}) 

@app.route('/clear-encrypted-objects', methods=['POST'])
def clear_encrypted_objects():
    encrypted_objects.clear()
    encrypted_result_store.clear()
    random_total[0] = 1
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

    response = send_file(memory_file, download_name='encrypted_objects.zip', as_attachment=True)
    return response


@app.route('/verify', methods=['POST'])
def verify():
    data = request.json
    array = data['array']
    reencryption = rechecking_tally(public_key, random_total, array)
    return jsonify({'reresult': reencryption})

if __name__ == '__main__':
    app.run(debug=True)
