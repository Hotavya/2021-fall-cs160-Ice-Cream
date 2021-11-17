import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Alert from '@mui/material/Alert';
import axios from '../../backendConnection';
import './MyAccount.css';

const MyAccount = ({ saveUserToken }) => {
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
      {/* <img src="../../logo.png" alt="face" className="face_image" /> */}
      <h2 className="title">Job Application</h2>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          {/* <h1> Welcome to Tracker!</h1> */}

          <div className="form__all">
            <div className="form__left">
                <div className="form-inputs">
                    <label htmlFor="job-title" className="form-label">Job Title</label>
                    <input
                    id="job-title"
                    type="text"
                    name="job-title"
                    className="form-input"
                    placeholder="Job Title"
                    onChange={handleFormUpdate('job-title')}
                    />
                </div>
                <div className="form-inputs">
                    <label htmlFor="company" className="form-label">Company</label>
                    <input
                    id="company"
                    type="text"
                    name="company"
                    className="form-input"
                    placeholder="Company"
                    onChange={handleFormUpdate('company')}
                    />
                </div>
                <div className="form-inputs">
                    <label htmlFor="company-website" className="form-label">Company Website</label>
                    <input
                    id="company-website"
                    type="text"
                    name="company-website"
                    className="form-input"
                    placeholder="Company Website"
                    onChange={handleFormUpdate('company-website')}
                    />
                </div>
                <div className="form-inputs">
                    <label htmlFor="postURL" className="form-label">Post URL</label>
                    <input
                    id="postURL"
                    type="text"
                    name="postURL"
                    className="form-input"
                    placeholder="Post URL"
                    onChange={handleFormUpdate('postURL')}
                    />
                </div>
                <div className="form-inputs">
                    <label htmlFor="date-applied" className="form-label">Date Applied</label>
                    <input
                    id="date-applied"
                    type="date"
                    name="date-applied"
                    className="form-input"
                    placeholder="Date Applied"
                    onChange={handleFormUpdate('date-applied')}
                    />
                </div>
            </div>

            
            <div className="form__right">
                <div className="form-inputs">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select
                        id="status"
                        name="status"
                        className="form-input"
                        placeholder="Status"
                        onChange={handleFormUpdate('status')}
                    >
                        <option value="wishlist">Wishlist</option>
                        <option value="applied">Applied</option>
                        <option value="interviewing">Interviewing</option>
                        <option value="rejected">Rejected</option>
                        <option value="offer">Offer</option>
                    </select>
                </div>

                <div className="form-inputs">
                    <label htmlFor="job-description" className="form-label">Job description</label>
                    <textarea
                    id="job-description"
                    type="text"
                    name="job-description"
                    className="form-input"
                    placeholder="Job description"
                    onChange={handleFormUpdate('job-description')}
                    >
                    </textarea>
                </div>
                <div className="form-inputs">
                    <label htmlFor="note" className="form-label">Note</label>
                    <textarea
                    id="note"
                    type="text"
                    name="note"
                    className="form-input"
                    placeholder="Note"
                    onChange={handleFormUpdate('note')}
                    >
                    </textarea>
                </div>
            </div>

            {/* <div className="form__third">
                <div className="form-inputs">
                    <label htmlFor="job-description" className="form-label">Job description</label>
                    <textarea
                    id="job-description"
                    type="text"
                    name="job-description"
                    className="form-input"
                    placeholder="Job description"
                    onChange={handleFormUpdate('job-description')}
                    >
                    </textarea>
                </div>
                <div className="form-inputs">
                    <label htmlFor="note" className="form-label">Note</label>
                    <textarea
                    id="note"
                    type="text"
                    name="note"
                    className="form-input"
                    placeholder="Note"
                    onChange={handleFormUpdate('note')}
                    >
                    </textarea>
                </div>
            </div> */}
          </div>

          <button className="form-input-btn" type="submit">
            Update
          </button>
        </form>
      </div>
      {error && <Alert severity="error">{error}</Alert>}
    </section>
  );
};

export default MyAccount;
