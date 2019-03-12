import React from 'react';

const snipDetails = props => {

  return (
    <div className='details-box'>
      <input 
        id='project-tag'
        type='text'
        name='projectTag'
        placeholder='project.'
        onChange={ props.updateProjectTag}
      />
      <input 
        id='tags'
        type='text'
        name='tags'
        placeholder='tags delimited by comma + space.'
        onChange={ props.updateTags }
      />
      <button onClick= { props.submitSnippet }>Submit Snippet</button> 
    </div>
  );
};

export default snipDetails;