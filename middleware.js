const jwt = require("jsonwebtoken");
const config = require('./config/config_secret');


// Authorization: Bearer <token>
exports.authorized = (req, res, next) => {
    let authHeader = req.headers['authorization'];

    if (!authHeader) return next(new Error('Require authorization header'));
    let token = authHeader.split('Bearer ')[1];

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({
                auth: false,
                message: 'Fail to Authentication. Error -> ' + err
            });
        }

        // attach / set new field to request object
        // you could access this field in the next request handler
        req.userId = decoded.id
        next();
    });
}