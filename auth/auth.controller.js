const User = require('./auth.dao');
const bcrypt = require('bcryptjs');

exports.createUser = (req, res, next) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password)
  }

  User.create(newUser, (err, user) => {
    if (err && err.code === 11000) return res.status(409).send('Email ya registrado');
    if (err) return res.status(500).send('Error interno');
    const dataUser = {
      name: user.name,
      email: user.email,
    }
    res.send({ dataUser });
  });
}

exports.loginUser = (req, res, next) => {
  console.log(req.body);
  const userData = {
    email: req.body.email,
    password: req.body.password
  }
  User.findOne({ email: userData.email }, (err, user) => {
    if (err) return res.status(500).send('Error interno!');

    if (!user) {
      res.status(409).send({ message: 'Usuario equivocado' });
    } else {
      const resultPassword = bcrypt.compareSync(userData.password, user.password);
      if (resultPassword) {
        const dataUser = {
          name: user.name,
          email: user.email
        }
        res.send({ dataUser });
      } else {
        res.status(409).send({ message: 'Contraseña equivocada' });
      }
    }
  });
}











