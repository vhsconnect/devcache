
const serverConfig = require('./serverConfig');
const { Pool } = require("pg");
const pool = new Pool(serverConfig);
const controller = {};
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');



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


controller.createUser = (req, res) => {
  console.log('initializes createUser')
  console.log(req.body)
  let username = req.body.username;
  let password = req.body.password;
  let fullName = req.body.fullname;
  let email = req.body.email;

  let query = {
    name: 'create-user',
    text: 'INSERT into users(fullname, username, password, email) VALUES($1, $2, $3, $4)',
    values: [fullName, username, password, email]
  }
  pool.query(query)
    .then(result => res.json(result.rows[0]))
    .catch(e => console.error(e.stack))
} 





module.exports = controller;