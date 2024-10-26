import React, { useEffect, useState } from 'react';
import cpuService from '../services/cpuService';

const CPUList = () => {
    const [cpus, setCpus] = useState([]);

    useEffect(() => {
        cpuService.getAllCPUs().then(data => setCpus(data));
    }, []);

    return (
        <div>
            <h2>CPU List</h2>
            <ul>
                {cpus.map(cpu => (
                    <li key={cpu.id}>{cpu.brand} {cpu.model} - Socket: {cpu.socket.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CPUList;
