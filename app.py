from flask import Flask, request, jsonify
from encryption import encrypt_and_hash, homomorphic_addition, compiler_setup

app = Flask(__name__)

circuit = compiler_setup()

@app.route('/encrypt', methods=['POST'])
def encrypt():
    data = request.json
    array = data['array']
    encrypted_array, hash = encrypt_and_hash(array, circuit)
    return jsonify({'encrypted_array': encrypted_array, 'hash': hash})

@app.route('/homomorphic_add', methods=['POST'])
def add():
    data = request.json
    encrypted_arrays = data['encrypted_arrays']
    result = homomorphic_addition(encrypted_arrays, circuit)
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
