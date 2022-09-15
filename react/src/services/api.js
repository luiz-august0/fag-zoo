import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:5000'
});

//Rota de sessão
export const createSession = async (usuario, senha) => {
    return api.put('/sessions', { usuario, senha });
};
/**************************************************************/

//Rota de usuários
export const getUsuarios = async () => { 
    return api.get('/usuario');
};

export const createUsuario = async (usuario, senha, setor) => {
    return api.post('/usuario', { usuario, senha, setor});
};

export const updateUsuario = async (usuario, senha, setor, usuarioID) => {
    return api.put(`/usuario/${usuarioID}`, { usuario, senha, setor });
};

export const deleteUsuario = async (usuarioID) => {
    return api.delete(`/usuario/${usuarioID}`);
};

export const getSetores = async () => {
    return api.get('/setor');
};
/**************************************************************/

//Rota de animais
export const getAnimais = async () => {
    return api.get('/animal');
};

export const createAnimal = async (ani_nome, ani_nomecient, ani_apelido, ani_identificacao, ani_sexo, ani_origem) => {
    return api.post('/animal', { ani_nome, ani_nomecient, ani_apelido, ani_identificacao, ani_sexo, ani_origem });
};

export const updateAnimal = async (ani_nome, ani_nomecient, ani_apelido, ani_identificacao, ani_sexo, ani_origem, animalID) => {
    return api.put(`/animal/${animalID}`, { ani_nome, ani_nomecient, ani_apelido, ani_identificacao, ani_sexo, ani_origem, animalID });
};

export const deleteAnimal = async (animalID) => {
    return api.delete(`/animal/${animalID}`);
};

export const showAnimal = async (animalID) => {
    return api.get(`/animal/${animalID}`);
};
/**************************************************************/

//Rotas de nutricao
export const createNutricao = async (ani_codigo, ntr_dia, ntr_hora, ntr_alimento, ntr_unmed, ntr_qtd, ntr_obs) => {
    return api.post('/nutricao', { ani_codigo, ntr_dia, ntr_hora, ntr_alimento, ntr_unmed, ntr_qtd, ntr_obs });
};

export const updateNutricao = async (nutricaoID, ntr_dia, ntr_hora, ntr_alimento, ntr_unmed, ntr_qtd, ntr_obs) => {
    return api.put(`/nutricao/${nutricaoID}`, { ntr_dia, ntr_hora, ntr_alimento, ntr_unmed, ntr_qtd, ntr_obs});
};

export const deleteNutricao = async (nutricaoID) => {
    return api.delete(`/nutricao/${nutricaoID}`);
};

export const showNutricao = async (animalID) => {
    return api.get(`/nutricao/${animalID}`);
};
/**************************************************************/