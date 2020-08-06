const dbConfig = require ("../config/db.config");

const Sequelize = require ("sequelize");
const sequelize = new Sequelize('test', 'root', '',{
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool:{
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle : dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.author = require ("./author.model.js")(sequelize, Sequelize);
db.post = require ("./post.model.js")(sequelize,Sequelize);

db.author.hasMany(db.post, {as: "posts"});
db.post.belongsTo(db.author,{
    as: "author"
})

module.exports = db;