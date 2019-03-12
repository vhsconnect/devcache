
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const controller = require('./controller.js');
const sessionController = require('./sessionController.js')
const snippetController = require('./snippetController.js')
const path = require('path');

const app = express();

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../build')));


//random comment for testing 
//***************** */ ROUTES

app.get('/allusers', controller.getUsers)
app.post('/login', controller.verifyUser, sessionController.setCookie, sessionController.startSession)
app.post('/signup', controller.createUser, sessionController.setCookie, sessionController.startSession)
app.post('/createsnippet', snippetController.createSnippet, snippetController.createTags)
app.get('/gettags', snippetController.getAllUserTags)
app.get('/getsnippetsbytag', snippetController.getSnipetIdsByTag, snippetController.getSnippetsBySnippetIds)
app.get('/deletesnippetbyid', snippetController.deleteSnippet)

//***************** */
app.listen(3000, () => console.log('now listening on port 3000 .-.') )