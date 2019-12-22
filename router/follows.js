var jwt = require("../middleware")
module.exports = function (app) {
    const fol = require('../controllers/follow');

    //iduser = follows id
    app.post('/api/user/addFollow', [jwt.authorized],fol.addFollows);
    


}