import multer from 'multer';
import path from 'path';

import { __dirname } from '../dirname.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.split('/')[0] !== 'image') {
      return cb('El archivo no es una imagen', null);
    }

    cb(null, path.resolve(__dirname, '../public/img'));
  },
  filename: function (req, file, cb) {
    const pid = req.body.pid;
    if (!pid) {
      return cb('Falta el id del producto', null);
    }

    cb(null, `${pid}-I1.${file.split('/')[1]}`);
  }
})

export const upload = multer({ storage: storage });