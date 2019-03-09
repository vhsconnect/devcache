
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller.js');
const path = require('path');

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/allusers', controller.getUsers)

app.listen(3000, () => console.log('now listening on port 3000 .-.') )