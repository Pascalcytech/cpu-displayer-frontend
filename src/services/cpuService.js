// cpuService.js
import axios from 'axios';

const cpuService = {
  getAllCPUs: () => axios.get('/api/cpus'),
  getCPUById: (id) => axios.get(`/api/cpus/${id}`),
  updateCPU: (id, updatedData) => axios.put(`/api/cpus/${id}`, updatedData),
};

export default cpuService;
