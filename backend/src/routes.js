import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';
import multerConfig from './config/multer';

// Controllers
import Devocoes from './controllers/DevocoesController';
import Autores from './controllers/AutoresController';
import Usuarios from './controllers/UsuariosController';
import Sessions from './controllers/SessionController';
import File from './controllers/FileController';
import Read from './controllers/ReadController';

// Middlewares
import AuthMiddleware from './middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Rotas Não Autenticadas
routes.post('/usuarios', Usuarios.create);
routes.post('/sessions', Sessions.create);
routes.get('/autores', Autores.list);

// Autenticação
routes.use(AuthMiddleware);

// Rotas autenticadas
routes.get('/devocao', Devocoes.show);
routes.get('/search', Devocoes.search);
routes.get('/profile', Devocoes.listLastSeven);

routes.post('/autores', Autores.show );

routes.get('/usuarios', Usuarios.listAll);
routes.put('/usuarios', Usuarios.update);

routes.post('/read', Read.read);
routes.get('/read', Read.verify);

routes.post('/files', upload.single('file'), File.store);

export default routes;
