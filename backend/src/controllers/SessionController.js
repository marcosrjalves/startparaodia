import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';

import Usuarios from '../models/UsuariosModel';
import authConfig from '../config/auth';

// import bcrypt from 'bcryptjs';
import comparePassword from '../utils/comparePassword';

// const bcrypt = require('bcryptjs');

class SessionController {
  async create(req, res) {
    try {
      const { email, password } = req.body;

      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation Error' });
      }

      const user = await Usuarios.query()
        .select()
        .where('email', email)
        .limit(1);

      if (!user.length) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      if (!(await comparePassword(password, user[0].password_hash))) {
        return res.status(401).json({ error: 'Senha não coincide' });
      }

      const { id, nome } = user[0];

      return res.json({
        user: {
          id,
          nome,
          email,
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (err) {
      const message = 'Internal Server Error';
      console.log(err);
      res.statusCode = err.statusCode;
      return res.json([message, err]);
    }
  }
}

export default new SessionController();
