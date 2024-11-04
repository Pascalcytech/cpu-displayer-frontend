// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CPUList from './components/CPUList';
import CPUEdit from './components/CPUEdit';
import SocketEdit from './components/SocketEdit';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CPUList />} />
        <Route path="/edit/:id" element={<CPUEdit />} />
        <Route path="/sockets" element={<SocketEdit />} />
      </Routes>
    </Router>
  );
};

export default App;
