var jwt = require("../middleware")
module.exports = function (app) {
    const article = require("../controllers/articles");
    app.get("/api/article/allarticles", article.allArticles);
    app.get("/api/user/:userId/article/allarticles", [jwt.authorized], article.allArticles);
    app.get("/api/article/category/:idCat/allarticles", article.articlesByCategory);
    app.get("/api/article/category/latestarticles", article.articlesLastest);
    app.post("/api/article/addarticles", [jwt.authorized], article.addArticleByCategory);
    app.put("/api/user/article/:idarticle", [jwt.authorized], article.editArticleByCategory);
    app.delete("/api/user/article/:idarticle", [jwt.authorized], article.deleteArticle);
};