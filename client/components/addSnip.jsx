import React from 'react';

const addSnip = (props) => {
    
    return (
      <textarea 
        placeholder='...add Snippet'
        onChange={ props.updateSnippetContent }
      />
    );
};

export default addSnip;