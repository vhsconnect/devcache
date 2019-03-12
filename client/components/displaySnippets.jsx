import React from 'react';

const displaySnippets = (props) => {
  const snippetsArray = props.taggedSnippets;
  const snippetsDisplayArray = [];

  for (let i = 0; i < snippetsArray.length; i++) {
    snippetsDisplayArray.push(
      <div 
        className='tagged-snippet' 
        key={'snippet' + i}
        id={ snippetsArray[i].id }
      >
        <div className='tagged-content-box'>
          <p className='tagged-snippet-content'>
            { snippetsArray[i].snippet }
          </p>
          <i 
            className="fas fa-trash" 
            onClick={ () => props.deleteSnippet(snippetsArray[i].id, i) }
          />
        </div>
        <div className='tagged-details-box'>
          <p className='tagged-snippet-date'>
            { snippetsArray[i].date }
          </p>
          <p className='tagged-snippet-project'>
            { snippetsArray[i].project }
          </p>
          <p className='tagged-snippet-comments'>
            { snippetsArray[i].comments }
          </p>
        </div>
      </div>
    );
  };
  return (
    <div className='tagged-snippets-box'>
      { snippetsDisplayArray }
    </div>
  );
};

export default displaySnippets;