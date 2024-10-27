// src/services/cpuService.js

import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Replace with your actual API URL

const getAllCPUs = () => {
  return axios.get(`${API_URL}/cpus`);
};

const getAllSockets = () => {
  return axios.get(`${API_URL}/sockets`);
};

const cpuService = {
  getAllCPUs,
  getAllSockets,
};

export default cpuService;

/*
// cpuService.js
import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api";

const cpuService = {
  getAllCPUs: () => axios.get(`${API_BASE_URL}/cpus`),
  getCPUById: (id) => axios.get(`${API_BASE_URL}/cpus/${id}`),
  updateCPU: (id, updatedData) => axios.put(`${API_BASE_URL}/cpus/${id}`, updatedData),
};

export default cpuService;
*/