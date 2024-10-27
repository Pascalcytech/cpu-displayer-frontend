import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import cpuService from '../services/cpuService';
import socketService from '../services/socketService';

const CPUEdit = () => {
  const { id } = useParams();
  const [cpu, setCpu] = useState({ brand: '', model: '', socket: null }); // Initialize socket as null
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
        setSockets(response.data);
      } catch (error) {
        console.error("Error fetching sockets:", error);
      }
    };

    fetchCPU();
    fetchSockets();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Ensure to send the complete socket object
      const updatedCPU = {
        ...cpu,
        socket: { id: cpu.socket.id } // Include the current socket ID
      };
      await cpuService.updateCPU(id, updatedCPU);
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
          value={cpu.socket ? cpu.socket.id : ''} // Check if socket is defined
          onChange={(e) => setCpu({ ...cpu, socket: { id: e.target.value } })}
          required
        >
          <option value="">Select Socket</option>
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
