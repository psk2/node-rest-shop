const Order = require("../models/order");

exports.getAllOrders = (req, res, next) => {
    Order
        .find()
        .select('product quantity _id')
        .populate('product', 'name')
        .exec()
        .then(result => {
            response = {
                count: result.length,
                data: result
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

exports.createOrders = (req, res, next) => {
    Product
        .findById(req.body.productId)
        .exec()
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "product not found"
                })
            }
            var order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            })
            order.save()
                .then(result => {
                    console.log('result', result)
                    res.status(201).json({
                        message: "Handling POST request to orders",
                        orderDetails: order
                    });
                })
        })
        .catch(error => {
            console.log('error', error)
            res.status(500).json({
                message: "something went wrong",
                error: error
            });
        })

}

exports.getOrderById = (req, res, next) => {
    const id = req.params.orderId
    Order.findById(id)
        .exec()
        .then(order => {
            console.log('order', order)
            // if(!order){
            return res.status(200).json({
                message: "order  found",
                data: order
            })
            // }
        })
        .catch(error => {
            console.log('error', error)
            res.status(500).json({
                message: "something went wrong",
                error: error
            });
        })
}

exports.deleteOrder = (req, res, next) => {
    const id = req.params.orderId
    Order.remove({ _id: id })
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