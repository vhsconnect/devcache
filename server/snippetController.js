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
      pool.end();
      res.send(201, 'tags successfully added')
    })
    .catch(err => console.log(err.message))
}

snippetController.getAllUserTags = (req, res, next) => {
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
    pool.end();
    res.json(tags);
  })
}

snippetController.getSnipetIdsByTag = (req, res, next) => {
   const tag = req.query.tag;
   console.log(tag);
   const IdQuery = {
     name: 'getSnippetIdsByTag',
     text: 'SELECT snippet_id FROM tags WHERE tags.tag = $1;',
     values: [tag]
   }
   pool.query(IdQuery)
   .then(result => {
    let resultArr = []; 
    result.rows.forEach(row => { 
      resultArr.push(row.snippet_id)
     })
     res.locals.snippets = resultArr;
     next()
   })
   .catch(e => console.error(e.stack))
}

snippetController.getSnippetsBySnippetIds = (req, res, next) => {
  const snippetIds = res.locals.snippets;
  const userId = req.cookies.user_id;
  promises = []
  snippetIds.forEach(id =>{
    console.log(id)
    let query = {
      name: 'getSnippetsBySnippetId', 
      text: 'SELECT * from snippets where snippets.id = $1 AND snippets.user_id = $2;',
      values: [id, userId]
    }
    promises.push(query);
  })

    Promise.all(promises)
  .then(snippetQuery => {
    let resultsArr = [];
    snippetQuery.forEach( (x, y) => {
      if (y < 4){
        console.log(x)
        let temp =  pool.query(x)
        resultsArr.push(temp)
      }
    }) 
    console.log(resultsArr);
    Promise.all(resultsArr)
    .then(snippets=> {
      let arr = []; 
      snippets.forEach(obj => {
        arr.push(obj.rows)
      })
      res.json(arr)
    }) 
    .catch(e=>console.error(e.stack))
  })

}

snippetController.deleteSnippet = (req, res, next) => {
  const id = req.query.id;
  console.log(id);
  const deleteQuery = {
    name: 'delete-snippet',
    text: 'DELETE FROM snippets where snippets.id = $1;',
    values: [id]
  }
  pool.query(deleteQuery)
    .then(data => {
      res.status(200).send('snippet deleted')
    })


} 

module.exports = snippetController;

