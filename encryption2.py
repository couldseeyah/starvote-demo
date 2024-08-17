from phe import paillier
import hashlib
import random
import numpy as np

def get_hash(input):
    hash_object = hashlib.sha256(input.encode('utf-8'))  # Encode the input to bytes
    hash_hex = hash_object.hexdigest()
    return hash_hex

def get_random_number():
    return random.randrange(1, 300)

def encryption_setup():
    public_key, private_key = paillier.generate_paillier_keypair()
    return public_key, private_key

def encrypt_and_hash(input_vector, public_key, encrypted_objects, random_total):
    r = get_random_number()
    random_total[0] *= r
    encrypted_vector = [public_key.encrypt(x, r_value=r) for x in input_vector]
    encrypted_objects.append(encrypted_vector) #store encrypted vector

    #concatenate each element and hash
    concatenated = ''.join([str(x.ciphertext(False)) for x in encrypted_vector])
    hash_hex = get_hash(concatenated)
    return hash_hex

def homomorphic_addition(private_key, encrypted_objects, encrypted_result_store):
    encrypted_total = [sum(x) for x in zip(*encrypted_objects)]
    encrypted_result_store.append(encrypted_total)

    concatenated = ''.join([str(x.ciphertext(False)) for x in encrypted_total])
    encrypted_hash = get_hash(concatenated)
    decrypted_total = [private_key.decrypt(x) for x in encrypted_total]
    decrypted_total_str = ','.join(map(str, decrypted_total))
    return decrypted_total_str, encrypted_hash

def rechecking_tally(public_key, random_total, decrypted_tally_string):

    #reformat tally to numpy array
    decrypted_tally = list(map(int, decrypted_tally_string.split(',')))

    reencrypted_total = [public_key.encrypt(x, r_value=random_total[0]) for x in decrypted_tally]
    concatenated = ''.join([str(x.ciphertext(False)) for x in reencrypted_total])
    reencrypted_hash = get_hash(concatenated)
    return reencrypted_hash
