import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import BoardApplications from '../../components/jobBoard/boardApplications';
import NewApplicationForm from '../../components/jobBoard/newApplication';

//TODO: replace this with calls to the backend once we have actual job applications
const applications = [
  {
    id: 1,
    jobTitle: 'Software Engineer',
    company: 'Google',
    status: 'Applied',
  },
  {
    id: 3,
    jobTitle: 'Software Engineer',
    company: 'Intuit',
    status: 'Interview',
  },
  {
    id: 2,
    jobTitle: 'Backend developer',
    company: 'Spotify',
    status: 'Wishlist',
  },
  {
    id: 6,
    jobTitle: 'IOS developer ',
    company: 'Facebook',
    status: 'Applied',
  },
];
const JobBoard = () => {
  const [value, setValue] = React.useState(0);
  const [addApplication, setAddApplication] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const showNewApplicationForm = () => {
    setAddApplication(true);
  };

  const closeNewApplicationForm = () => {
    setAddApplication(false);
  };

  return (
    <main>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Applications" />
          <Tab label="Statistics" />
        </Tabs>
      </Box>
      <section style={{ margin: '20px' }}>
        <Button
          variant="contained"
          style={{ marginBottom: '20px' }}
          onClick={showNewApplicationForm}
        >
          Add application
        </Button>
        <BoardApplications applications={applications} />
      </section>
      {addApplication && (
        <NewApplicationForm closeWindow={closeNewApplicationForm} />
      )}
    </main>
  );
};

export default JobBoard;
