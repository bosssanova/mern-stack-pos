const express = require('express');
const router = express.Router();
const moment = require('moment')
const multer = require('multer')
const productController = require('../controllers/product.controller');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public/uploads')
    },
    filename: (req, file, cb) => {
        var filetype = '';
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
        }
        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }
        cb(null, moment(Date.now()).format('DDMMYYYYHHmm') + file.originalname )
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})
router.post('/create', upload.single('imageData'), productController.productCreate);
router.get('/', productController.productDetailsAll);
router.get('/:id', productController.productDetail);
router.put('/:id', upload.single('imageData'), productController.productUpdate);
router.patch('/:id', productController.productPatch);
router.delete('/:id', productController.productDelete);

module.exports = router;