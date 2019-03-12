import React, { Component } from 'react';

// Import Children

import AddSnip from './addSnip.jsx';
import CommentBox from './commentBox.jsx';
import SnipDetails from './snipDetails.jsx';
import DisplaySnippets from './displaySnippets.jsx';
import SideBar from './sideBar.jsx';

// Component Body

class Main extends Component {

  constructor(props) {
    super();

    this.state = {
      snippet: '',
      commments: '',
      project: '',
      tags: '',
      search: '',
      userTags: [],
      taggedSnippets: []
    };
    
    this.updateSnippetContent = this.updateSnippetContent.bind(this);
    this.updateComments = this.updateComments.bind(this);
    this.updateProjectTag = this.updateProjectTag.bind(this);
    this.updateTags = this.updateTags.bind(this);
    this.updateSearch = this.updateSearch.bind(this);

    this.submitSnippet = this.submitSnippet.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    
    this.grabSnippetsFromDB = this.grabSnippetsFromDB.bind(this);
    this.getTagsFromDB = this.getTagsFromDB.bind(this);
  };

  // Helper Functions

  getTagsFromDB() {

    fetch('http://localhost:3000/gettags', {
      headers: { "Content-Type": "application/json" },
      method: 'get'
    })
    .then(res => res.json())
    .then(data => this.setState({ userTags: data }))
    .catch(err => console.error(err));
  };

  grabSnippetsByTag(tag) {

    fetch(`http://localhost:3000/getsnippetsbytag/?tag=${tag}`, {
      headers: { "Content-Type": "application/json" },
      method: 'get'
    })
    .then(res => res.json())
    .then(data => this.setState({ taggedSnippets: data }))
    .catch(err => console.log('err -->', err));
  };

  // Update Methods

  updateSnippetContent(e) {
    this.setState({ snippet: e.target.value });
  };
  
  updateComments(e) {
    this.setState({ comments: e.target.value });
  };
  
  updateProjectTag(e) {
    this.setState({ project: e.target.value });
  };
  
  updateTags(e) {
    this.setState({ tags: e.target.value });
  };
  
  updateSearch(e) {
    this.setState({ search: e.target.value });
  };

  componentDidMount() {
    this.getTagsFromDB();
  };

  // Database Methods

  submitSnippet() {

    fetch('http://localhost:3000/createsnippet', {
      headers: { "Content-Type": "application/json" }, 
      method: 'post',
      body: JSON.stringify({ 
        snippet: this.state.snippet,
        comments: this.state.comments,
        project: this.state.project,
        tags: this.state.tags
      })
    })
    .then(res => {
      if (res.ok) this.getTagsFromDB()
    });
  };

  submitSearch() {
    let tag = this.state.search;
    this.grabSnippetsByTag(tag);
  };

  grabSnippetsFromDB(e) {
    let tag = e.target.id;
    this.grabSnippetsByTag(tag);
  };

  deleteSnippet(id, index) {

    fetch(`http://localhost:3000/deletesnippetbyid?id=${id}`, {
      headers: { "Content-Type": "application/json" },
      method: 'get'
    })
    .then(() => {
      let updated = [...this.state.taggedSnippets];
      updated.splice(index, 1);
      this.setState({ taggedSnippets: updated })
    })
    .catch(err => console.error(err));
  };

  // Render Logic

  render() {
    
    return (
      <React.Fragment>
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
            userTags={ this.state.userTags }
            grabSnippetsFromDB={ this.grabSnippetsFromDB }
          />
        </div>
        <DisplaySnippets 
          taggedSnippets={ this.state.taggedSnippets }
          deleteSnippet={ this.deleteSnippet }
        />
      </React.Fragment>
    );
  };
};

export default Main;