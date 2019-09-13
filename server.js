'use strict'

const authRoutes = require('./auth/auth.routes');
const jobRoutes = require('./job/job.routes');
const express = require('express');
const propierties = require('./config/properties');
const DB = require('./config/db');
const jwt = require('express-jwt');
const secret = { secret: process.env.SECRET || 'fsaucedo' }

DB();

const app = express();
const router = express.Router();

const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use('/api', router);

authRoutes(router);
jobRoutes(router);
router.get('/', jwt(secret), (req, res) => {
  if (req.user.admin) {
    res.send('Bienvenido a mi primera api');
  }
  res.status(401).send("No cuenta con autorizacion");
});
app.use(router);
app.listen(propierties.PORT, () => console.log(`Server runing on port ${propierties.PORT}`));