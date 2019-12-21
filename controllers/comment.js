const tb_article = require("../models").Article;
const tb_cat = require("../models").Category
const tb_user = require("../models").User;
const tb_comment = require("../models").Comment;


//add Comment
exports.addComments = async (req, res, next) => {
    const idUser = req.userId;
    const idArticle = req.params.idarticle;
    try {

        let articles = await tb_article.findOne({
            where: {
                id: idArticle
            }
        });
        if (!articles) {
            res.status(404).json({
                msg: "Not Found"
            });
        } else {
            let com = {
                comment: req.body.comment,
                article_id: idArticle,
                user_id: idUser,
            };
            if (!com.comment) {
                return res.status(422).json({
                    message: "comment is required"
                });
            }

            tb_comment.create(com).then(data => {
                if (data) {
                    tb_comment.findAll({
                        order: [
                            ["id", "DESC"]
                        ],
                        include: [{
                            model: tb_article,
                            as: "articles",
                            attributes: ["id", "title"]
                        }],
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "is_published", "is_archived"]
                        }
                    }).then(item => {
                        res.send(item);
                    });
                } else {
                    res.status(400).json({
                        message: "No Comment was Added"
                    });
                }
            });
        };

    } catch (e) {

        next(e);
    }

}

//Edit Comment
//just only author can update article
exports.editComment = async (req, res) => {
    console.log("Processing func -> Edit Comment");
    // can access fields which are set previously
    console.log("id of user", req.userId);

    const idArticle = req.params.idarticle;
    const idUser = req.userId;
    const idComment= req.params.idcomment;


    // console.log(idArticle);
    // console.log(idUser);
    try {

        let com = await tb_comment.findOne({
            where: {
                id: idComment,
                user_id: idUser,
                article_id:idArticle

            }
        });
        if (!com) {
            res.status(404).json({
                msg: "Not Found"
            });
        } else {
            let input = {
                comment: req.body.comment,
               
            };

            tb_comment
                .update(input, {
                    where: {
                        id: idComment,
                        article_id:idArticle,
                        user_id: idUser
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

//delete Comment
exports.deleteComment = async (req, res, next) => {
    const idUser = req.userId;
    const idArticle = req.params.idarticle;
    const idComment= req.params.idcomment;

    try {
        let com = await tb_comment.findOne({
            where: {
                id: idComment,
                user_id: idUser,
                article_id:idArticle
            }
        });

        if (!com) {
            res.status(404).json({
                msg: "Not Found"
            });
        } else {
            tb_comment.destroy({
                where: {
                    id: idComment,
                    user_id: idUser,
                    article_id:idArticle
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