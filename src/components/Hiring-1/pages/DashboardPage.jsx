import React, { useState, useEffect } from 'react';
import StatsCard from '../components/Dashboard/StatsCard';
import OfferAcceptance from '../components/Dashboard/OfferAcceptance';
import HiresBySource from '../components/Dashboard/HiresBySource';
import Calendar from '../components/Dashboard/Calendar';
import ToDoList from '../components/Dashboard/ToDoList';
import HiringPipeline from '../components/Dashboard/HiringPipeline';
import { getDashboardStats, addTodo, completeTodo } from '../utils/storage';
import '../styles/dashboard.css';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    activeJobs: 0,
    jobOpenings: 0,
    submissions: 0,
    hired: 0,
    positionsToFill: 0,
    offerAccepted: 0,
    offerRejected: 0,
    hiresBySource: {},
    hiringPipeline: [],
    todos: []
  });
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const dashboardStats = getDashboardStats();
    setStats(dashboardStats);
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        title: 'Laptop Configuration',
        description: newTodo,
        completed: false
      };
      addTodo(todo);
      setStats(prev => ({
        ...prev,
        todos: [...prev.todos, todo]
      }));
      setNewTodo('');
    }
  };

  const handleCompleteTodo = (id) => {
    completeTodo(id);
    setStats(prev => ({
      ...prev,
      todos: prev.todos.map(todo => 
        todo.id === id ? { ...todo, completed: true } : todo
      )
    }));
  };

  return (
    <div className="dashboard-container">
      <h1>Overview</h1>
      
      <div className="stats-row">
        <StatsCard title="Active Jobs" value={stats.activeJobs} />
        <StatsCard title="Job Openings" value={stats.jobOpenings} />
        <StatsCard title="Submissions" value={stats.submissions} />
        <StatsCard title="Hired" value={stats.hired} />
        <StatsCard title="Positions to fill" value={stats.positionsToFill} />
      </div>

      <div className="dashboard-grid">
        <div className="grid-item">
          <OfferAcceptance accepted={stats.offerAccepted} rejected={stats.offerRejected} />
        </div>
        
        <div className="grid-item">
          <HiresBySource data={stats.hiresBySource} />
        </div>
        
        <div className="grid-item">
          <Calendar />
        </div>
        
        <div className="grid-item">
          <ToDoList 
            todos={stats.todos} 
            onAdd={handleAddTodo} 
            newTodo={newTodo}
            setNewTodo={setNewTodo}
            onComplete={handleCompleteTodo}
          />
        </div>
        
        <div className="grid-item full-width">
          <HiringPipeline data={stats.hiringPipeline} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;