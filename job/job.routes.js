const Jobs = require('./job.controller');
const jwt = require('express-jwt');
const secret = { secret: process.env.SECRET || 'fsaucedo' }
  
module.exports = (router) => {
  router.post('/job/register', jwt(secret), Jobs.createJob);
  router.post('/job/search', jwt(secret), Jobs.search);
  router.post('/job/resolvedJob/:id', jwt(secret), Jobs.resolvedJob);
  router.post('/job/removeJob/:id', jwt(secret), Jobs.removeJob);
}