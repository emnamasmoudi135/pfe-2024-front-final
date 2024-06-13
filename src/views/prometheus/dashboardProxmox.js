// src/views/prometheus/dashboardProxmox.js
import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { getCpuUsage, getMemoryUsage, getDiskUsage, getNetworkUsage, getSystemLoad, getUptime } from '../../services/prometheusService';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const colors = {
    primary: '#3664AD',
    secondary: '#d95ca9'
};

const DashboardProxmox = () => {
    const [cpuData, setCpuData] = useState([]);
    const [memoryData, setMemoryData] = useState([]);
    const [diskData, setDiskData] = useState([]);
    const [networkData, setNetworkData] = useState([]);
    const [systemLoadData, setSystemLoadData] = useState([]);
    const [uptimeData, setUptimeData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cpu = await getCpuUsage();
                const memory = await getMemoryUsage();
                const disk = await getDiskUsage();
                const network = await getNetworkUsage();
                const systemLoad = await getSystemLoad();
                const uptime = await getUptime();

                setCpuData(cpu);
                setMemoryData(memory);
                setDiskData(disk);
                setNetworkData(network);
                setSystemLoadData(systemLoad);
                setUptimeData(uptime);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    const createChartData = (data) => {
        return {
            labels: data.map(item => item.timestamp),
            datasets: [
                {
                    label: 'Value',
                    data: data.map(item => item.value),
                    backgroundColor: colors.primary,
                    borderColor: colors.secondary,
                    borderWidth: 1,
                },
            ],
        };
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom style={{ color: colors.primary }}>
                Proxmox Dashboard
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper>
                        <Box p={2}>
                            <Typography variant="h6" style={{ color: colors.secondary }}>CPU Usage</Typography>
                            <Bar data={createChartData(cpuData)} />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper>
                        <Box p={2}>
                            <Typography variant="h6" style={{ color: colors.secondary }}>Memory Usage</Typography>
                            <Bar data={createChartData(memoryData)} />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper>
                        <Box p={2}>
                            <Typography variant="h6" style={{ color: colors.secondary }}>Disk Usage</Typography>
                            <Bar data={createChartData(diskData)} />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper>
                        <Box p={2}>
                            <Typography variant="h6" style={{ color: colors.secondary }}>Network Usage</Typography>
                            <Bar data={createChartData(networkData)} />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper>
                        <Box p={2}>
                            <Typography variant="h6" style={{ color: colors.secondary }}>System Load</Typography>
                            <Bar data={createChartData(systemLoadData)} />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper>
                        <Box p={2}>
                            <Typography variant="h6" style={{ color: colors.secondary }}>Uptime</Typography>
                            <Bar data={createChartData(uptimeData)} />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default DashboardProxmox;
