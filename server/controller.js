
const serverConfig = require('./serverConfig');
const { Pool } = require("pg");
const pool = new Pool(serverConfig);
const controller = {};
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const bcrypt =require('bcrypt');
const saltRounds = 3;



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
    text: 'SELECT * from account where username = $1;',
    values: [username]
  }
  pool.query(query)
  .then(result => {
    let hash = result.rows[0].password;
    bcrypt.compare(password, hash, function(err, judgement){

      if (judgement === true) {
        const session_id = uuid();
        res.locals.session_id = session_id
        res.locals.user_id = result.rows[0].user_id
        next()
      } else {
        console.log(err);
        res.status(403).send('wrong pass :(');
      }
    })
     
  })
  .catch(e => console.error(e.stack))  
}

controller.createUser = (req, res, next) => {
  console.log('initializes createUser')
  console.log(req.body)

  let username = req.body.username;
  let password = req.body.password;
  let fullName = req.body.fullname;
  let email = req.body.email;

 bcrypt.hash(password, saltRounds, (err, hash) => {
  let query = {
    name: 'create-user',
    text: 'INSERT into account(fullname, username, password, email) VALUES($1, $2, $3, $4) RETURNING user_id;',
    values: [fullName, username, hash, email]
  }
  pool.query(query)
    .then(result => {
      const session_id = uuid();
      res.locals.session_id = session_id;
      res.locals.user_id = result.rows[0].user_id;
      next()
    })
    .catch(e => console.error(e.stack));
 })
} 






module.exports = controller;