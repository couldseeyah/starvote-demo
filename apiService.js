import axios from 'axios';

const API_URL = 'http://localhost:5173';  // Adjust based on your Flask server's address

export const encryptArray = async (array) => {
    const response = await axios.post(`${API_URL}/encrypt`, { array });
    return response.data;
};

export const homomorphicAdd = async (encryptedArrays) => {
    const response = await axios.post(`${API_URL}/homomorphic_add`, { 
        encrypted_arrays: encryptedArrays 
    });
    return response.data.result;
};
