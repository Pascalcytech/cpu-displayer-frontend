import React, { useEffect, useState } from 'react';
import socketService from '../services/socketService';
import cpuService from '../services/cpuService';
import SocketDropdown from './SocketDropdown';

const CPUEdit = ({ cpuId }) => {
    const [cpu, setCpu] = useState({ brand: '', model: '', socketId: '' });
    const [sockets, setSockets] = useState([]);

    useEffect(() => {
        cpuService.getCPUById(cpuId).then(data => setCpu(data));
        socketService.getAllSockets().then(data => setSockets(data));
    }, [cpuId]);

    const handleSave = () => {
        cpuService.updateCPU(cpuId, cpu).then(() => {
            alert('CPU updated successfully!');
        });
    };

    return (
        <div>
            <h2>Edit CPU</h2>
            <form>
                <input type="text" value={cpu.brand} onChange={e => setCpu({ ...cpu, brand: e.target.value })} placeholder="Brand" />
                <input type="text" value={cpu.model} onChange={e => setCpu({ ...cpu, model: e.target.value })} placeholder="Model" />
                <SocketDropdown sockets={sockets} value={cpu.socketId} onChange={e => setCpu({ ...cpu, socketId: e.target.value })} />
                <button type="button" onClick={handleSave}>Save</button>
            </form>
        </div>
    );
};

export default CPUEdit;
