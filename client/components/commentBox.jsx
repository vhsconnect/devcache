import React from 'react';

const commentBox = (props) => {
    
    return (
      <input 
        id='comment'
        type='text'
        name='comment'
        placeholder='...comments'
        onChange={ props.updateComment }
      />
    );
};

export default commentBox;