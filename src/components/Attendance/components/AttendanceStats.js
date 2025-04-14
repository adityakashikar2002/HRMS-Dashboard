import React from 'react';
import StatusCards from './StatusCards';
import PunctualityChart from './PunctualityChart';
import WorkStatusChart from './WorkStatusChart';
import AttendanceChart from './AttendanceChart';

const AttendanceStats = ({ stats, loading }) => {
  if (loading) return <div className="stats-skeleton" />;

  return (
    <div className="stats-grid">
      <div className="stats-row">
        <StatusCards
          title="Avg. Work Hours" 
          value={stats.averageWorkingHour} 
          icon="clock"
          trend="up"
          change="2.5%"
        />
        <StatusCards
          title="Avg. In Time" 
          value={stats.averageInTime} 
          icon="log-in"
        />
        <StatusCards
          title="Avg. Out Time" 
          value={stats.averageOutTime} 
          icon="log-out"
        />
        <StatusCards
          title="Avg. Break Time" 
          value={stats.averageBreakTime} 
          icon="coffee"
          trend="down"
          change="1.2%"
        />
      </div>
      
      <div className="stats-row">
        <div className="stats-col">
          <WorkStatusChart 
            atWork={stats.workStatus.atWork}
            idle={stats.workStatus.idle}
            offline={stats.workStatus.offline}
          />
        </div>
        <div className="stats-col">
          <PunctualityChart 
            onTime={stats.punctuality.onTime}
            late={stats.punctuality.late}
          />
        </div>
      </div>
      
      <div className="stats-row">
        <div className="stats-col">
          <AttendanceChart attendanceSource={stats.attendanceSource} />
        </div>
        <StatusCards
          title="Overtime This Month" 
          value={`${stats.overtimeStats.hours} hours`}
          subtitle={`${stats.overtimeStats.employees} employees`}
          icon="watch"
          large
        />
      </div>
    </div>
  );
};

export default AttendanceStats;