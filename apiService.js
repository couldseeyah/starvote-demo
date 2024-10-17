import axios from 'axios';

const API_URL = 'https://qudsia-project.onrender.com';  // flask server

export const encryptArray = async (array) => {
    const response = await axios.post(`${API_URL}/encrypt`, { array });
    return response.data;
};

export const homomorphicAdd = async () => {
    const response = await axios.get(`${API_URL}/homomorphic_add`);
    return response.data;
};

export const downloadZip = async () => {
    const response = await axios.get(`${API_URL}/download-zip`, { responseType: 'blob' });
    return response.data;
};

export const clearEncryptedObjects = async () => {
    const response = await axios.post(`${API_URL}/clear-encrypted-objects`);
    return response.data;
};

export const fetchVerification = async (array) => {
    const response = await axios.post(`${API_URL}/verify`, { array });
    return response.data;
};