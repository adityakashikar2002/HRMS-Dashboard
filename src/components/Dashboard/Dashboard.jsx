// WORKS LIT
import React, { useState } from 'react';
import './Dashboard.css';
import StatsCard from './StatsCard';
import AttendanceReport from './AttendanceReport';
import TaskBoard from './TaskBoard';
import { FaInfoCircle, FaTimes, FaFileExport } from 'react-icons/fa';

const Dashboard = () => {
  const [showNotification, setShowNotification] = useState(true);

  const statsData = [
    {
      title: 'Total Employees',
      value: '173',
      change: '+1.8%',
      description: '+16 from last month',
      trend: 'up'
    },
    {
      title: 'Job Applicant',
      value: '983',
      change: '+2.4%',
      description: '+32 from last month',
      trend: 'up'
    },
    {
      title: 'Total Revenue',
      value: '$4,842.00',
      change: '+2.4%',
      description: '+$5,834.00 from last month',
      trend: 'up'
    },
    {
      title: 'Attendance Rate',
      value: '75%',
      change: '-1.7%',
      description: '-6.4% from last month',
      trend: 'down'
    }
  ];

  return (
    <div className="dashboard-content p-6 bg-gray-100 min-h-screen">
      {/* Notification Bar */}
      {showNotification && (
        <div className="bg-gray border rounded-md p-4 mb-6 flex items-center justify-between shadow">
          <div className="flex items-center">
            <FaInfoCircle className="text-blue-500 mr-2" />
            <span className="text-sm text-gray-700">
              Optimize your Efficio experience—track attendance, manage teams, and streamline HR operations effortlessly!
            </span>
          </div>
          <button className="text-gray-400 hover:text-gray-600" onClick={() => setShowNotification(false)}>
            <FaTimes />
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Hello, Aditya Kashikar</h1>
          <p className="text-gray-500">Tuesday, 01 April 2025</p>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600 transition">
          <FaFileExport className="mr-2" />
          Export
        </button>
      </div>

      {/* Side-by-side section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Stats cards - takes 2/3 width on large screens */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {statsData.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>
        </div>
        
        {/* Attendance report - takes 1/3 width on large screens */}
        <div className="lg:col-span-1">
          <AttendanceReport />
        </div>
      </div>

      {/* Task board (full width below) */}
      <TaskBoard />
    </div>
  );
};

export default Dashboard;
