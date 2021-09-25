import React from 'react'
import './SignUp.css';

const SignUp = () => {
  return (
    <div className="form-container">
      <div className="form-content-right">
        <form className="form">
          <h1> Welcome to Tracker!</h1>

          <div className="form-inputs">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input id="username" type="text" name="username" className="form-input" placeholder='Enter your username' />
          </div>

          <div className="form-inputs">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input id="email" type="email" name="email" className="form-input" placeholder='Enter your email' />
          </div>

          <div className="form-inputs">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input id="password" type="password" name="password" className="form-input" placeholder='Enter your password' />
          </div>

          <div className="form-inputs">
            <label htmlFor="password2" className="form-label">
              Confirm Password
            </label>
            <input id="password2" type="password2" name="password2" className="form-input" placeholder='Re-enter your password' />
          </div>

          <button className="form-input-btn" type='submit' >
            Sign Up

          </button>
          <span className="form-input-login">
            Already have an account? Login <a href="#">here</a>
          </span>
        </form>
      </div>

    </div>


  )
}

export default SignUp