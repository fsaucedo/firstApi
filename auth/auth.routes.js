const Users = require('./auth.controller');
const jwt = require('express-jwt');
const secret = { secret: process.env.SECRET || 'fsaucedo' }
  
module.exports = (router) => {
  router.post('/register', jwt(secret), Users.createUser);
  router.post('/login', jwt(secret), Users.loginUser);
}