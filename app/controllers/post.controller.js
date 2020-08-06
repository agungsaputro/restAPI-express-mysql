const db = require ("../models");
const { author } = require("../models");
const Author = db.author;
const Post = db.post;


exports.init = (req,res) =>{
    Author.create({
        username: 'bagas',
        password: 'bagas123',
        salt : 'bagaskhj',
        email : 'bagas@email.com',
        photo: 'bagas.png',
        published: req.body.published ? req.body.published : false,
        post: [
            {
                title   : "javascript",
                content : "javascript for beginner",
                tags    : "programming"
            },
            {
                title   : "PHP",
                content : "PHP for beginner",
                tags    : "programming"
            }
        ]  
     },{
         include: [Post]
     }).then(() =>{
         console.log("bagas post artikel");

         Author.create({
            username: 'budi',
            password: 'budi123',
            salt : 'budikhj',
            email : 'budi@email.com',
            photo: 'budi.png',
            published: req.body.published ? req.body.published : false,
            post: [
                {
                    title   : "masakan jawa",
                    content : "masakan jawa",
                    tags    : "makanan jawa"
                },
                {
                    title   : "makanan bali",
                    content : "makanan bali",
                    tags    : "makanan bali"
                }
            ]
     },{
         include : [Post]
     }).then(() =>{
        console.log("budi post artikel");
     })
     }).then(() =>{
         res.send("done")
     })
};

exports.findAll = (req,res) =>{
    Author.findAll({
        attributes: [['id','authorId'], 'username','password','salt','email','photo','published'],
        include: [{
            model: Post,
            where: {fk_authorid: db.Sequelize.col('author.id')},
            attributes: ['title','content','tags']
        }]
    }).then(authors =>{
        res.send(authors)
    })
}