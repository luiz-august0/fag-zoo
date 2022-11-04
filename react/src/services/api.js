import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:5000'
});

//Configuração para mandar requisição com imagens
const config = {
    'Content-Type': 'multipart/form-data',
}

//Rota de sessão
export const createSession = async (usuario, senha) => {
    return api.put('/sessions', { usuario, senha });
};
/**************************************************************/

//Rota de usuários
export const getUsuarios = async () => { 
    return api.get('/usuario');
};

export const getUsuario = async (usuarioID) => { 
    return api.get(`/usuario/${usuarioID}`);
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

export const createAnimal = async (ani_nome, ani_nomecient, ani_apelido, ani_identificacao, ani_sexo, ani_origem, dataAdm, dataExp) => {
    return api.post('/animal', { ani_nome, ani_nomecient, ani_apelido, ani_identificacao, ani_sexo, ani_origem, dataAdm, dataExp });
};

export const updateAnimal = async (ani_nome, ani_nomecient, ani_apelido, ani_identificacao, ani_sexo, ani_origem, dataAdm, dataExp, animalID) => {
    return api.put(`/animal/${animalID}`, { ani_nome, ani_nomecient, ani_apelido, ani_identificacao, ani_sexo, ani_origem, dataAdm, dataExp, animalID });
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

export const copyNutricao = async (id_origem, id_destino) => {
    return api.post(`/nutricaoCopy/${id_destino}`, { id_origem });
};

export const deleteNutricao = async (nutricaoID) => {
    return api.delete(`/nutricao/${nutricaoID}`);
};

export const showNutricao = async (animalID) => {
    return api.get(`/nutricao/${animalID}`);
};

//Rotas de histórico etológico
export const createEtologico = async (codigoAni, comp, outrComp, obs, dataHist, hora, resp) => {
    return api.post('/etologico', { codigoAni, comp, outrComp, obs, dataHist, hora, resp });
};

export const updateEtologico = async (etologicoID, comp, outrComp, obs, dataHist, hora, resp) => {
    return api.put(`/etologico/${etologicoID}`, { comp, outrComp, obs, dataHist, hora, resp});
};

export const deleteEtologico = async (etologicoID) => {
    return api.delete(`/etologico/${etologicoID}`);
};

export const showEtologico = async (animalID) => {
    return api.get(`/etologico/${animalID}`);
};

//Rotas de atividade
export const createAtividade = async (codigoAni, descricao, dataAtt, hora, resp, interacao) => {
    return api.post('/atividade', { codigoAni, descricao, dataAtt, hora, resp, interacao });
};

export const updateAtividade = async (atividadeID, descricao, dataAtt, hora, resp, interacao) => {
    return api.put(`/atividade/${atividadeID}`, { descricao, dataAtt, hora, resp, interacao });
};

export const deleteAtividade = async (atividadeID) => {
    return api.delete(`/atividade/${atividadeID}`);
};

export const showAtividade = async (animalID) => {
    return api.get(`/atividade/${animalID}`);
};

export const createImagemAtt = async(atividadeID, file) => {
    return api.post(`/atividade_img/${atividadeID}`, { file }, config);
};
/**************************************************************/