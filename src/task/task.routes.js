const express  =   require('express');
const router   =   express.Router();
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false}),
      requireLogin = passport.authenticate('local', {session: false});

let control = require('./task.controller');

router.get('/test', control.test ); // test route

module.exports = router;
