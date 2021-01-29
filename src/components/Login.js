import React, { useEffect, useState } from "react";
import axios from "axios";

const initialCredentials = {
  username: '',
  password: ''
}

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState(initialCredentials);
  const [error, setError] = useState('');

  const changeHandler = event => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    })
  }

  const logIn = event => {
    event.preventDefault();
    axios.post('http://localhost:5000/api/login', credentials)
     .then(res => {
       localStorage.setItem('token', res.data.payload);
       window.location.href = '/bubblePage'
     })
     .catch(err => {
       setError(err.response.data.error);
     })
  }

  return (
    <>
      <h1>
        Welcome to the Bubble App!
        <form className = 'login-form' onSubmit = {logIn}>
          <label>Username:</label>
          <input 
          type = 'text'
          name = 'username' 
          value = {credentials.username} 
          onChange = {changeHandler} />
          <label>Password:</label>
          <input 
          type = 'password'
          name = 'password' 
          value = {credentials.password} 
          onChange = {changeHandler} />
          <button>Submit</button>
          <div>{error}</div>
        </form>
      </h1>
    </>
  );
};

export default Login;