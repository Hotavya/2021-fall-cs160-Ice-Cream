import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../backendConnection';
import Alert from '@mui/material/Alert';

import { useHistory } from 'react-router';

import './Login.css';

const Login = ({ saveUserToken }) => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  // Keeps track of error message to display to user when the submit the form
  const [error, setError] = useState('');

  // Used to change the url/history
  const history = useHistory();

  const handleFormUpdate = (param) => (event) => {
    setFormValues({ ...formValues, [param]: event.target.value });

    // Remove error message when user is typing
    if (error) setError('');
  };

  // submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formValues.email || !formValues.password) {
      setError('A field cannot be empty');
      return;
    }

    try {
      const response = await axios.post('/auth/signin', {
        email: formValues.email,
        password: formValues.password,
      });
      // Save user token
      saveUserToken(response.data.token);
      history.push('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      {/* <nav id="navbar">
        <img src="../../logo.png" alt="favicon" className="navbar__favicon" />
        <div className="navbar__logo"> */}
      {/* <!-- <i class="fas fa-bible"></i> -->
          <!-- <a href="#">Solbi</a> - */}
      {/* Tracker | */}
      {/* <span className="navbar__logo__current"> Log In</span>
        </div> */}
      {/* <ul className="navbar__menu">
          <li className="navbar__menu__item active" data-link="#home">Home</li>
          <li className="navbar__menu__item" data-link="#about">About</li>
          <li className="navbar__menu__item" data-link="#skills">Skills</li>
          <li className="navbar__menu__item" data-link="#work">My work</li>
          <li className="navbar__menu__item" data-link="#testimonial">Testimonial</li>
          <li className="navbar__menu__item" data-link="#contact">Contact</li>
        </ul> */}
      {/* <!-- Toggle button --> */}
      {/* <button className="navbar__toggle_btn">
          <i className="fas fa-bars"></i>
        </button>
      </nav> */}
      <section id="header"></section>
      <section id="form">
        <img src="../../logo.png" alt="face" className="face_image" />
        <h2>Log in</h2>
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            {/* <h1> Welcome to Tracker!</h1> */}
            <div className="form-inputs">
              <label htmlFor="email" className="form-label"></label>
              <input
                id="email"
                type="email"
                name="email"
                className="form-input"
                placeholder="email"
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

            <button className="form-input-btn" type="submit">
              Log In
            </button>
            <span className="form-input-login">
              Don't have an acount? <Link to="signup">Sign up</Link>
            </span>
          </form>
        </div>
      </section>
      {error && <Alert severity="error">{error}</Alert>}
    </div>
  );
};

export default Login;
