import * as Yup from 'yup';

import Devocoes from '../models/DevocoesModel';
import Autores from '../models/AutoresModel';

class DevocoesController {
  async list(req, res) {
    try {
      const devocoes = await Devocoes.query().select().eager('autor');

      return res.json(devocoes);
    } catch (err) {
      const message = 'Internal Server Error';
      console.log(err);

      res.statusCode = err.statusCode;
      return res.json([message, err]);
    }
  }

  // COMENTADO, POIS A CRIAÇÃO DE DEVOCIONAIS SE DARÁ ATRAVÉS DE FRONTEND PRÓPRIO
  // async create(req, res) {
  //   try {
  //     const { titulo, dataTexto, texto, autor_id } = req.body;

  //     const data = await Devocoes.query().insert({
  //       titulo,
  //       dataTexto,
  //       texto,
  //       autor_id,
  //     });

  //     return res.json(data);
  //   } catch (err) {
  //     const message = 'Internal Server Error';
  //     console.log(err);

  //     res.statusCode = err.statusCode;
  //     return res.json([message, err]);
  //   }
  // }

  async listLastSeven(req, res) {
    try {
      const today = new Date();
      const weekAgo = new Date(today.getTime() - 60 * 60 * 24 * 7 * 1000);

      const { page = 1 } = req.query;
      const offset = (page - 1) * 7;


      const devocoes = await Devocoes.query()
        .select()
        .where('data_texto', '<', today)
        // .andWhere('data_texto', '>', weekAgo)
        .limit(7)
        .offset(offset)
        .orderBy('data_texto', 'desc')
        .withGraphFetched('autor');
      return res.json(devocoes);
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
        devocao_id: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation Error' });
      }

      const { devocao_id } = req.body;

      const devocao = await Devocoes.query()
                                    .findById(devocao_id)
                                    .withGraphFetched('autor');;

      if(devocao) {
        return res.json(devocao);
      } else {
        return res.json('Devoção não encontrada');
      }

      
    } catch (err) {
      const message = 'Internal Server Error';
      console.log(err);

      res.statusCode = err.statusCode;
      return res.json([message, err]);
    }
  }


  async search(req, res) {
    try {
      
      const schema = Yup.object().shape({
        data_texto: Yup.date().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation Error' });
      }

      const { data_texto } = req.body;

      const devocao = await Devocoes.query()
                                    .select()
                                    .where('data_texto', '=', data_texto)

      if(devocao) {
        return res.json(devocao);
      } else {
        return res.json('Devoção não encontrada');
      }

      
    } catch (err) {
      const message = 'Internal Server Error';
      console.log(err);

      res.statusCode = err.statusCode;
      return res.json([message, err]);
    }
  }

}

export default new DevocoesController();
