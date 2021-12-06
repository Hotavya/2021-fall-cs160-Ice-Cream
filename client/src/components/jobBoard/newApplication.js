import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import axios from '../../backendConnection';
import Cookies from 'js-cookie';

import './style.css';

/* Display the job applications of a job board */
const NewJobApplication = ({
  closeWindow,
  applications,
  setApplications,
  jobBoardId,
}) => {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('APPLIED');
  const [postingLink, setPostingLink] = useState('');
  const [isSavedDisabled, setIsSavedDisabled] = useState(true);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
    enableOrDisableSaveButton();
  };

  const handleJobTitleChange = (event) => {
    setJobTitle(event.target.value);
    enableOrDisableSaveButton();
  };

  const handlePostingLinkChange = (event) => {
    setPostingLink(event.target.value);
  };

  const enableOrDisableSaveButton = () => {
    setIsSavedDisabled(
      company === '' || jobTitle === '' || company === null || jobTitle === null
    );
  };

  const saveApplication = async () => {
    try {
      // Save application to the backend
      const data = { jobTitle, company, status, postingLink };
      const response = await axios.post(
        `/jobboard/${jobBoardId}/jobapplication`,
        data,
        {
          headers: {
            authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      );

      // Add job new application to the list and close add application window
      // applications.unshift(response.data);
      setApplications([response.data.application, ...applications]);
      closeWindow();
    } catch (error) {
      alert('Something went wrong');
    }
  };
  return (
    <section>
      <div className="cover"></div>
      <div className="root">
        <div className="container">
          <h3> New application </h3>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '50ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Job title"
              variant="outlined"
              value={jobTitle}
              onChange={handleJobTitleChange}
              required
            />

            <TextField
              id="outlined-basic"
              label="Company name"
              variant="outlined"
              value={company}
              onChange={handleCompanyChange}
              required
            />

            <TextField
              id="outlined-basic"
              label="Posting link"
              variant="outlined"
              value={postingLink}
              onChange={handlePostingLinkChange}
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handleStatusChange}
              >
                <MenuItem value={'WISHLIST'}>Wishlist</MenuItem>
                <MenuItem value={'APPLIED'}>Applied</MenuItem>
                <MenuItem value={'INTERVIEWING'}>Interviewing</MenuItem>
                <MenuItem value={'OFFER'}>Offer</MenuItem>
                <MenuItem value={'REJECTED WITH INTERVIEW'}>
                  Rejected after interview
                </MenuItem>
                <MenuItem value={'REJECTED WITHOUT INTERVIEW'}>
                  Rejected w/o interview
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              disabled={isSavedDisabled}
              onClick={saveApplication}
            >
              Save
            </Button>
            <Button variant="outlined" onClick={closeWindow}>
              cancel
            </Button>
          </Stack>
        </div>
      </div>
    </section>
  );
};

export default NewJobApplication;
