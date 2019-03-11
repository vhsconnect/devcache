const serverConfig = require('./serverConfig');
const { Pool } = require("pg");
const pool = new Pool(serverConfig);
const cookieParser = require('cookie-parser');


const sessionController = {};

sessionController.setCookie = (req, res, next) => {
  res.cookie('session_id', res.locals.session_id)
  res.cookie('user_id', res.locals.user_id), 
  next();
};

sessionController.startSession = (req, res, next) => {
  let query = {
    name: 'create-session',
    text: 'INSERT into sessions (usersession) values ($1);',
    values: [res.locals.session_id]
  }
  pool.query(query)
  .then(result => {
    res.status(201).send(result);
  })
}


module.exports = sessionController;