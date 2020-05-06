// const bcrypt = require('bcryptjs');
import * as Yup from 'yup';
import Usuarios from '../models/UsuariosModel';
import UsuariosDevocoes from '../models/UsuariosDevocoesModel';

class ReadController {
  async read(req, res) {
    try {
      const schema = Yup.object().shape({
        devocao_id: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation Error' });
      }

      const { devocao_id } = req.body;
      const usuario_id = req.userId;

      const usuario = await Usuarios.query().findById(req.userId);

      if(usuario) {
        const data = await UsuariosDevocoes.query().insert({
          usuario_id,
          devocao_id,
        });

        if(!data) {
          res.statusCode = err.statusCode;
          return res.json([message, err]);
        }

        return res.json(data);
      } else {
        res.statusCode = err.statusCode;
        return res.json([message, err]);
      }

    } catch (err) {
      const message = 'Internal Server Error';
      console.log(err);
      res.statusCode = err.statusCode;
      return res.json([message, err]);
    }
  }


  async verify(req, res) {
    try {
      const schema = Yup.object().shape({
        devocao_id: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation Error' });
      }

      const { devocao_id } = req.body;
      const usuario_id = req.userId;

      const usuario = await Usuarios.query().findById(req.userId);

      if(usuario) {
        const data = await UsuariosDevocoes.query()
        .select()
        .where('devocao_id', devocao_id)
        .where('usuario_id', usuario_id);

        if(data.length === 0) {
          return res.json(["false"]);
        }

        return res.json(["true"]);
      } else {
        res.statusCode = err.statusCode;
        return res.json([message, err]);
      }

    } catch (err) {
      const message = 'Internal Server Error';
      console.log(err);
      res.statusCode = err.statusCode;
      return res.json([message, err]);
    }
  }
}

export default new ReadController();
