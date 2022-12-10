const multer = require('multer');
const path = require('path');

const TMP_DIR = path.resolve('tmp');

const multerConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, TMP_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const uploadMiddleware = multer({ storage: multerConfig });

module.exports = { uploadMiddleware };