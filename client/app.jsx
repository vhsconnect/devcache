import React, { Component } from 'react'
import { render } from 'react-dom'

// Import Components

import Login from './components/login.jsx';

class App extends Component {
  constructor(props){
    super(props); 
  }

  render() {
    return (
      <React.Fragment>
        <h1>devCache</h1>
        <p>A personalized cache of code snippets for developers.</p>
        <Login />
      </React.Fragment>
    );
  }
}

export default App;