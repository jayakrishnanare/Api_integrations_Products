const express = require('express');
const router = express.Router();

router.use('/createProduct', require('./CreateProduct'))
router.use('/getAllProducts', require('./getAllProducts'))
router.use('/getProductById', require('./getProductById'))
router.use('/deleteProductById', require('./deleteProduct'))
router.use('/updateProdcutById', require('./updateproductById'))
module.exports = router ;