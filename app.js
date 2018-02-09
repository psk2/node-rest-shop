const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParaser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')
const uploads = multer({dest:'uploads/'});


const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');

mongoose.connect('mongodb://localhost:27017/rest-shop');
app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParaser.urlencoded({ extended: false }));
app.use(bodyParaser.json());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin','*');
//     res.header('Access-Control-Allow-Headers','*');
//     if(req.method === "OPTIONS"){
//         res.header('Access-Control-Allow-Methods','PUT','POST','PATCH','DELETE','GET')
//         res.status(200).json({})
//     }
// })

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/user', userRoutes)

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})


// app.use((req,res,next) => {
//     res.status(200).json({
//         message: "It works"
//     });
// });

module.exports = app;
