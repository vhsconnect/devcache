import React, { Component } from 'react'

// Import External Components
import Login from './components/login.jsx';
import Registration from './components/registration.jsx';
import Main from './components/main.jsx';

// Component Body
class App extends Component {
  constructor(props){
    super(props); 
    this.state = {
      user: "",
      pass: "",
      name: "",
      email: "",
      isLoggedIn: true, 
      register: false
    };
    this.updateFullNameState = this.updateFullNameState.bind(this);
    this.updateEmailState = this.updateEmailState.bind(this);
    this.updateUserState = this.updateUserState.bind(this);
    this.updatePassState = this.updatePassState.bind(this);
    this.createUser = this.createUser.bind(this);
    this.verifyUser = this.verifyUser.bind(this);
    this.register = this.register.bind(this);
  };

  register() {
    this.setState({ register: true })
  }

  updateFullNameState(e) {
    this.setState({ name: e.target.value });
  };

  updateEmailState(e) {
    this.setState({ email: e.target.value });
  };

  updateUserState(e) {
    this.setState({ user: e.target.value });
  };

  updatePassState(e) {
    this.setState({ pass: e.target.value });
  };

  createUser() {
    const { name, email, user, pass } = this.state;
    fetch('http://localhost:3000/signup', {
      headers: {
        "Content-Type": "application/json"
      }, 
      method: 'post',
      body: JSON.stringify({ name, email, user, pass })
    })
    .then(res =>  {
      if (res.ok) this.setState({ isLoggedIn: true });
    })
    .catch(err => console.log('err -->', err));
  }

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
    .then(res => {
      if (res.ok) this.setState({ isLoggedIn: true });
    })
    .catch(err => console.log('err -->', err));
  };

  render() {
    if (this.state.isLoggedIn) {
      return(
        <Main />
      );
    } else {
      if (this.state.register) {
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
              register={this.register}
            />
          </React.Fragment>
      );
     }
    }
  }
}

export default App;