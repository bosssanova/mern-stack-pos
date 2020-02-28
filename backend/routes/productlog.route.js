const express = require('express');
const router = express.Router();

const productLogController = require('../controllers/productlog.controller')

router.post('/create', productLogController.productLogCreate)
router.get('/', productLogController.productDetailsAll);
router.get('/:id', productLogController.productDetail);


module.exports = router