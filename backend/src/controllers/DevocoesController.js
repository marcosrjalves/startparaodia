import Devocoes from '../models/DevocoesModel';
import Autores from '../models/AutoresModel';

class DevocoesController {
  async listAll(req, res) {
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

  async listLastSeven(req, res) {
    try {
      const today = new Date();
      const weekAgo = new Date(today.getTime() - 60 * 60 * 24 * 7 * 1000);

      const devocoes = await Devocoes.query()
        .select()
        .where('dataTexto', '>', weekAgo)
        .andWhere('dataTexto', '<', today)
        .limit(7)
        .orderBy('dataTexto', 'desc')
        .withGraphFetched('autor');
      return res.json(devocoes);
    } catch (err) {
      const message = 'Internal Server Error';
      console.log(err);

      res.statusCode = err.statusCode;
      return res.json([message, err]);
    }
  }
}

export default new DevocoesController();
