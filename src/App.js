import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div className="app bg-gray--100">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Header />
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default App;