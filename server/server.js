
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller.js');
const sessionController = require('./sessionController.js')
const path = require('path');

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../build')));



//***************** */ ROUTES

app.get('/allusers', controller.getUsers)
app.post('/login', controller.verifyUser, sessionController.setCookie, sessionController.startSession)
app.post('/signup', controller.createUser, sessionController.setCookie, sessionController.startSession)


//***************** */
app.listen(3000, () => console.log('now listening on port 3000 .-.') )