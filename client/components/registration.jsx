import React from 'react';

const Registration = props => {

  return (
    <React.Fragment>
      <h3>devCache Registration.</h3>
      <div className='login-box'>
        <input
          id='fullname'
          type='text'
          name='fullname'
          placeholder='full name.'
          onChange={ props.updateFullNameState }
        />
        <input
          id='email'
          type='email'
          name='email'
          placeholder='email address.'
          onChange={ props.updateEmailState }
        />
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
          onClick={ props.createUser }
        >
          Submit.
        </button>
      </div>
    </React.Fragment>
  );
};

export default Registration;