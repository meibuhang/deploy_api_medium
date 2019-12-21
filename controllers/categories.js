const Categories = require('../models').Category;

exports.addCateggories = (req, res) => {
    console.log("Processing func ->Categories");
    const name = req.body.name;
    const is_published = req.body.is_published;

    const datas = {
        name: name,
        is_published: is_published
    }
    Categories.create(datas).then(data => {
        res.status(200).send({
            "item": data,
            "message": "Categories success created",
            "status": "OK"
        });
    }).catch(err => {
        res.status(500).json({
            "message": "Error"
        })
    })
}

//get All Categories
exports.allCategories = (req, res) => {
    console.log("find All data");
    Categories.findAll().then(data => {
        res.status(200).send({
            "item": data,
            "message": "success",
            "status": "OK"
        });
    }).catch(err => {
        res.status(500).json({
            "message": err
        })
    })
}