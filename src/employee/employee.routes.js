const express  =   require('express');
const router   =   express.Router();

const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false}),
      requireLogin = passport.authenticate('local', {session: false});
      
module.exports = router;