import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

// Controllers
import Devocoes from './controllers/DevocoesController';
import Autores from './controllers/AutoresController';
import Usuarios from './controllers/UsuariosController';
import Sessions from './controllers/SessionController';

// Middlewares
import AuthMiddleware from './middlewares/auth';

const routes = new Router();

// Rotas Não Autenticadas
routes.post('/usuarios', Usuarios.create);
routes.post('/sessions', Sessions.create);
routes.get('/autores', Autores.list);

// Rotas Autenticadas
routes.use(AuthMiddleware);

routes.get('/devocao', Devocoes.listAll);
routes.post('/devocao', Devocoes.create);
routes.get('/profile', Devocoes.listLastSeven);

routes.get('/usuarios', Usuarios.listAll);
routes.put('/usuarios', Usuarios.update);

export default routes;
