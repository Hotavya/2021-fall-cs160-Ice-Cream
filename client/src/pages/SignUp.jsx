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
    <body>
      <nav id="navbar">
        <div className="navbar__logo">
          {/* <!-- <i class="fas fa-bible"></i> -->
          <!-- <a href="#">Solbi</a> - */}
          Tracker |  
           

          <span className="navbar__logo__current">  Sign In</span>
        </div>

        {/* <ul className="navbar__menu">
          <li className="navbar__menu__item active" data-link="#home">Home</li>
          <li className="navbar__menu__item" data-link="#about">About</li>
          <li className="navbar__menu__item" data-link="#skills">Skills</li>
          <li className="navbar__menu__item" data-link="#work">My work</li>
          <li className="navbar__menu__item" data-link="#testimonial">Testimonial</li>
          <li className="navbar__menu__item" data-link="#contact">Contact</li>
        </ul> */}
        {/* <!-- Toggle button --> */}
        <button className="navbar__toggle_btn">
          <i className="fas fa-bars"></i>
        </button>
    </nav>
    <section id="form">
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
              {/* <h1> Welcome to Tracker!</h1> */}
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

    </section>

 
 
  </body>
  );
};

export default SignUp;