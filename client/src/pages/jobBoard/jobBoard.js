import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BoardApplications from '../../components/jobBoard/boardApplications';
import Button from '@mui/material/Button';

const JobBoard = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <main>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Applications" />
          <Tab label="Statistics" />
        </Tabs>
      </Box>
      <BoardApplications />
    </main>
  );
};

export default JobBoard;
