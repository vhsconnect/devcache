
const serverConfig = require('./serverConfig');
const { Pool } = require("pg");
const pool = new Pool(serverConfig);
const controller = {};
const cors = require('cors');
const bodyParser = require('body-parser');



controller.getUsers = (req, res) => {
  console.log('hitting getUser controller')
  pool.query('SELECT * FROM users;', (error, results) => {
    if (error) {
      console.log(error)
      throw error;
    }
    res.json(results.rows[0])
  })
}



module.exports = controller;