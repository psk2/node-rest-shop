const express = require('express');
const router = express.Router();
const Product = require('../models/product')
const mongoose = require('mongoose');
const multer = require('multer')
const checkAuth =require('../middlewarae/check-auth')
const productController = require('../controllers/productsController')
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./uploads')
    },
    filename: (req,file,cb) => {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const uploads = multer({storage:storage, limits:{
    fileSize: 1024 * 1024 *5
}});


router.get('/',checkAuth, productController.getAllProducts)

router.post('/',checkAuth, uploads.single('productImage') , productController.createProduct)

router.get('/:productId',checkAuth,productController.getProductById)

router.patch('/:productId',checkAuth,productController.updateProduct)

router.delete('/:productId',checkAuth,productController.deleteProduct )


module.exports = router;