// src/services/cpuService.js

import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Replace with your actual API URL

const getAllCPUs = () => {
  return axios.get(`${API_URL}/cpus`);
};

const getCPUById = (id) => {
  return axios.get(`${API_URL}/cpus/${id}`); // Fetch CPU by ID
};

const updateCPU = (id, cpuData) => {
  return axios.put(`${API_URL}/cpus/${id}`, cpuData); // Update CPU by ID
};

const cpuService = {
  getAllCPUs,
  getCPUById,
  updateCPU,
};

export default cpuService;
