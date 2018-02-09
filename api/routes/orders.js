const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth =require('../middlewarae/check-auth')

const Order = require("../models/order")
const Product = require('../models/product')
const orderController =  require("../controllers/ordersController")


router.get('/',checkAuth, orderController.getAllOrders)

router.post('/', checkAuth,orderController.createOrders)

router.get('/:orderId',checkAuth, orderController.getOrderById)

router.delete('/:orderId',checkAuth, orderController.deleteOrder)

module.exports = router;