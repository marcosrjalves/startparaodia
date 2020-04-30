import Autores from '../models/AutoresModel';

class FileController {
    async store(req, res) {
        const { originalname, filename } = req.file;
    }
}

export default new FileController();
