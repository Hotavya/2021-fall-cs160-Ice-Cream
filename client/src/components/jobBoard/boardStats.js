import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
} from 'recharts';

import './boardStats.css';

const COLORS = ['#FF0000', '#0088FE'];

/* Display the job applications of a job board */
const BoardStats = ({ applications }) => {
  const barChartData = getBarChartData(applications);
  const responseRateData = getResponseRateData(applications);
  const interviewSuccessRateData = getInterviewRateData(applications);
  const jobInterviewed = applications.filter((application) =>
    hasInterviewed(application)
  ).length;
  const offers = applications.filter(
    (application) => application.status === 'OFFER'
  ).length;
  return (
    <div className="flexbox-container">
      <div className="flexbox-item">
        <div className="chart-title"> Your application through stages </div>

        <BarChart
          width={400}
          height={400}
          data={barChartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </div>

      <div className="flexbox-item">
        <div className="chart-title"> Your interview response rate </div>
        <span>
          From the {applications.length} jobs applied,{' '}
          {responseRateData[1].value}% offered you an interview
        </span>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={responseRateData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {responseRateData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </div>

      <div className="flexbox-item">
        <div className="chart-title"> Your interview success rate </div>
        <span>
          From the {jobInterviewed} jobs you completed the interview, you got
          {'  '}
          {offers} offers ({interviewSuccessRateData[1].value}% success rate)
        </span>

        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={interviewSuccessRateData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {interviewSuccessRateData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default BoardStats;

function hasInterviewed(application) {
  return (
    application.status === 'OFFER' ||
    application.status === 'REJECTED WITH INTERVIEW'
  );
}
/* Get data for the bar chart */
function getBarChartData(applications) {
  const data = [
    {
      name: 'Wishlist',
      total: 0,
    },
    {
      name: 'Applied',
      total: 0,
    },
    {
      name: 'Interviewing',
      total: 0,
    },
    {
      name: 'Offer',
      total: 0,
    },
    {
      name: 'Rejected',
      total: 0,
    },
  ];

  applications.forEach((application) => {
    const stage = formatStatus(application.status);
    console.log(stage);
    data.forEach((d) => {
      if (d.name === stage) d.total++;
    });
  });

  return data;
}

function formatStatus(string) {
  const s = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  if (s.includes('Rejected')) return 'Rejected';
  return s;
}

function getResponseRateData(applications) {
  let responses = 0;
  let noResponses = 0;

  applications.forEach((application) => {
    const status = application.status;
    if (status === 'APPLIED' || status === 'REJECTED WITHOUT INTERVIEW') {
      noResponses++;
    } else if (
      status === 'INTERVIEW' ||
      status === 'OFFER' ||
      status === 'REJECTED WITH INTERVIEW'
    ) {
      responses++;
    }
  });

  const total = responses + noResponses;
  const data = [
    {
      name: 'No response',
      value: Math.round((noResponses / total) * 1000) / 10,
    },
    { name: 'Response', value: Math.round((responses / total) * 1000) / 10 },
  ];
  return data;
}

function getInterviewRateData(applications) {
  let success = 0;
  let fails = 0;

  applications.forEach((application) => {
    console.log(application.status);
    if (application.status === 'REJECTED WITH INTERVIEW') {
      fails++;
    } else if (application.status === 'OFFER') {
      success++;
    }
  });

  const total = fails + success;
  const data = [
    { name: 'Fails', value: Math.round((fails / total) * 1000) / 10 },
    { name: 'Passed', value: Math.round((success / total) * 1000) / 10 },
  ];

  return data;
}
