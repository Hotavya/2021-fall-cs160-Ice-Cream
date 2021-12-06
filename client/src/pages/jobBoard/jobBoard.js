import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import BoardApplications from '../../components/jobBoard/boardApplications';
import BoardStats from '../../components/jobBoard/boardStats';
import NewApplicationForm from '../../components/jobBoard/newApplication';
import Cookies from 'js-cookie';
import axios from '../../backendConnection';
import { useHistory } from 'react-router';

import './jobBoard.css';

const JobBoard = (props) => {
  const [value, setValue] = useState(0);
  const [jobApplications, setJobApplications] = useState([]);
  const [addApplication, setAddApplication] = useState(false);
  const [boardTitle, setBoardTitle] = useState('');
  // Get board id from url
  const jobBoardId = props.match.params.id;
  let history = useHistory();

  useEffect(() => {
    const fetchJobBoards = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${Cookies.get('token')}` },
        };
        const response = await axios.get(`/jobboard/${jobBoardId}`, config);
        setJobApplications(response.data.jobBoard.jobApplications);
        setBoardTitle(response.data.jobBoard.title);
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

  const navigateHome = () => {
    history.push('/');
  };

  return (
    <section className="board-container">
      <h2>Board: {boardTitle}</h2>
      <Button onClick={navigateHome}> Your boards</Button>
      <Box sx={{ width: '50%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Applications" />
          <Tab label="Statistics" />
        </Tabs>
      </Box>

      {value === 0 && (
        <div style={{ width: '100%' }}>
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
        </div>
      )}
      {value !== 0 && <BoardStats applications={jobApplications} />}
    </section>
  );
};

export default JobBoard;
