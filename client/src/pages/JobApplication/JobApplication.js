import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Alert from '@mui/material/Alert';
import axios from '../../backendConnection';
import './JobApplication.css';

const JobApplication = ({ saveUserToken }) => {
  const [formValues, setFormValues] = useState({
    job_title: '',
    company: '',
    company_website: '',
    postURL: '',
    date_applied: '',
    status: '',
    job_description: '',
    note: '',
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
      !formValues.job_title ||
      !formValues.company ||
      !formValues.company_website ||
      !formValues.postURL ||
      !formValues.date_applied ||
      !formValues.status ||
      !formValues.job_description ||
      !formValues.note 
    ) {
      setError('All field are required!');
      return;
    }

    // if (formValues.password !== formValues.password2) {
    //   setError('Passords are not matching');
    //   return;
    // }

    try {
      const response = await axios.post('/auth/signup', {
        jobTile: formValues.job_title,
        company: formValues.company,
        companyWebsite: formValues.company_website,
        postingUrl: formValues.postURL,
        status: formValues.date_applied,
        jobDescription: formValues.status,
        note: formValues.job_description,
        dateApplied: formValues.note,
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
                    <label htmlFor="job_title" className="form-label">Job Title</label>
                    <input
                    id="job_title"
                    type="text"
                    name="job_title"
                    className="form-input"
                    placeholder="Job Title"
                    onChange={handleFormUpdate('job_title')}
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
                    <label htmlFor="company_website" className="form-label">Company Website</label>
                    <input
                    id="company_website"
                    type="text"
                    name="company_website"
                    className="form-input"
                    placeholder="Company Website"
                    onChange={handleFormUpdate('company_website')}
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
                    <label htmlFor="date_applied" className="form-label">Date Applied</label>
                    <input
                    id="date_applied"
                    type="date"
                    name="date_applied"
                    className="form-input"
                    placeholder="Date Applied"
                    onChange={handleFormUpdate('date_applied')}
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
                    <label htmlFor="job_description" className="form-label">Job description</label>
                    <textarea
                    id="job_description"
                    type="text"
                    name="job_description"
                    className="form-input"
                    placeholder="Job description"
                    onChange={handleFormUpdate('job_description')}
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

export default JobApplication;
