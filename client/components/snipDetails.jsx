import React from 'react';

const snipDetails = (props) => {

    return (
      <div>
        <input 
          id='dateTag'
          type='text'
          name='dateTag'
          placeholder='date.'
        />
        <input 
          id='projectTag'
          type='text'
          name='projectTag'
          placeholder='project.'
        />
        <input 
          id='generalTag'
          type='text'
          name='generalTag'
          placeholder='general.'
        />
        <input 
          id='specificTag'
          type='text'
          name='specificTag'
          placeholder='specific.'
        />
      </div>
    );
};

export default snipDetails;