const verifySignUp = require('./verifySignUp');
module.exports = function (app) {
    const controller = require('../controllers/users');
    // sign up
    app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail], controller.signup);

    // sign in
    app.post('/api/auth/signin', controller.signIn);

}