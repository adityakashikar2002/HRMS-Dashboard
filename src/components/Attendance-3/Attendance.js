import React, { useState, useEffect } from 'react';
import { generateMockData, timeFilters, statusTypes } from './utils/data';
import { loadData, saveData } from './utils/storage';
import { getCurrentMonthYear } from './utils/helpers';
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
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentMonthYear, setCurrentMonthYear] = useState('');

  // Initialize with current month/year
  useEffect(() => {
    setCurrentMonthYear(getCurrentMonthYear());
  }, []);

  // Load data based on filter changes
  useEffect(() => {
    const loadInitialData = () => {
      const savedData = loadData('attendanceData');
      if (savedData) {
        setData(savedData);
      } else {
        refreshData();
      }
      setLoading(false);
    };

    loadInitialData();
  }, []);

  // Refresh data when filter changes
  useEffect(() => {
    if (data) {
      refreshData();
    }
  }, [activeFilter, selectedDepartment, selectedYear]);

  const handleTodayClick = () => {
    setActiveFilter('Day');
    setSelectedYear(new Date().getFullYear().toString());
    setSelectedDepartment('All Department');
  };

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      const newData = generateMockData(activeFilter);
      // Filter by department if not "All Department"
      if (selectedDepartment !== 'All Department') {
        newData.attendanceOverview = newData.attendanceOverview.filter(
          emp => emp.department === selectedDepartment
        );
        // Update stats based on filtered data
        newData.stats = calculateFilteredStats(newData.attendanceOverview, activeFilter);
      }
      setData(newData);
      saveData('attendanceData', newData);
      setLoading(false);
    }, 800);
  };

  const calculateFilteredStats = (employees, timeRange) => {
    const rangeFactor = timeRange === 'Day' ? 1 : timeRange === 'Week' ? 7 : 30;
    const presentCount = employees.filter(e => e.status === 'Present').length;
    const absentCount = employees.filter(e => e.status === 'Absent').length;
    const halfDayCount = employees.filter(e => e.status === 'Half Day').length;
    
    return {
      ...data.stats,
      averageWorkingHour: `${Math.floor(8 * rangeFactor * (presentCount / employees.length))}:00`,
      workedPercentage: `${Math.floor((presentCount + (halfDayCount * 0.5)) / employees.length * 100)}%`,
      punctuality: {
        onTime: Math.floor(70 + Math.random() * 20),
        late: Math.floor(Math.random() * 30)
      }
    };
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  if (!data) {
    return <div className="attendance-app loading">Loading dashboard...</div>;
  }

  return (
    <div className="attendance-app">
      <header>
        <h1>Attendance Status - {currentMonthYear}</h1>
        <div className="header-controls">
          <DepartmentFilter 
            departments={data.departments}
            selectedDepartment={selectedDepartment}
            onChange={handleDepartmentChange}
          />
          {/* <YearFilter 
            years={data.years}
            selectedYear={selectedYear}
            onChange={handleYearChange}
          /> */}
        </div>
      </header>

      <TimeFilters 
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        onTodayClick={handleTodayClick}
      />

      <div className="dashboard">
        <div className="left-panel">
          <StatusCards 
            statusCounts={data.statusCounts} 
            loading={loading} 
            setLoading={setLoading}
            timeRange={activeFilter}
          />
          <AttendanceStats 
            stats={data.stats} 
            timeRange={activeFilter}
          />
        </div>

        <div className="right-panel">
          <LeaveRequests 
            requests={data.leaveRequests} 
            timeRange={activeFilter}
          />
          <TeamLeaves 
            leaves={data.teamLeaves} 
            timeRange={activeFilter}
          />
          <OvertimeHistory 
            history={data.overtimeHistory} 
            timeRange={activeFilter}
          />
        </div>
      </div>

      <AttendanceOverview 
        data={data.attendanceOverview} 
        timeRange={activeFilter}
      />
    </div>
  );
};

export default Attendance;