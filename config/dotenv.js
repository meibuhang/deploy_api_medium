const env = require('./env.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,

    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

// connection.connect(function (err) {
//     if (err) throw err
//     console.log("connect")
// })
// module.exports = connection

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/users')(sequelize, Sequelize);
db.categories = require('../models/categories')(sequelize, Sequelize);
module.exports = db;