import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import cpuService from '../services/cpuService';
import socketService from '../services/socketService';

const CPUEdit = () => {
  const { id } = useParams();
  const [cpu, setCpu] = useState({ brand: '', model: '', socket: null });
  const [sockets, setSockets] = useState([]);
  const [error, setError] = useState(''); // State for error message
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCPU = async () => {
      try {
        const response = await cpuService.getCPUById(id);
        setCpu(response.data);
      } catch (error) {
        console.error("Error fetching CPU:", error);
        setError('Failed to fetch CPU.'); // Set error message
      }
    };

    const fetchSockets = async () => {
      try {
        const response = await socketService.getAllSockets();
        setSockets(response.data);
      } catch (error) {
        console.error("Error fetching sockets:", error);
        setError('Failed to fetch sockets.'); // Set error message
      }
    };

    fetchCPU();
    fetchSockets();
  }, [id]);

  const handleSocketChange = async (event) => {
    const selectedSocketId = event.target.value;
    const selectedSocket = sockets.find(socket => socket.id === Number(selectedSocketId));
    
    if (selectedSocket) {
      setCpu({ ...cpu, socket: { id: selectedSocket.id, name: selectedSocket.name } });
    } else {
      console.error("Invalid socket selected.");
      setError('Please select a valid socket.'); // Display an error message
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate that the socket is selected
    if (!cpu.socket || !cpu.socket.id) {
        console.error("Socket is not selected.");
        setError('Please select a valid socket.'); // Display an error message
        return; // Exit the function if the validation fails
    }

    try {
        console.log("passage");
        console.log(cpu.socket.id);
        const updatedCPU = {
            brand: cpu.brand,
            model: cpu.model,
            socket: { id: Number(cpu.socket.id) } // Ensure the ID is a number
        };
        
        // Call the API to update the CPU
        await cpuService.updateCPU(id, updatedCPU);
        navigate('/'); // Redirect to CPU list after updating
    } catch (error) {
        console.error("Error updating CPU:", error);
        setError('Failed to update CPU.'); // Set error message
    }
  };

  return (
    <div>
      <h1>Edit CPU</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
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
          value={cpu.socket ? cpu.socket.id : ''}
          onChange={handleSocketChange} // Use the new change handler
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
