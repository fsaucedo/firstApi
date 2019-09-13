const mongoose = require('mongoose');
const dbURL = require('./properties').DB;

module.exports = () => {
  mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Conexion en ruta:  ${dbURL}`))
    .catch(err => console.log(`Error en conexion, con ruta: ${err}`))

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(`Conexion finalizada`);
      process.exit(0)
    });
  });
}