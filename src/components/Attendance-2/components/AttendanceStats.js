import React from 'react';
import PunctualityChart from './PunctualityChart';
import WorkStatusChart from './WorkStatusChart';
import AttendanceChart from './AttendanceChart';

const AttendanceStats = ({ stats }) => {
  if (!stats) {
    return <div className="attendance-stats">Loading statistics...</div>;
  }

  return (
    <div className="attendance-stats">
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-title">Average Working Hour</div>
          <div className="stat-value">{stats.averageWorkingHour || '--:--'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Average In Time</div>
          <div className="stat-value">{stats.averageInTime}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Average Out Time</div>
          <div className="stat-value">{stats.averageOutTime}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Average Break Time</div>
          <div className="stat-value">{stats.averageBreakTime}</div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-card large">
          <div className="stat-title">Worked</div>
          <div className="stat-value">{stats.workedPercentage || '0%'}</div>
        </div>
        
        <div className="stat-card chart-card">
          <WorkStatusChart 
            atWork={stats.workStatus?.atWork || '0h 00m'}
            idle={stats.workStatus?.idle || '0h 00m'}
            offline={stats.workStatus?.offline || '0h 00m'}
          />
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-card chart-card">
          <PunctualityChart 
            onTime={stats.punctuality?.onTime || 0}
            late={stats.punctuality?.late || 0}
          />
          
        </div>
        
        <div className="stat-card chart-card">
          <AttendanceChart attendanceSource={stats.attendanceSource} />
        </div>
      </div>
    </div>
  );
};

export default AttendanceStats;