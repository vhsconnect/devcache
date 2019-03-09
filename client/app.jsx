import React, { Component } from 'react'

// Import External Components
import Login from './components/login.jsx';

// Component Body
class App extends Component {
  constructor(props){
    super(props); 
    this.state = {
      user: "",
      pass: ""
    };
    this.updateUserState = this.updateUserState.bind(this);
    this.updatePassState = this.updatePassState.bind(this);
    this.createUser = this.createUser.bind(this);
    this.verifyUser = this.verifyUser.bind(this);
  };

  updateUserState(e) {
    console.log(e.target.value);
    this.setState({ user: e.target.value });
  };

  updatePassState(e) {
    this.setState({ pass: e.target.value });
  };

  createUser() {
    fetch('http://localhost:3000/register', {
      headers: {
        "Content-Type": "application/json"
      }, 
      method: 'post',
      body: JSON.stringify({ 
        user: this.state.user,
        pass: this.state.pass
      })
    })
    .then(res => console.log(res.status))
    .catch(err => console.log('err -->', err));
  };

  verifyUser() {
    fetch('http://localhost:3000/login', {
      headers: {
        "Content-Type": "application/json"
      }, 
      method: 'post',
      body: JSON.stringify({ 
        user: this.state.user,
        pass: this.state.pass
      })
    })
    .then(res => console.log(res.status))
    .catch(err => console.log('err -->', err));
  };

  render() {
    return (
      <React.Fragment>
        <h1>devCache</h1>
        <p>A personalized cache of code snippets for developers.</p>
        <Login
          updateUserState={ this.updateUserState }
          updatePassState={ this.updatePassState }
          createUser={ this.createUser }
          verifyUser={ this.verifyUser }
        />
      </React.Fragment>
    );
  }
}

export default App;