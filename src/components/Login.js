import React, { useState } from 'react';
import axios from 'axios';

const initialFormValues = {
  username: '',
  password: '',
};

const Login = ({ history }) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [formValues, setFormValues] = useState(initialFormValues);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/login', formValues)
      .then((res) => {
        localStorage.setItem('token', res.data.payload);
        history.push('/bubble-page');
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  return (
    <>
      <form className='login-form' onSubmit={handleSubmit}>
        <h1>Welcome to the Bubble App!</h1>
        <label htmlFor='username'>Username:</label>
        <br />
        <input
          name='username'
          type='text'
          onChange={handleChange}
          value={formValues.username}
        />
        <br />
        <label htmlFor='password'>Password:</label>
        <br />
        <input
          name='password'
          type='text'
          onChange={handleChange}
          value={formValues.password}
        />
        <br />
        <button>Log in</button>
        {error && (
          <>
            <h2>Error: {error}</h2>
          </>
        )}
      </form>
    </>
  );
};

export default Login;