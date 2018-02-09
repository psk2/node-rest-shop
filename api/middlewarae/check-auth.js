const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if(token){
            const decoded = jwt.verify(token, "secret");
            req.userData = decoded;
            next();
        }   
        else {
            return res.status(401).json({
                message: "No token found"
            });
        }

    } catch (error) {
        return res.status(401).json({
            message: "Auth failed",
            error: error
        });
    }
};