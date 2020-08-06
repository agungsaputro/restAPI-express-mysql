module.exports = app =>{

    const posts = require('../controllers/post.controller')
    
    
    app.get('/api/post/init', posts.init);

    app.get('/api/post/all', posts.findAll);
}