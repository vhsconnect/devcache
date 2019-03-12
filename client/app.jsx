import React, { Component } from 'react'

// Import Children

import Login from './components/login.jsx';
import Registration from './components/registration.jsx';
import Main from './components/main.jsx';

// Component Body

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      username: "",
      password: "",
      fullname: "",
      email: "",
      isLoggedIn: false,
      isRegistered: false
    };
    
    this.updateFullNameState = this.updateFullNameState.bind(this);
    this.updateEmailState = this.updateEmailState.bind(this);
    this.updateUserState = this.updateUserState.bind(this);
    this.updatePassState = this.updatePassState.bind(this);
    
    this.createUser = this.createUser.bind(this);
    this.verifyUser = this.verifyUser.bind(this);
    this.registerUser = this.registerUser.bind(this);
  };

  // Update Methods

  registerUser() {
    this.setState({ isRegistered: true })
  };

  updateFullNameState(e) {
    this.setState({ fullname: e.target.value });
  };

  updateEmailState(e) {
    this.setState({ email: e.target.value });
  };

  updateUserState(e) {
    this.setState({ username: e.target.value });
  };

  updatePassState(e) {
    this.setState({ password: e.target.value });
  };

  // User Methods

  createUser() {
    const { fullname, email, username, password } = this.state;

    fetch('http://localhost:3000/signup', {
      headers: { "Content-Type": "application/json" }, 
      method: 'post',
      body: JSON.stringify({ fullname, email, username, password })
    })
    .then(res =>  {
      if (res.ok) this.setState({ isLoggedIn: true });
    })
    .catch(err => console.error('err -->', err));
  };

  verifyUser() {
    const { username, password } = this.state;

    fetch('http://localhost:3000/login', {
      headers: { "Content-Type": "application/json" }, 
      method: 'post',
      body: JSON.stringify({ username, password })
    })
    .then(res => {
      if (res.ok) this.setState({ isLoggedIn: true });
    })
    .catch(err => console.error('err -->', err));
  };

  render() {
    
    if (this.state.isLoggedIn) {
      return <Main />
    } else {
      if (this.state.isRegistered) {
        return (
          <React.Fragment>
            <Registration 
              updateFullNameState={ this.updateFullNameState }
              updateEmailState={ this.updateEmailState }
              updateUserState={ this.updateUserState }
              updatePassState={ this.updatePassState }
              createUser={ this.createUser }
            />
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <h1>devCache</h1>
            <p>A personalized cache of code snippets for developers.</p>
            <Login
              updateUserState={ this.updateUserState }
              updatePassState={ this.updatePassState }
              verifyUser={ this.verifyUser }
              registerUser={this.registerUser}
            />
          </React.Fragment>
      );
     }
    }
  };
};

export default App;