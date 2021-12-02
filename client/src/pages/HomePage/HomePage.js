import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <section className="section_all">
      <div className="hp-h1">

        Actively looking for a job?
        
      </div>
      <div className="hp-h4">
        Easily track your job application status with Tracker
      </div>

      <img src="/../../main-img.gif" alt="deskimg" class="main__pic"></img>

      <div>
        <button className="signup_button">
          <Link to="signup"> Get Started - it's free! </Link>

        </button>
        <div className="signup_inform">
            Already have an account? <Link to="login"> Login here</Link>
        </div>
      </div>
      

    </section>

  )
}

export default HomePage
