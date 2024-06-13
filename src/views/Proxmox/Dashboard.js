// Dashboard.js
import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';

const Dashboard = ({ nodeStatistics, chartOptions, generateChartData }) => {
  const { cpuUsage, memoryUsage, swapUsage } = generateChartData();

  return (
    <>
      {nodeStatistics && (
        <>

          <Grid container spacing={2} mt={4}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, borderRadius: '15px', height: '300px' }}>
                <Typography variant="h6">CPU Usage</Typography>
                <Box sx={{ height: '240px' }}>
                  <Bar data={cpuUsage} options={chartOptions} />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, borderRadius: '15px', height: '300px' }}>
                <Typography variant="h6">Memory Usage</Typography>
                <Box sx={{ height: '240px' }}>
                  <Pie data={memoryUsage} options={chartOptions} />
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, borderRadius: '15px', height: '300px' }}>
                <Typography variant="h6">Swap Usage</Typography>
                <Box sx={{ height: '240px' }}>
                  <Pie data={swapUsage} options={chartOptions} />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Dashboard;
