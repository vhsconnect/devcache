import React, { Component } from 'react';

// Import Children

import AddSnip from './addSnip.jsx';
import CommentBox from './commentBox.jsx';
import SnipDetails from './snipDetails.jsx';

class Main extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className='main'>
        <h1>MAIN COMPONENT</h1>
        <AddSnip />
        <CommentBox />
        <SnipDetails />
      </div>
    );
  }
};

export default Main;