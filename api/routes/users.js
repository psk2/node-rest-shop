const express = require('express');
const router = express.Router();

const User = require("../models/user")
const userController = require("../controllers/usersController")
const checkAuth =require('../middlewarae/check-auth')

router.get('/',userController.getAllUsers)

router.post('/signup',userController.signUp )

router.post('/login', userController.login)

router.delete('/:userId', checkAuth, userController.deleteUser)

module.exports = router;