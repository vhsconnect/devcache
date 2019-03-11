const serverConfig = require('./serverConfig');
const { Pool } = require("pg");
const pool = new Pool(serverConfig);
const cookieParser = require('cookie-parser');

const snippetController = {};

snippetController.createSnippet = (req, res, next) => {
  const { snippet, comments, project } = req.body
  const user_id = req.cookies.user_id;
  console.log(user_id)
  const date = new Date();
  const snippetQuery = {
    name: 'create-snippet',
    text: 'INSERT into snippets (snippet, comments, project, date, user_id) values ($1, $2, $3, $4, $5) RETURNING id ;',
    values: [snippet, comments, project, date, user_id]
  }
  pool.query(snippetQuery)
  .then(result=> {
    console.log(result)
    res.locals.snippet_id = result.rows[0].id
    next();
  })
  .catch(err=>console.error(err.stack))
}

snippetController.createTags = (req, res, next) => {
  const promises = [];
  const snippet_id = res.locals.snippet_id;
    const tags = req.body.tags.split(", ");
    tags.forEach(tag => {
      let tagQuery = {
        name: 'create-tags',
        text: 'INSERT into tags (tag, snippet_id) values ($1, $2);',
        values: [tag, snippet_id]
      }
      promises.push(tagQuery)
    })
    Promise.all(promises)
    .then(values => {
      values.forEach(tagQuery=>pool.query(tagQuery))
      res.send(201, 'tags successfully added')
    })
    .catch(err => console.log(err.message))
}

snippetController.getAllUserTags = (req, res, nex) => {
  const user_id = req.cookies.user_id;
  const query = {
    name: 'get-all-tags',
    text: 'SELECT tags.tag from tags INNER JOIN snippets on snippets.id = tags.snippet_id WHERE snippets.user_id = $1;',
    values: [user_id]
  }
  pool.query(query)
  .then(result => {
    const tags = [];
    result.rows.forEach(obj => tags.push(obj.tag))
    res.json(tags)
  })
}

module.exports = snippetController;