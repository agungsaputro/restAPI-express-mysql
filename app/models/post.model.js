
module.exports = (sequelize, DataTypes) =>{
    const Post = sequelize.define("posts",{
        title:{
            type: DataTypes.STRING
        },
        content:{
            type: DataTypes.STRING
        },
        tags:{
            type: DataTypes.STRING
        }
    });

    return Post;
};