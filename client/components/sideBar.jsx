import React from 'react';
import SearchBar from './searchBar.jsx'

const sideBar = props => {
  
  const tagSet = new Set(props.userTags);
  const tagArray = Array.from(tagSet);
  const displayArray = [];

  for (let i = 0; i < tagArray.length; i++) {
    displayArray.push(
      <p 
        onClick={ (e) => props.grabSnippetsFromDB(e) }
        id={ tagArray[i] }
        key={ i }
      >
        { tagArray[i] }
      </p>
    );
  };

  return (
    <div className='side-bar'>
      <SearchBar 
        updateSearch={ props.updateSearch }
        submitSearch={ props.submitSearch }
      />
      { displayArray }
    </div>
  );
};

export default sideBar;