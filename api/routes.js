import { Router } from "express";
import UsuarioController from "./routes/UsuarioController";
import auth from "./middlewares/auth";
import SessionController from "./routes/SessionController";

const routes = new Router();

routes.put('/sessions', SessionController.create);
routes.use(auth);

routes.get('/usuario', UsuarioController.index);
routes.get('/usuario/:id', UsuarioController.show);
routes.post('/usuario', UsuarioController.create);
routes.put('/usuario/:id', UsuarioController.update);
routes.delete('/usuario/:id', UsuarioController.destroy);

export default routes;