
const serverConfig = require('./serverConfig');
const { Pool } = require("pg");
const pool = new Pool(serverConfig);
const controller = {};
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');



controller.getUsers = (req, res) => {
  console.log('initialized getUsers')
  pool.query('SELECT * FROM users;', (error, results) => {
    if (error) {
      console.log(error)
      throw error;
    }
    res.json(results.rows[0])
  })
}

controller.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  const query = {
    name: 'verify-user',
    text: 'SELECT * from users where username = $1 AND password = $2;',
    values: [username, password]
  }
  pool.query(query)
  .then(result => {
    console.log(result.rows[0])
    const uniqueId = uuid()
    if (result.rows[0]) {
      res.locals.uniqueId = uniqueId
      next()
    } else {
      res.send(403, 'username does not exist')
    }
  })
  .catch(err=>console.error(err.stack))
}

controller.createUser = (req, res, next) => {
  console.log('initializes createUser')
  console.log(req.body)
  let username = req.body.username;
  let password = req.body.password;
  let fullName = req.body.fullname;
  let email = req.body.email;

  let query = {
    name: 'create-user',
    text: 'INSERT into users(fullname, username, password, email) VALUES($1, $2, $3, $4) RETURNING id;',
    values: [fullName, username, password, email]
  }
  pool.query(query)
    .then(result => {
      res.locals.id = result.rows[0].id;
      next()
    })
    .catch(e => console.error(e.stack))
} 





module.exports = controller;