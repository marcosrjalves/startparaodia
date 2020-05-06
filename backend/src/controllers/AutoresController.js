import * as Yup from 'yup';
import Devocoes from '../models/DevocoesModel';
import Autores from '../models/AutoresModel';

class DevocoesController {
  async list(req, res) {
    try {      
      const autores = await Autores.query().select();
      return res.json(autores);
    } catch (err) {
      const message = 'Internal Server Error';
      console.log(err);
      res.statusCode = err.statusCode;
      return res.json([message, err]);
    }
  }


  async show(req, res) {
    try {
      const schema = Yup.object().shape({
        id_autor: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation Error' });
      }

      const { id_autor } = req.body;
      const autor = await Autores.query().findById(id_autor);

      if(autor) {
        return res.json(autor);
      } else {
        return res.json('autor not found');
      }


      
    } catch (err) {
      const message = 'Internal Server Error';
      console.log(err);

      res.statusCode = err.statusCode;
      return res.json([message, err]);
    }
  }

  // COMENTADO. POIS A CRIAÇÃO DE AUTORES FICARÁ EM FRONTEND ESPECÍFICO.
  // async create(req, res) {
  //   try {
  //     const { nome, dataNasc, biografia } = req.body;

  //     const data = await Autores.query().insert({
  //       nome,
  //       dataNasc,
  //       biografia,
  //     });

  //     return res.json(data);
  //   } catch (err) {
  //     const message = 'Internal Server Error';
  //     console.log(err);

  //     res.statusCode = err.statusCode;
  //     return res.json([message, err]);
  //   }
  // }


  // COMENTADO. POIS A ATUALIZAÇÃO DE AUTORES FICARÁ EM FRONTEND ESPECÍFICO.
  // async update(req, res) {
  //   try {
  //     const { nome, dataNasc, biografia } = req.body;

  //     const data = await Autores.query().insert({
  //       nome,
  //       dataNasc,
  //       biografia,
  //     });

  //     return res.json(data);
  //   } catch (err) {
  //     const message = 'Internal Server Error';
  //     console.log(err);

  //     res.statusCode = err.statusCode;
  //     return res.json([message, err]);
  //   }
  // }
}

export default new DevocoesController();
