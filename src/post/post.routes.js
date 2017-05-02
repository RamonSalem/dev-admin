const express  =   require('express');
const router   =   express.Router();
const controller = require('./post.controller');

const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false}),
      requireLogin = passport.authenticate('local', {session: false});





router.get('/posts/testing', (req, res)=>{
      res.send('working;');
});

router.post('/posts', controller.postPostage);

router.get('/posts', controller.getAllPosts);

router.get('/posts/:id', controller.getPost);

router.put('/posts/:id', controller.putPost);

router.delete('/posts/:id', controller.deletePost);



module.exports = router;