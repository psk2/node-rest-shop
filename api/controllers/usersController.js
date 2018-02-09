const User = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.getAllUsers =  (req, res, next) => {
    User.find()
        // .select('name price _id productImage')
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


exports.login = (req, res, next) => {
    User
        .find({ email: req.body.email })
        .exec()
        .then(user => {
            // console.log('user', user)
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed, user not found",
                    data: user
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, response) => {
                if (err) {
                    return res.status(401).json({
                        data: err
                    })
                }
                if (response) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0].id
                    },
                    "secret",
                    {
                        expiresIn: "1hr"
                    }

                    );
                    return res.status(200).json({
                        message: "Auth Successful",
                        token: token
                    });
                }
                return res.status(401).json({
                    message: "Auth failed",
                    data: response
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

exports.signUp = (req, res, next) => {
    User
        .find({ email: req.body.email })
        .exec()
        .then(result => {
            console.log('result', result)
            if (result.length >= 1) {
                res.status(409).json({
                    message: "email id already exists",
                    // existingUser: result
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log('err', err)
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        })
                        user.save()
                            .then(result => {
                                console.log('result', result)
                                res.status(201).json({
                                    message: "user created successfully",
                                    createduser: result
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
                })
            }
        })
}

exports.deleteUser =  (req, res, next) => {
    const id = req.params.userId
    console.log('id', id)
    User.remove({ _id: id })
        .exec()
        .then(result => {
            console.log('result', result)
            if (result)
                res.status(201).json({
                    message: "user Deleted",
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