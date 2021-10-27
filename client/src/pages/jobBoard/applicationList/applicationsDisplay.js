import React from 'react';

const applications = ['SWE', 'JJH', 'Bankers'];

const ApplicationsDisplay = () => {
  return (
    <div>
      {applications.map((application) => (
        <h2> application</h2>
      ))}
    </div>
  );
};

export default ApplicationsDisplay;
