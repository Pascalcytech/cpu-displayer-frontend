import React from 'react';

const SocketDropdown = ({ sockets, value, onChange }) => {
    return (
        <select value={value} onChange={onChange}>
            {sockets.map(socket => (
                <option key={socket.id} value={socket.id}>{socket.name}</option>
            ))}
        </select>
    );
};

export default SocketDropdown;
