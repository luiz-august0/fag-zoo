import { Router, static as Static } from "express";
import UsuarioController from "./routes/UsuarioController";
import auth from "./middlewares/auth";
import SessionController from "./routes/SessionController";
import AnimalController from "./routes/AnimalController";
import NutricaoController from "./routes/NutricaoController";
import EtologicoController from "./routes/EtologicoController";
import AtividadeController from "./routes/AtividadeController";
import InternacaoController from "./routes/InternacaoController";
import multer from "multer";
import { storage } from './uploadImageAtt';
const upload = multer({ storage: storage });

const routes = new Router();

routes.use('/image_uploads', Static("image_uploads"));
routes.put('/sessions', SessionController.create);
routes.use(auth);

//Rotas usuário
routes.post('/usuario', UsuarioController.create);
routes.get('/usuario', UsuarioController.index);
routes.get('/usuario/:id', UsuarioController.show);
routes.put('/usuario/:id', UsuarioController.update);
routes.delete('/usuario/:id', UsuarioController.destroy);
routes.get('/setor', UsuarioController.indexSetor);

//Rotas animal
routes.post('/animal', AnimalController.create);
routes.get('/animal', AnimalController.index);
routes.get('/animal/:id', AnimalController.show);
routes.put('/animal/:id', AnimalController.update);
routes.delete('/animal/:id', AnimalController.destroy);

//Rotas nutricao
routes.get('/nutricao/:id', NutricaoController.show);
routes.post('/nutricao', NutricaoController.create);
routes.post('/nutricaoCopy/:id', NutricaoController.copy);
routes.put('/nutricao/:id', NutricaoController.update);
routes.delete('/nutricao/:id', NutricaoController.destroy);

//Rotas Histórico Etologico
routes.get('/etologico/:id', EtologicoController.show);
routes.post('/etologico', EtologicoController.create);
routes.put('/etologico/:id', EtologicoController.update);
routes.delete('/etologico/:id', EtologicoController.destroy);

//Rotas Atividades
routes.get('/atividade/:id', AtividadeController.show);
routes.post('/atividade', AtividadeController.create);
routes.put('/atividade/:id', AtividadeController.update);
routes.delete('/atividade/:id', AtividadeController.destroy);
routes.post('/atividade_img/:id', upload.single("file"), (req, res) => {
	return res.json(req.file.filename);
});
routes.get('/atividade_img/:id', AtividadeController.showImagens);
routes.post('/atividade_img_delete/:id', AtividadeController.deleteImageAtt);

//Rotas Internação
routes.get('/internacao_historico/:id', InternacaoController.index);
routes.get('/internacao/:id', InternacaoController.show);
routes.post('/internacao', InternacaoController.create);
routes.put('/internacao/:id', InternacaoController.update);
routes.delete('/internacao/:id', InternacaoController.destroy);

export default routes;