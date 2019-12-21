module.exports = function (app) {
    const categories = require('../controllers/categories');
    app.post('/api/addcategory', categories.addCateggories);
    app.post('/api/allcategory', categories.allCategories);


}