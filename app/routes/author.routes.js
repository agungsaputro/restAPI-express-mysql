module.exports = app =>{
    const authors = require("../controllers/author.controller");

    var router = require("express").Router();

    router.post("/", authors.create);

    router.get("/", authors.findAll);

    router.get("/:id", authors.findOne );

    router.put("/:id", authors.update);

    router.delete("/:id", authors.delete);

    router.delete("/", authors.deleteAll);

    app.use('/api/author', router);
};