import React, { Component } from 'react';

const Login = props => {

  return (
    <div className='login-box'>
      <input
        id='user'
        type='text'
        name='user'
        placeholder='username.'
      />
      <input
        id='pass'
        type='password'
        name='pass'
        placeholder='password.'
      />
      <button>Login.</button>
    </div>
  );
};

export default Login;