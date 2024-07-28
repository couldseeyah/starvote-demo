from flask import Flask, request, jsonify
from flask_cors import CORS
from encryption import encrypt_and_hash, homomorphic_addition, compiler_setup

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
    result = homomorphic_addition(circuit, encrypted_objects)
    encrypted_objects.clear()
    return jsonify({'result': result}) 

if __name__ == '__main__':
    app.run(debug=True)
