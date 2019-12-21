const Users = require('../models').User;
const bycrypt = require('bcrypt-nodejs');
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const config = require('../config/config_secret.js');

exports.signup = (req, res) => {
    console.log("Processing func ->Register");
    const dataEmail = req.body.email;
    const salt = bycrypt.genSaltSync(10);
    Users.create({
        fullname: req.body.fullname,
        username: req.body.username,
        email: dataEmail,
        password: bycrypt.hashSync(req.body.password, salt),
        is_active: req.body.is_active
    }).then(data => {
        const token = jwt.sign({
            id: data.id
        }, config.secret);
        res.status(200).send({
            "email": data.email,
            token,
            "message": "User registered successfully!"
        });
    }).catch(err => {
        res.status(500).json({
            "message": "Error"
        })
    });
}


//Sign In
exports.signIn = (req, res) => {
    Users.findOne({
        where: {
            username: req.body.username
        }
    }).then(data => {
        if (data) {
            const auths = bycrypt.compareSync(req.body.password, data.password);
            if (auths) {
                const token = jwt.sign({
                    id: data.id
                }, config.secret);

                res.status(200).send({
                    "email": data.email,
                    token,
                    "message": "User Success Login!"

                });
            } else {
                res.status(400).send({
                    "message": "Bad Request"
                });
            }
        }
    })
}