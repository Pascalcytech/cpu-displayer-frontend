// socketService.js
import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api";

const socketService = {
  getAllSockets: () => axios.get(`${API_BASE_URL}/sockets`),
  getSocketById: (id) => axios.get(`${API_BASE_URL}/sockets/${id}`),
  createSocket: (socket) => axios.post(`${API_BASE_URL}/sockets`, socket) // was missing the body as an argument...
};

export default socketService;
