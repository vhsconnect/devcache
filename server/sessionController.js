const serverConfig = require('./serverConfig');
const { Pool } = require("pg");
const pool = new Pool(serverConfig);


const sessionController = {};

sessionController.setCookie = (req, res, next) => {
  res.cookie('id', res.locals.uniqueId)
  next();
};



sessionController.startSession = (req, res, next) => {
  let query = {
    name: 'create-session',
    text: 'INSERT into sessions (usersession) values ($1);',
    values: [res.locals.uniqueId]
  }
  pool.query(query)
  .then(result => {
    res.send(201, result)
  })
}

module.exports = sessionController;