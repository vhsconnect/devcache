const serverConfig = require('./serverConfig');
const { Pool } = require("pg");
const pool = new Pool(serverConfig);

const snippetController = {};

// Middleware Methods

snippetController.createSnippet = (req, res, next) => {
  const { snippet, comments, project } = req.body;
  const user_id = req.cookies.user_id;
  const date = new Date();
  const snippetQuery = {
    name: 'create-snippet',
    text: 'INSERT into snippets (snippet, comments, project, date, user_id) values ($1, $2, $3, $4, $5) RETURNING id;',
    values: [snippet, comments, project, date, user_id]
  };

  pool.query(snippetQuery)
  .then(result=> {
    res.locals.snippet_id = result.rows[0].id
    next();
  })
  .catch(err => console.log(err.stack));
};

snippetController.createTags = (req, res) => {
  const promises = [];
  const snippet_id = res.locals.snippet_id;
  const tags = req.body.tags.split(", ");

  tags.forEach(tag => {
    const tagQuery = {
      name: 'create-tags',
      text: 'INSERT into tags (tag, snippet_id) values ($1, $2);',
      values: [tag, snippet_id]
    };

    promises.push(tagQuery);
  });

  Promise.all(promises)
  .then(values => {
    values.forEach(tagQuery => pool.query(tagQuery));
    res.status(201).send('Tags added.');
  })
  .catch(err => console.log(err.message));
}

snippetController.getAllUserTags = (req, res) => {
  const user_id = req.cookies.user_id;
  const query = {
    name: 'get-all-tags',
    text: 'SELECT tags.tag FROM tags INNER JOIN snippets ON snippets.id = tags.snippet_id WHERE snippets.user_id = $1;',
    values: [user_id]
  };

  pool.query(query)
  .then(result => {
    const tags = [];
    result.rows.forEach(obj => tags.push(obj.tag));
    res.json(tags);
  });
};

snippetController.getSnippetIdsByTag = (req, res, next) => {
  const tag = req.query.tag;
  const IdQuery = {
    name: 'getSnippetIdsByTag',
    text: 'SELECT snippet_id FROM tags WHERE tags.tag = $1;',
    values: [tag]
  };

  pool.query(IdQuery)
  .then(result => {
    const resultArr = [];
    result.rows.forEach(row => resultArr.push(row.snippet_id));
    res.locals.snippets = resultArr;
    next();
  })
  .catch(err => console.error(err.stack));
};

snippetController.getSnippetsBySnippetIds = (req, res) => {
  const snippetIds = res.locals.snippets;
  const userId = req.cookies.user_id;
  const promises = [];

  snippetIds.forEach(id =>{
    const query = {
      name: 'getSnippetsBySnippetId', 
      text: 'SELECT * FROM snippets WHERE snippets.id = $1 AND snippets.user_id = $2;',
      values: [id, userId]
    };

    promises.push(query);
  });

  Promise.all(promises)
  .then(snippetQuery => {
    const resultsArr = [];
    snippetQuery.forEach((x, y) => {
      if (y < 2) resultsArr.push(pool.query(x));
    });

    Promise.all(resultsArr)
    .then(snippets => {
      let arr = []; 
      snippets.forEach(obj => arr.push(obj.rows));
      res.json(arr);
    }) 
    .catch(err => console.error(err.stack));
  });
};

snippetController.deleteSnippet = (req, res) => {
  const id = req.query.id;
  const deleteQuery = {
    name: 'delete-snippet',
    text: 'DELETE FROM snippets WHERE snippets.id = $1;',
    values: [id]
  };

  pool.query(deleteQuery)
  .then(data => {
    res.status(200).send('Snippet deleted.')
  });
};

module.exports = snippetController;