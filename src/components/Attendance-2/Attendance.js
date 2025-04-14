import React, { useState, useEffect } from 'react';
import { generateMockData, timeFilters, statusTypes } from './utils/data';
import { loadData, saveData } from './utils/storage';
import TimeFilters from './components/TimeFilters';
import StatusCards from './components/StatusCards';
import AttendanceStats from './components/AttendanceStats';
import LeaveRequests from './components/LeaveRequests';
import TeamLeaves from './components/TeamLeaves';
import OvertimeHistory from './components/OvertimeHistory';
import AttendanceOverview from './components/AttendanceOverview';
import DepartmentFilter from './components/DepartmentFilter';
import YearFilter from './components/YearFilter';
import './Attendance.css';

const Attendance = () => {
  const [activeFilter, setActiveFilter] = useState('Day');
  const [selectedDepartment, setSelectedDepartment] = useState('All Department');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [data, setData] = useState(generateMockData());
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    console.log("Available time filters:", timeFilters);
    console.log("Status types:", statusTypes);
  }, []);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = loadData('attendanceData');
    if (savedData) {
      setData(savedData);
    } else {
      saveData('attendanceData', generateMockData());
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    saveData('attendanceData', data);
  }, [data]);

  const handleTodayClick = () => {
    setActiveFilter('Day');
    refreshData();
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    // In a real app, you would fetch data based on the filter
  };

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      const newData = generateMockData();
      setData(newData);
      saveData('attendanceData', newData);
      setLoading(false);
      
      // Demonstrate using loading state in UI
      if (loading) {
        console.log("Data is still loading...");
      }
    }, 800);
  };

  return (
    <div className="attendance-app">
      <header>
        <h1>Attendance Status - January 2024</h1>
        <div className="header-controls">
          <DepartmentFilter 
            departments={data.departments}
            selectedDepartment={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          />
          <YearFilter 
            years={data.years}
            selectedYear={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          />
        </div>
      </header>

      <TimeFilters 
        activeFilter={activeFilter}
        setActiveFilter={handleFilterChange}
        onTodayClick={handleTodayClick}
      />

      <div className="dashboard">
        <div className="left-panel">
          <StatusCards statusCounts={data.statusCounts} loading={loading} setLoading={setLoading} />
          <AttendanceStats stats={data.stats} />
        </div>

        <div className="right-panel">
          <LeaveRequests requests={data.leaveRequests} />
          <TeamLeaves leaves={data.teamLeaves} />
          <OvertimeHistory history={data.overtimeHistory} />
        </div>
      </div>

      <AttendanceOverview data={data.attendanceOverview} />
    </div>
  );
};

export default Attendance;