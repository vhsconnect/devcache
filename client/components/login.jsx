import React from 'react';

const Login = props => {
  
  return (
    <div className='login-box'>
      <input
        id='user'
        type='text'
        name='user'
        placeholder='username.'
        onChange={ props.updateUserState }
      />
      <input
        id='pass'
        type='password'
        name='pass'
        placeholder='password.'
        onChange={ props.updatePassState }
      />
      <button
        onClick={ props.verifyUser }
      >
        Login.
      </button>
      <a onClick={ props.registerUser }>Register</a> 
    </div>
  );
};

export default Login;