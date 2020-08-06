const db = require ("../models");
const Author = db.author;
const Post = db.post;
const Op = db.Sequelize.Op;

exports.create = (req,res) =>{
    // Validate request
    if(!req.body.username){
        res.status(400).send({
            message : "username can not be empty"
        });
        return;
    }
    const author = {
        username: req.body.username,
        password: req.body.password,
        salt : req.body.salt,
        email : req.body.email,
        photo : req.body.photo,
        published: req.body.published ? req.body.published : false
    };

    Author.create(author)
        .then(data => {
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message ||  "Some error occurred while creating the Author."
            });
        });
};

exports.findAll = (req,res) =>{
    const username = req.query.username;
    var condition = username ? {username : {[Op.like]: `%${username}`}} : null;

    Author.findAll({where : condition})
        .then(data =>{
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving author."
            });
        });

};

exports.findOne = (req,res) =>{
    const id = req.params.id;

    Author.findByPk(id)
     .then(data => {
         res.send(data);
     })
     .catch(err =>{
        res.status(500).send({
            message: "Error retrieving author with id=" + id
        });
     });

};

exports.update = (req,res) =>{
    const id = req.params.id;

    Author.update(req.body,{
        where: {id:id}
    })
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Tutorial was updated successfully."
                });
            }else{
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Error updating author with id=" + id
            });
        });

};

exports.delete = (req,res) =>{
    const id = req.params.id;

    Author.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
          res.send({
            message: "Author was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete author with id=${id}. Maybe author was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete suthor with id=" + id
        });
      });

};

exports.deleteAll = (req,res) =>{
    Author.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Authors were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all authors."
          });
        });
};
