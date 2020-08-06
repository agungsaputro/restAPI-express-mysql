module.exports = (sequelize, Sequelize) =>{
    const Author = sequelize.define("authors",{
//        id: {
//            allowNull: false,
//            autoIncrement: true,
//            primaryKey: true,
//            type: Sequelize.INTEGER
//          },
        username:{
            type: Sequelize.STRING
        },
        password:{
            type: Sequelize.STRING
        },
        salt:{
            type: Sequelize.STRING
        },
        email:{
            type: Sequelize.STRING
        },
        photo:{
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });
    return Author;
}