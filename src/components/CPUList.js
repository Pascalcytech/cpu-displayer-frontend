// src/components/CPUList.js
import React, { useEffect, useState } from 'react';
import cpuService from '../services/cpuService';
import socketService from '../services/socketService';
import { Link } from 'react-router-dom';

const CPUList = () => {
  const [cpus, setCpus] = useState([]);
  const [sockets, setSockets] = useState({}); // To cache socket names

  useEffect(() => {
    const fetchCPUs = async () => {
      try {
        const response = await cpuService.getAllCPUs();
        setCpus(response.data);
      } catch (error) {
        console.error("Error fetching CPUs:", error);
        alert("Error fetching CPUs. Please check the console for more details.");
      }
    };

    const fetchSockets = async () => {
      try {
        const response = await socketService.getAllSockets();
        // Map socket IDs to names for easier access
        const socketMap = {};
        response.data.forEach(socket => {
          socketMap[socket.id] = socket.name;
        });
        setSockets(socketMap);
      } catch (error) {
        console.error("Error fetching sockets:", error);
        alert("Error fetching sockets. Please check the console for more details.");
      }
    };

    fetchCPUs();
    fetchSockets();
  }, []);

  return (
    <div>
      <h1>List of CPUs</h1>
      <ul>
        {cpus.map(cpu => (
          <li key={cpu.id}>
            {cpu.brand} {cpu.model} - {cpu.socket ? sockets[cpu.socket.id] || 'Socket name not available' : 'Socket not assigned'}
            <Link to={`/edit/${cpu.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CPUList;
