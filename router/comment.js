var jwt = require("../middleware")
module.exports = function (app) {
    const comment = require("../controllers/comment");
    app.get("/api/article/:idarticle/comment/", [jwt.authorized], comment.addComments);
    app.put("/api/article/:idarticle/comment/:idcomment", [jwt.authorized], comment.editComment);
    app.delete("/api/article/:idarticle/comment/:idcomment", [jwt.authorized], comment.deleteComment);
};