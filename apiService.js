import axios from 'axios';

const API_URL = 'http://localhost:5000';  // flask server

export const encryptArray = async (array) => {
    const response = await axios.post(`${API_URL}/encrypt`, { array });
    return response.data;
};

export const homomorphicAdd = async () => {
    const response = await axios.get(`${API_URL}/homomorphic_add`);
    return response.data.result;
};
