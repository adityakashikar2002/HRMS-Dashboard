import React from 'react';
import PunctualityChart from './PunctualityChart';
import WorkStatusChart from './WorkStatusChart';
import AttendanceChart from './AttendanceChart';

const AttendanceStats = ({ stats, timeRange }) => {
  if (!stats) {
    return <div className="attendance-stats">Loading statistics...</div>;
  }

  return (
    <div className="attendance-stats">
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-title">Average Working Hour</div>
          <div className="stat-value">{stats.averageWorkingHour || '--:--'}</div>
          <div className="stat-subtext">{timeRange} average</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Average In Time</div>
          <div className="stat-value">{stats.averageInTime}</div>
          <div className="stat-subtext">{timeRange} average</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Average Out Time</div>
          <div className="stat-value">{stats.averageOutTime}</div>
          <div className="stat-subtext">{timeRange} average</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Average Break Time</div>
          <div className="stat-value">{stats.averageBreakTime}</div>
          <div className="stat-subtext">{timeRange} average</div>
        </div>
      </div>

      <div className="stats-section">
        {/* <div className="stat-card large">
          <div className="stat-title">Worked</div>
          <div className="stat-value">{stats.workedPercentage || '0%'}</div>
          <div className="stat-subtext">of {timeRange} hours</div>
        </div> */}
        
        <div className="stat-card chart-card">
          <WorkStatusChart 
            atWork={stats.workStatus?.atWork || '0h 00m'}
            idle={stats.workStatus?.idle || '0h 00m'}
            offline={stats.workStatus?.offline || '0h 00m'}
            timeRange={timeRange}
          />
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-card chart-card ml-10">
          <PunctualityChart 
            onTime={stats.punctuality?.onTime || 0}
            late={stats.punctuality?.late || 0}
            timeRange={timeRange}
          />
          {/* <div className="overtime-box">
            <div className="stat-title">Overtime</div>
            <div className="stat-value">{stats.overtimeStats?.hours || 0} Hours</div>
            <div className="stat-subtext">{stats.overtimeStats?.employees || 0} Employees</div>
          </div> */}
        </div>
        
        <div className="stat-card chart-card">
          <AttendanceChart 
            attendanceSource={stats.attendanceSource} 
            timeRange={timeRange}
          />
        </div>
      </div>
    </div>
  );
};

export default AttendanceStats;