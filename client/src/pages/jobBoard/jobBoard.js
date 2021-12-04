import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import BoardApplications from '../../components/jobBoard/boardApplications';
import NewApplicationForm from '../../components/jobBoard/newApplication';
import Cookies from 'js-cookie';
import axios from '../../backendConnection';

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
const JobBoard = (props) => {
  const [value, setValue] = useState(0);
  const [jobApplications, setJobApplications] = useState([]);
  const [addApplication, setAddApplication] = useState(false);
  // Get board id from url
  const jobBoardId = props.match.params.id;

  useEffect(() => {
    const fetchJobBoards = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${Cookies.get('token')}` },
        };
        const response = await axios.get(`/jobboard/${jobBoardId}`, config);
        setJobApplications(response.data.jobBoard.jobApplications);
      } catch (error) {
        alert('Something went wrong');
      }
    };
    fetchJobBoards();
  }, []);

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
        <BoardApplications applications={jobApplications} />
      </section>
      {addApplication && (
        <NewApplicationForm
          closeWindow={closeNewApplicationForm}
          applications={jobApplications}
          setApplications={setJobApplications}
          jobBoardId={jobBoardId}
        />
      )}
    </main>
  );
};

export default JobBoard;
