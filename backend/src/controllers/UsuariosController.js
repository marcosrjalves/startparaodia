// const bcrypt = require('bcryptjs');
import Yup from 'yup';
import Usuarios from '../models/UsuariosModel';

import comparePassword from '../utils/comparePassword';
import passwordHasher from '../utils/passwordHasher';

class UsuariosController {
  async listAll(req, res) {
    try {
      const usuarios = await Usuarios.query()
        .select()
        .withGraphFetched('devocoes');

      return res.json(usuarios);
    } catch (err) {
      const message = 'Internal Server Error';
      console.log(err);
      res.statusCode = err.statusCode;
      return res.json([message, err]);
    }
  }

  async create(req, res) {
    try {
      const schema = Yup.object().shape({
        nome: Yup.string().required(),
        dataNasc: Yup.date(),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(6),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation Error' });
      }

      const { nome, dataNasc, email, password, autor } = req.body;

      const password_hash = passwordHasher(password);

      const verif = await Usuarios.query().select().where('email', email);

      if (verif.length) {
        const message = { error: 'Email já esta sendo utilizado' };
        res.statusCode = 418;
        return res.json(message);
      }

      const data = await Usuarios.query().insert({
        nome,
        dataNasc,
        email,
        autor,
      });

      return res.json(data);
    } catch (err) {
      const message = 'Internal Server Error';
      console.log(err);
      res.statusCode = err.statusCode;
      return res.json([message, err]);
    }
  }

  async update(req, res) {
    const { email, oldPassword, password } = req.body;
    const { body } = req;

    const schema = Yup.object().shape({
      nome: Yup.string(),
      dataNasc: Yup.date(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Error' });
    }

    const user = await Usuarios.query().findById(req.userId);

    if (email !== user.email) {
      const verif = await Usuarios.query().select().where('email', email);

      if (verif.length) {
        const message = { error: 'Email já esta sendo utilizado' };
        res.statusCode = 418;
        return res.json(message);
      }
    }

    if (
      oldPassword &&
      !(await comparePassword(oldPassword, user.password_hash))
    ) {
      return res.status(401).json({ error: 'Senha não coincide' });
    }

    if (oldPassword !== password) {
      if (password) {
        body.password_hash = await passwordHasher(password);
      }
    }

    delete body.oldPassword;
    delete body.password;

    const { id, nome, autor } = await Usuarios.query().patchAndFetchById(
      req.userId,
      body
    );

    return res.json({
      nome,
      dataNasc,
      email,
      autor,
    });
  }
}

export default new UsuariosController();
