import React from 'react';
import SearchBar from './searchBar.jsx'

const sideBar = (props) => {

    return (
      <div className='side-bar'>
        <SearchBar 
          updateSearch={ props.updateSearch }
          submitSearch={ props.submitSearch }
        />
      </div>
    );
};

export default sideBar;