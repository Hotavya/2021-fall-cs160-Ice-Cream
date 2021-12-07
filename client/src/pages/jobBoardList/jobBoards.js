import axios from '../../backendConnection';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './jobBoards.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';

const JobBoards = () => {
  const [jobBoards, setJobBoards] = useState([]);
  const [newBoard, setNewBoard] = useState('');

  useEffect(() => {
    const fetchJobBoards = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${Cookies.get('token')}` },
        };
        const response = await axios.get('/jobboard', config);
        setJobBoards(response.data.jobBoards);
      } catch (error) {
        console.log(error);
        alert('Something went wrong');
      }
    };
    fetchJobBoards();
  }, []);

  const handleAddJobBoard = async () => {
    console.log(newBoard);
    if (!newBoard) return;
    const config = {
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
    };

    try {
      const response = await axios.post(
        '/jobboard',
        { title: newBoard },
        config
      );
      setJobBoards([response.data.jobBoard, ...jobBoards]);
      console.log(response.data.jobBoard);
    } catch (error) {
      alert('something went wrong');
    }
  };
  return (
    <section id="main-container">
      <h1> Your Job Boards</h1>
      <TextField
        label="New JobBoard title"
        variant="standard"
        value={newBoard}
        onChange={(e) => setNewBoard(e.target.value)}
      />
      <Button variant="contained" onClick={handleAddJobBoard}>
        Add JobBoard
      </Button>
      {jobBoards.length === 0 ? (
        <p> You do not have any jobboard yet!</p>
      ) : (
        <div>
          {jobBoards.map((jobBoard) => {
            return (
              <Link to={`jobBoard/${jobBoard._id}`} key={jobBoard._id}>
                <p id="job-board-item"> {jobBoard.title}</p>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default JobBoards;
