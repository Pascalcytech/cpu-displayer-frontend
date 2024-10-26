// src/App.js
import React from 'react';
import CPUList from './components/CPUList';
import CPUEdit from './components/CPUEdit';

function App() {
  return (
    <div className="App">
      <header>
        <h1>My CPU Management App</h1>
      </header>
      <main>
        {/* Display the CPU list and editing form */}
        <CPUList />
        <CPUEdit />
      </main>
    </div>
  );
}

export default App;
