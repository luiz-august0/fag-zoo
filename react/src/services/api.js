import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export const createSession = async (usuario, senha) => {
    return api.put('/sessions', { usuario, senha })
};

export const getUsuarios = async (query) => {
    let url = `/usuario`;

    if (query !== '') {
        url = url + `/${query}`
    }

    return api.get(url);
};