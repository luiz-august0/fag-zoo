import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export const createSession = async (usuario, senha) => {
    return api.put('/sessions', { usuario, senha })
};

export const getUsuarios = async() => {
    return api.get('/usuario');
};