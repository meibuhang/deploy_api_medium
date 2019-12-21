const tb_article = require("../models").Article;
const tb_cat = require("../models").Category;
const tb_user = require("../models").User;

//all articles
exports.allArticles = (req, res) => {
    console.log("Processing func -> Add Category");
    tb_article
        .findAll({
            attributes: {
                exclude: ["category_id", "is_published", "slug", "user_id"]
            },
            include: [{
                    model: tb_cat,
                    as: "categories",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                },
                {
                    model: tb_user,
                    as: "users",
                    attributes: {
                        exclude: ["password", "createdAt", "updatedAt", "is_active"]
                    }
                }
            ],
            where: {
                is_published: 1
            },
            order: [
                ["createdAt", "DESC"]
            ],
            limit: 5
        })
        .then(data => {
            res.status(200).send({
                is_success: 1,
                message: "Success",
                data: data
            });
        });
};

//list articles lastest
exports.articlesLastest = (req, res) => {
    console.log("Processing func -> Article by Category");
    // const {
    //     id_Cat
    // } = req.params.idCat;
    const id = req.params.idCat;
    console.log(req.params.idCat);
    tb_article
        .findAll({
            include: [{
                    model: tb_cat,
                    as: "categories",
                    attributes: ["id", "name"]
                },
                {
                    model: tb_user,
                    as: "users",
                    attributes: ["id", "fullname"]
                }
            ],
            where: {
                category_id: id
            },
            order: [
                ["createdAt", "DESC"]
            ],
            limit: 5
        })
        .then(data => {
            res.status(200).send({
                is_success: 1,
                message: "Success",
                data: data
            });
        });
};

//list articles by Category
exports.articlesByCategory = (req, res) => {
    console.log("Processing func -> Article by Category");
    // const {
    //     id_Cat
    // } = req.params.idCat;
    const id = req.params.idCat;
    console.log(req.params.idCat);
    tb_article
        .findAll({
            include: [{
                    model: tb_cat,
                    as: "categories",
                    attributes: ["id", "name"]
                },
                {
                    model: tb_user,
                    as: "users",
                    attributes: ["id", "fullname"]
                }
            ],
            where: {
                category_id: id
            },
            order: [
                ["createdAt", "DESC"]
            ],
            limit: 5
        })
        .then(data => {
            res.status(200).send({
                is_success: 1,
                message: "Success",
                data: data
            });
        });
};

const wrapping = (dataArticles, dataUsers, dataCategories) => {
    let wrap = {
        title: dataArticles.title,
        img: dataArticles.image,
        content: dataArticles.content,
        category: {
            id: dataCategories.category_id,
            name: dataCategories.name
        },
        createdBy: {
            id: idUser,
            email: dataUsers.email
        },
        createdAt: dataArticles.createdAt,
        updatedAt: dataArticles.updatedAt
    };
    return wrap;
};

//adding data article
exports.addArticleByCategory = (req, res) => {
    console.log("Processing func -> Article by Category");
    idUser = req.userId;

    // can access fields which are set previously
    console.log("id of user", req.userId);

    let data = {
        title: req.body.title,
        image: req.body.image,
        content: req.body.content,
        category_id: req.body.category_id,
        author_id: idUser,
        is_published: req.body.is_published
    };

    const errors = [];
    // validasi input
    if (!data.title) errors.push("`title` is required");
    if (!data.image) errors.push("`image` is required");
    if (!data.content) errors.push("`content` is required");
    if (!data.category_id) errors.push("`category_id` is required");
    const hasErrors = Boolean(errors.length);

    if (hasErrors) {
        return res.status(422).json({
            errors: errors
        });
    }

    // todo: create article
    // todo: send article as json response
    tb_article.create(data).then(dataArticles => {
        tb_user
            .findOne({
                where: {
                    id: idUser
                }
            })
            .then(dataUsers => {
                tb_cat
                    .findOne({
                        where: {
                            id: dataArticles.category_id
                        }
                    })
                    .then(dataCategories => {
                        const wrapped = wrapping(dataArticles, dataUsers, dataCategories);
                        res.status(200).send(wrapped);
                    });
            });
    });
};

//just only author can update article
exports.editArticleByCategory = async (req, res) => {
    console.log("Processing func -> Article by Category");
    // can access fields which are set previously
    console.log("id of user", req.userId);

    const idArticle = req.params.idarticle;
    const idUser = req.userId;


    // console.log(idArticle);
    // console.log(idUser);
    try {

        let article = await tb_article.findOne({
            where: {
                id: idArticle,
                author_id: idUser
            }
        });
        if (!article) {
            res.status(404).json({
                msg: "Not Found"
            });
        } else {
            let input = {
                title: req.body.title,
                content: req.body.content,
                image: req.body.image,
                category_id: req.body.category_id
            };

            tb_article
                .update(input, {
                    where: {
                        id: idArticle,
                        author_id: idUser
                    }
                })
                .then(updated => {
                    res.status(200).json({
                        msg: "updated",
                        Article: updated
                    });
                })
                .catch(err => {
                    res.status(401).json({
                        msg: "Bad Request",
                        Error: err
                    });
                });
        }

    } catch (e) {
        next(e);
    }
};

exports.deleteArticle = async (req, res, next) => {
    const idUser = req.userId;
    const idArticle = req.params.idarticle;
    try {
        let article = await tb_article.findOne({
            where: {
                id: idArticle,
                author_id: idUser
            }
        });

        if (!article) {
            res.status(404).json({
                msg: "Not Found"
            });
        } else {
            tb_article.destroy({
                where: {
                    id: idArticle,
                    author_id: idUser
                }
            }).then(() => {
                res.status(200).json({
                    message: "success deleted"
                });
            });

        }
    } catch (err) {
        next(err);
    }

};