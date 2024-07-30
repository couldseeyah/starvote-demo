from concrete import fhe
import numpy as np
import base64
import hashlib

def add_elementwise(array1, array2):
    return np.add(array1, array2)

def compiler_setup():
    # Define the input set for compilation (example vectors)
    inputset = [
        (np.array([-1, 0, 0]), np.array([0, 1, 0])),
        (np.array([-1, 0, 0]), np.array([0, 0, 0])),
        (np.array([0, -2, -3]), np.array([1, 2, 0])),
        (np.array([1, -2, 3]), np.array([3, -2, 1])),
    ]

    # Create the compiler with the element-wise addition function
    compiler = fhe.Compiler(add_elementwise, {"array1": "encrypted", "array2": "encrypted"})
    circuit = compiler.compile(inputset)
    circuit.keygen()
    return circuit

def encrypt_and_hash(input_array, circuit, encrypted_objects):

    encrypted_array = circuit.encrypt(np.array(input_array), np.array([0, 0, 0]))
    
    # Serialize the encrypted data
    serialized_data = encrypted_array[0].serialize()

    encrypted_objects.append(serialized_data)

    # Generate a hash of the serialized data
    hash_object = hashlib.sha256(serialized_data)
    hash_hex = hash_object.hexdigest()
    return hash_hex

def get_hash(input):
    hash_object = hashlib.sha256(input)
    hash_hex = hash_object.hexdigest()
    return hash_hex

#performs homomorphic addition and returns decrypted result + hash of serialized encrypted result
def homomorphic_addition(circuit, encrypted_objects, encrypted_result_store):

    ciphertext = [fhe.Value.deserialize(obj) for obj in encrypted_objects]

    #take the first two arrays and add them. loop until all arrays are added
    for i in range(len(ciphertext) - 1):
        encrypted_result = circuit.run(ciphertext[i], ciphertext[i + 1])
        ciphertext[i + 1] = encrypted_result

    #Result
    encrypted_result = ciphertext[-1].serialize()
    encrypted_result_store = encrypted_result_store.append(encrypted_result)

    encrypted_result = get_hash(encrypted_result)[:16] 
    decrypted_result = circuit.decrypt(ciphertext[-1])
    resultList = decrypted_result.tolist()
    resultString = ' '.join([str(elem) for elem in resultList])
    print("Encrypted result: ", encrypted_result, "\nDecrypted Result: ", resultString)
    return resultString, encrypted_result


# encrypted objects, circuit, and encrypted tally are in app.py. take the reencryption and subtract w og tally. return HASH
# from front end take: TALLY
# from app.py take: encrypted tally obejct, circuit
# return to front end: hash of reencrypted tally + subtraction of tallys 


def verification(circuit, encrypted_tally, tally_string):

    #reformat tally to numpy array
    tally_list = tally_string.split()
    tally_list = [int(num) for num in tally_list]
    tally = np.array(tally_list)

    #reencryption
    v = np.negative(tally)
    reencypted_tally = circuit.encrypt(v, np.array([0, 0, 0]))

    #for returning to front end
    serialized_data = reencypted_tally[0].serialize()
    hash_object = hashlib.sha256(serialized_data)
    hash_hex = hash_object.hexdigest()

    #subtracting tallys
    ciphertext = fhe.Value.deserialize(encrypted_tally[-1])
    encrypted_diff = circuit.run(ciphertext, reencypted_tally[0])
    diff = circuit.decrypt(encrypted_diff)
    diffList = diff.tolist()
    diffString = ' '.join([str(elem) for elem in diffList])

    return hash_hex, diffString

# #performs homomorphic addition and returns result
# def homomorphic_addition(circuit, encrypted_objects):

#     ciphertext = [fhe.Value.deserialize(obj) for obj in encrypted_objects]

#     #take the first two arrays and add them. loop until all arrays are added
#     for i in range(len(ciphertext) - 1):
#         encrypted_result = circuit.run(ciphertext[i], ciphertext[i + 1])
#         ciphertext[i + 1] = encrypted_result

#     print("After addition: ", ciphertext)
#     # Decrypt the result
#     result = circuit.decrypt(ciphertext[-1])
#     print("Result of homomorphic addition: ", result)
#     resultList = result.tolist()
#     resultString = ' '.join([str(elem) for elem in resultList])
#     return resultString
