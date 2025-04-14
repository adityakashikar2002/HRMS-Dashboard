import React from 'react';
import { useAttendanceData } from './hooks/useAttendanceData';
import TimeFilters from './components/TimeFilters';
import StatusCards from './components/StatusCards';
import AttendanceStats from './components/AttendanceStats';
import LeaveRequests from './components/LeaveRequests';
import TeamLeaves from './components/TeamLeaves';
import OvertimeHistory from './components/OvertimeHistory';
import AttendanceOverview from './components/AttendanceOverview';
import CsvExporter from './components/CsvExporter';
import './styles/variables.css';
import './Attendance.css';
import './styles/animations.css';

const Attendance = () => {
  const {
    data,
    loading,
    activeFilter,
    setActiveFilter,
    selectedDepartment,
    setSelectedDepartment,
    selectedYear,
    setSelectedYear,
    refreshData
  } = useAttendanceData();

  if (!data) return <div className="loading-screen">Loading dashboard...</div>;

  return (
    <div className="attendance-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Attendance Dashboard</h1>
          <div className="header-controls">
            <CsvExporter data={data} filter={activeFilter} />
            <button className="refresh-btn" onClick={refreshData}>
              <i className="icon-refresh"></i>
            </button>
          </div>
        </div>
        
        <div className="filters-row">
          <TimeFilters 
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
          
          <div className="secondary-filters">
            <select 
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="department-filter"
            >
              {data.departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="year-filter"
            >
              {data.years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="main-content">
          <StatusCards 
            statusCounts={data.stats.statusCounts} 
            loading={loading} 
          />
          
          <AttendanceStats 
            stats={data.stats} 
            loading={loading}
          />
          
          <AttendanceOverview 
            data={data.attendanceOverview} 
            loading={loading}
          />
        </div>
        
        <div className="sidebar">
          <LeaveRequests 
            requests={data.leaveRequests} 
            loading={loading}
          />
          
          <TeamLeaves 
            leaves={data.teamLeaves} 
            loading={loading}
          />
          
          <OvertimeHistory 
            history={data.overtimeHistory} 
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Attendance;