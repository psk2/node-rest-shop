const Product = require('../models/product')

exports.getAllProducts = (req, res, next) => {
    Product.find()
        .select('name price _id productImage')
        .exec()
        .then(result => {
            response = {
                count: result.length,
                data : result
            }
            res.status(201).json(response);
        })
        .catch(error => {
            console.log('error', error)
            res.status(500).json({
                message: "something went wrong",
                error: error
            });
        })
}

exports.getProductById =  (req, res, next) => {
    const id = req.params.productId
    Product.findById(id)
        .exec()
        .then(result => {
            console.log('result', result)
            if (result)
                res.status(201).json({
                    message: "you discovered the special ID",
                    data: result
                }); else {
                res.status(404).json({
                    message: "No data found for the given ID"
                })
            }
        })
        .catch(error => {
            console.log('error', error)
            res.status(500).json({
                message: "something went wrong",
                error: error
            });
        })

}

exports.createProduct = (req, res, next) => {
    console.log(req.file)
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product.save()
        // .exec()
        .then(result => {
            console.log('result', result)
            res.status(201).json({
                message: "Handling POST request to products",
                createdProduct: product
            });
        })
        .catch(error => {
            console.log('error', error)
            res.status(500).json({
                message: "something went wrong",
                error: error
            });
        })

}

exports.updateProduct =  (req, res, next) => {
    console.log('req', req.body)
    const id = req.params.productId
    const updateObj = {};
    for (let ops of req.body) {
        updateObj[ops.key] = ops.value
    }
    console.log('updateObj', updateObj)
    
    Product.update(
        {
            _id: id
        },
        {
            $set: updateObj
        }

    )
        .exec()
        .then(result => {
            console.log('result', result)
            res.status(201).json({
                message: "Handling POST request to products",
                createdProduct: result
            });
        })
        .catch(error => {
            console.log('error', error)
            res.status(500).json({
                message: "something went wrong",
                error: error
            });
        })
}

exports.deleteProduct = (req, res, next) => {
    const id = req.params.productId
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            console.log('result', result)
            if (result)
                res.status(201).json({
                    message: "success",
                    data: result
                }); else {
                res.status(404).json({
                    message: "No data found for the given ID"
                })
            }
        })
        .catch(error => {
            console.log('error', error)
            res.status(500).json({
                message: "something went wrong",
                error: error
            });
        })
}