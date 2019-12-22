var jwt = require("../middleware")
module.exports = function (app) {
    const article = require("../controllers/articles");
    app.get("/api/article/allarticles", article.allArticles);
    app.get("/api/article/:articleid/detailarticles", article.detailArticles);
    app.get("/api/article/user/:userId/allarticles", article.articlesByPerson);
    app.get("/api/article/category/:idCat/allarticles", article.articlesByCategory);
    app.get("/api/article/category/:idCat/related", article.articlesRelatedArticles);
    app.get("/api/article/category/latestarticles", article.articlesLastest);
    app.post("/api/article/addarticles", [jwt.authorized], article.addArticleByCategory);
    app.put("/api/user/article/:idarticle", [jwt.authorized], article.editArticleByCategory);
    app.delete("/api/user/article/:idarticle", [jwt.authorized], article.deleteArticle);
};