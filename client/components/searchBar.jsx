import React from 'react';

const searchBar = (props) => {

    return (
      <div className='search-bar'>
        <input 
          id='search-field'
          type='text'
          name='search-bar'
          placeholder='...search'
          onChange={ props.updateSearch }
        />
        <i className='fas fa-search' 
          onClick={ props.submitSearch }
        />
      </div>
    );
};

export default searchBar;