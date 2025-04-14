export const formatTime = (minutes) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs}h ${mins}m`;
};

export const parseTimeString = (timeStr) => {
  const match = timeStr.match(/(\d+)h (\d+)m/);
  return match ? parseInt(match[1]) * 60 + parseInt(match[2]) : 0;
};

export const calculateDepartmentStats = (employees) => {
  const presentCount = employees.filter(e => e.status === 'Present').length;
  const absentCount = employees.filter(e => e.status === 'Absent').length;
  const total = employees.length;
  
  return {
    punctuality: {
      onTime: Math.floor((presentCount / total) * 100),
      late: Math.floor((absentCount / total) * 100)
    },
    statusCounts: {
      present: presentCount,
      absent: absentCount,
      halfDay: employees.filter(e => e.status === 'Half Day').length,
      paidLeave: Math.floor(total * 0.1),
      unpaidLeave: Math.floor(total * 0.05),
      holiday: 0,
      weekOff: Math.floor(total * 0.15)
    }
  };
};

export const generateCSVData = (data, type) => {
  switch(type) {
    case 'attendance':
      return data.attendanceOverview.map(emp => ({
        ID: emp.id,
        Name: emp.name,
        Department: emp.department,
        Status: emp.status,
        'Check In': emp.checkIn,
        'Check Out': emp.checkOut,
        'Work Hours': emp.workHours,
        Overtime: emp.overtime
      }));
    case 'leaves':
      return data.leaveRequests.map(leave => ({
        Date: leave.date,
        Employee: leave.name,
        Department: leave.department,
        Type: leave.type,
        Status: leave.status,
        Reason: leave.reason
      }));
    case 'overtime':
      return data.overtimeHistory.map(ot => ({
        Date: ot.date,
        Employee: ot.name,
        Department: ot.department,
        Hours: ot.hours
      }));
    default:
      return [];
  }
};