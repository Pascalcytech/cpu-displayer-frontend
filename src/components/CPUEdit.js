// src/components/CPUEdit.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import cpuService from '../services/cpuService';
import socketService from '../services/socketService';

const CPUEdit = () => {
  const { id } = useParams();
  const [cpu, setCpu] = useState({ brand: '', model: '', socket: {} });
  const [sockets, setSockets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCPU = async () => {
      try {
        const response = await cpuService.getCPUById(id);
        setCpu(response.data);
      } catch (error) {
        console.error("Error fetching CPU:", error);
      }
    };

    const fetchSockets = async () => {
      try {
        const response = await socketService.getAllSockets();
        setSockets(response.data); // Assuming this is an array of sockets
      } catch (error) {
        console.error("Error fetching sockets:", error);
      }
    };

    fetchCPU();
    fetchSockets();
  }, [id]); // Runs whenever the id changes

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await cpuService.updateCPU(id, cpu);
      navigate('/'); // Redirect to CPU list after updating
    } catch (error) {
      console.error("Error updating CPU:", error);
    }
  };

  return (
    <div>
      <h1>Edit CPU</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={cpu.brand}
          onChange={(e) => setCpu({ ...cpu, brand: e.target.value })}
          placeholder="Brand"
          required
        />
        <input
          type="text"
          value={cpu.model}
          onChange={(e) => setCpu({ ...cpu, model: e.target.value })}
          placeholder="Model"
          required
        />
        <select
          value={cpu.socket.id}
          onChange={(e) => setCpu({ ...cpu, socket: { id: e.target.value } })} // Assuming socket.id is a number
          required
        >
          {sockets.map(socket => (
            <option key={socket.id} value={socket.id}>
              {socket.name}
            </option>
          ))}
        </select>
        <button type="submit">Update CPU</button>
      </form>
    </div>
  );
};

export default CPUEdit;
