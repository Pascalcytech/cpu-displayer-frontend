import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socketService from '../services/socketService';

const SocketCreate = () => {
  const [socketName, setSocketName] = useState('');  // removed unecessary variables
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newSocket = { name: socketName };
      await socketService.createSocket(newSocket);
      navigate('/'); // Redirect after successful creation
    } catch (error) {
      console.error("Error creating socket:", error);
      setError('Failed to create socket.'); // Display error message
    }
  };

  return (
    <div>
      <h1>Create New Socket</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={socketName}
          onChange={(e) => setSocketName(e.target.value)}
          placeholder="Socket Name"
          required
        />
        <button type="submit">Add Socket</button>
      </form>
    </div>
  );
};

export default SocketCreate;
