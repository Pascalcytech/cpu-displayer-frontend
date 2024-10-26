// socketService.js
import axios from 'axios';

const socketService = {
  getAllSockets: () => axios.get('/api/sockets'),
  getSocketById: (id) => axios.get(`/api/sockets/${id}`),
};

export default socketService;
