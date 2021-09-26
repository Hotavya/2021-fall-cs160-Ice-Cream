import React, { useState } from 'react';
import axios from '../backendConnection';
import './SignUp.css';

const SignUp = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const handleFormUpdate = (param) => (event) => {
    setFormValues({ ...formValues, [param]: event.target.value });
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
      alert('A field cannot be empty');
      return;
    }

    if (formValues.password !== formValues.password2) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/auth/signup', {
        email: formValues.email,
        username: formValues.username,
        password: formValues.password,
        password2: formValues.password2,
      });
      // alert(response.data);
      console.log(response.data.message);
    } catch (error) {
      // alert(error.message);
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-content-right">
        <form className="form" onSubmit={handleSubmit}>
          <h1> Welcome to Tracker!</h1>

          <div className="form-inputs">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              className="form-input"
              placeholder="Enter your username"
              onChange={handleFormUpdate('username')}
            />
          </div>

          <div className="form-inputs">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              onChange={handleFormUpdate('email')}
            />
          </div>

          <div className="form-inputs">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              onChange={handleFormUpdate('password')}
            />
          </div>

          <div className="form-inputs">
            <label htmlFor="password2" className="form-label">
              Confirm Password
            </label>
            <input
              id="password2"
              type="password"
              name="password2"
              className="form-input"
              placeholder="Re-enter your password"
              onChange={handleFormUpdate('password2')}
            />
          </div>

          <button className="form-input-btn" type="submit">
            Sign Up
          </button>
          <span className="form-input-login">
            Already have an account? Login <a href="#">here</a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
