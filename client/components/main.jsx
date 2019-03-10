import React, { Component } from 'react';

// Import Children

import AddSnip from './addSnip.jsx';
import CommentBox from './commentBox.jsx';
import SnipDetails from './snipDetails.jsx';
import SideBar from './sideBar.jsx';

class Main extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className='container'>
        <div className='main'>
          <h3>devCache</h3>
          <AddSnip />
          <CommentBox />
          <SnipDetails />
        </div>
        <SideBar />
      </div>
    );
  }
};

export default Main;