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
      const { titulo, dataTexto, texto, autor_id } = req.body;

      const data = await Devocoes.query().insert({
        titulo,
        dataTexto,
        texto,
        autor_id,
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
