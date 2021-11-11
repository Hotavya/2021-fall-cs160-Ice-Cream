import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Alert from '@mui/material/Alert';
import axios from '../../backendConnection';
import './SignUp.css';

const SignUp = ({ saveUserToken }) => {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  // Keeps track of error message to display to user when the submit the form
  const [error, setError] = useState('');

  let history = useHistory();

  const handleFormUpdate = (param) => (event) => {
    setFormValues({ ...formValues, [param]: event.target.value });

    // Remove error message when user is typing
    if (error) setError('');
  };

  // submit form
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formValues.username ||
      !formValues.email ||
      !formValues.password ||
      !formValues.password2
    ) {
      setError('All field are required!');
      return;
    }

    if (formValues.password !== formValues.password2) {
      setError('Passords are not matching');
      return;
    }

    try {
      const response = await axios.post('/auth/signup', {
        email: formValues.email,
        username: formValues.username,
        password: formValues.password,
        password2: formValues.password2,
      });

      // Save user token
      saveUserToken(response.data.token);
      history.push('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section id="form">
      <img src="../../logo.png" alt="face" className="face_image" />
      <h2>Sign Up</h2>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          {/* <h1> Welcome to Tracker!</h1> */}
          <div className="form-inputs">
            <label htmlFor="username" className="form-label"></label>
            <input
              id="username"
              type="text"
              name="username"
              className="form-input"
              placeholder="Username"
              onChange={handleFormUpdate('username')}
            />
          </div>

          <div className="form-inputs">
            <label htmlFor="email" className="form-label"></label>
            <input
              id="email"
              type="email"
              name="email"
              className="form-input"
              placeholder="Email"
              onChange={handleFormUpdate('email')}
            />
          </div>

          <div className="form-inputs">
            <label htmlFor="password" className="form-label"></label>
            <input
              id="password"
              type="password"
              name="password"
              className="form-input"
              placeholder="Password"
              onChange={handleFormUpdate('password')}
            />
          </div>

          <div className="form-inputs">
            <label htmlFor="password2" className="form-label"></label>
            <input
              id="password2"
              type="password"
              name="password2"
              className="form-input"
              placeholder="Confirm Password"
              onChange={handleFormUpdate('password2')}
            />
          </div>

          <button className="form-input-btn" type="submit">
            Sign Up
          </button>
          <span className="form-input-login">
            Already have an account? <Link to="login"> Login here</Link>
          </span>
        </form>
      </div>
      {error && <Alert severity="error">{error}</Alert>}
    </section>
  );
};

export default SignUp;
