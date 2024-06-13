// src/services/prometheusService.js
import axios from 'axios';
// const BASE_URL = 'http://192.168.1.14:5000';
// const BASE_URL = 'http://10.20.0.65:5000';  
const BASE_URL = 'http://127.0.0.1:5000';  

const formatData = (response) => {
    if (response.data.status === 'success' && response.data.data.result) {
        return response.data.data.result.map(item => ({
            timestamp: new Date(item.value[0] * 1000).toLocaleTimeString(),
            value: parseFloat(item.value[1])
        }));
    }
    return [];
};

const getCpuUsage = async () => {
    const response = await axios.get(`${BASE_URL}/metrics/cpu`);
    return formatData(response);
};

const getMemoryUsage = async () => {
    const response = await axios.get(`${BASE_URL}/metrics/memory`);
    return formatData(response);
};

const getDiskUsage = async () => {
    const response = await axios.get(`${BASE_URL}/metrics/disk`);
    return formatData(response);
};

const getNetworkUsage = async () => {
    const response = await axios.get(`${BASE_URL}/metrics/network`);
    return formatData(response);
};

const getSystemLoad = async () => {
    const response = await axios.get(`${BASE_URL}/metrics/system_load`);
    return formatData(response);
};

const getUptime = async () => {
    const response = await axios.get(`${BASE_URL}/metrics/uptime`);
    return formatData(response);
};

export {
    getCpuUsage,
    getMemoryUsage,
    getDiskUsage,
    getNetworkUsage,
    getSystemLoad,
    getUptime
};
