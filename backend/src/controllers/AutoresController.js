import Devocoes from '../models/DevocoesModel';
import Autores from '../models/AutoresModel';

class DevocoesController {
  async list(req, res) {
    try {
      const autor = await Autores.query().select();

      console.log(autor);

      return res.json(autor);
    } catch (err) {
      const message = 'Internal Server Error';
      console.log(err);

      res.statusCode = err.statusCode;
      return res.json([message, err]);
    }
  }

  async create(req, res) {
    try {
      const { nome, dataNasc, biografia } = req.body;

      const data = await Autores.query().insert({
        nome,
        dataNasc,
        biografia,
      });

      return res.json(data);
    } catch (err) {
      const message = 'Internal Server Error';
      console.log(err);

      res.statusCode = err.statusCode;
      return res.json([message, err]);
    }
  }


  // Corrigir a função update. não esta certa.
  async update(req, res) {
    try {
      const { nome, dataNasc, biografia } = req.body;

      const data = await Autores.query().insert({
        nome,
        dataNasc,
        biografia,
      });

      return res.json(data);
    } catch (err) {
      const message = 'Internal Server Error';
      console.log(err);

      res.statusCode = err.statusCode;
      return res.json([message, err]);
    }
  }
}

export default new DevocoesController();
