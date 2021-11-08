import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InfoIcon from '@mui/icons-material/Info';

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

/* Display the job applications of a job board */
const BoardApplications = () => {
  return (
    <section style={{ margin: '50px' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Job Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.jobTitle}
                </TableCell>
                <TableCell>{row.company}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <InfoIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default BoardApplications;
