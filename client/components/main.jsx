import React, { Component } from 'react';

// Import Children

import AddSnip from './addSnip.jsx';
import CommentBox from './commentBox.jsx';
import SnipDetails from './snipDetails.jsx';
import SideBar from './sideBar.jsx';

class Main extends Component {
  constructor(props) {
    super();
    this.state = {
      snippet: '',
      commments: '',
      project: '',
      tags: '',
      search: '',
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='main'>
          <h3>devCache</h3>
          <AddSnip 
            updateSnippetContent={ this.updateSnippetContent }
          />
          <CommentBox 
            updateComment={ this.updateComment }
          />
          <SnipDetails 
            updateProjectTag={ this.updateProjectTag }
            updateTags={ this.updateTags }
            submitSnippet={ this.submitSnippet }
          />
        </div>
        <SideBar 
          updateSearch={ this.updateSearch }
          submitSearch={ this.submitSearch }
        />
      </div>
    );
  }
};

export default Main;