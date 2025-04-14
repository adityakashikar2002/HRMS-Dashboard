import { subDays, format, addDays } from 'date-fns';

// Configuration constants
const DEPARTMENTS = ['Marketing', 'Engineering', 'HR', 'Finance', 'Operations'];
const FIRST_NAMES = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez'];
const LEAVE_TYPES = ['Sick', 'Vacation', 'Personal', 'Maternity', 'Paternity', 'Bereavement'];
const LEAVE_STATUSES = ['Approved', 'Pending', 'Rejected'];
const CHECKIN_TIMES = ['08:30 AM', '09:00 AM', '09:15 AM'];
const CHECKOUT_TIMES = ['05:00 PM', '05:30 PM', '06:00 PM'];

// Role definitions per department
const DEPARTMENT_ROLES = {
  Marketing: ['CMO', 'Marketing Manager', 'Content Specialist', 'SEO Analyst'],
  Engineering: ['CTO', 'Engineering Manager', 'Senior Developer', 'Junior Developer', 'QA Engineer'],
  HR: ['HR Director', 'HR Manager', 'Recruiter', 'Compensation Specialist'],
  Finance: ['CFO', 'Financial Controller', 'Accountant', 'Financial Analyst'],
  Operations: ['COO', 'Operations Manager', 'Logistics Coordinator', 'Facilities Manager']
};

// Generate random date within last 30 days
// const randomDate = () => {
//   const daysAgo = Math.floor(Math.random() * 30);
//   return subDays(new Date(), daysAgo);
// };
const randomDate = () => {
    const daysAgo = Math.floor(Math.random() * 30);
    const date = subDays(new Date(), daysAgo);
    console.log("Generated Date:", date);
    return date.toISOString(); // or just return `date` object if formatting later
  };
  

// Generate random employee
const generateEmployee = (id) => {
  const department = DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)];
  const roles = DEPARTMENT_ROLES[department];
  const status = weightedRandomStatus();
  
  return {
    id: `EMP${1000 + id}`,
    name: `${FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]} ${LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]}`,
    department,
    role: roles[Math.floor(Math.random() * roles.length)],
    status,
    checkIn: status === 'Present' || status === 'Half Day' ? 
      CHECKIN_TIMES[Math.floor(Math.random() * CHECKIN_TIMES.length)] : '--:--',
    checkOut: status === 'Present' ? 
      CHECKOUT_TIMES[Math.floor(Math.random() * CHECKOUT_TIMES.length)] : 
      (status === 'Half Day' ? '01:00 PM' : '--:--'),
    workHours: calculateWorkHours(status),
    overtime: calculateOvertime(status)
  };
};

// Weighted random status (70% Present, 20% Absent, 10% Half Day)
const weightedRandomStatus = () => {
  const rand = Math.random();
  return rand < 0.7 ? 'Present' : rand < 0.9 ? 'Absent' : 'Half Day';
};

const calculateWorkHours = (status) => {
  if (status === 'Present') return `${8 + Math.floor(Math.random() * 2)}h ${Math.random() > 0.5 ? '00' : '30'}m`;
  if (status === 'Half Day') return '4h 00m';
  return '0h 00m';
};

const calculateOvertime = (status) => {
  if (status !== 'Present') return '0h 00m';
  return Math.random() > 0.7 ? `${Math.floor(Math.random() * 3)}h ${Math.random() > 0.5 ? '00' : '30'}m` : '0h 00m';
};

// Generate leave request
const generateLeaveRequest = (id, employees) => {
  const employee = employees[Math.floor(Math.random() * employees.length)];
  const startDate = randomDate();
  const endDate = addDays(startDate, Math.floor(Math.random() * 5) + 1);
  
  return {
    id: `LV${1000 + id}`,
    employeeId: employee.id,
    name: employee.name,
    department: employee.department,
    startDate: format(startDate, 'dd-MM-YYYY'),
    endDate: format(endDate, 'dd-MM-yyyy'),
    type: LEAVE_TYPES[Math.floor(Math.random() * LEAVE_TYPES.length)],
    status: LEAVE_STATUSES[Math.floor(Math.random() * LEAVE_STATUSES.length)],
    reason: getRandomLeaveReason()
  };
};

const getRandomLeaveReason = () => {
  const reasons = [
    'Medical appointment',
    'Family emergency',
    'Vacation time',
    'Personal matters',
    'Mental health day',
    'Doctor recommended rest'
  ];
  return reasons[Math.floor(Math.random() * reasons.length)];
};

// Generate overtime entry
const generateOvertime = (id, employees) => {
  const employee = employees[Math.floor(Math.random() * employees.length)];
  return {
    id: `OT${1000 + id}`,
    employeeId: employee.id,
    name: employee.name,
    department: employee.department,
    date: format(randomDate(), 'dd-MM-yyyy'),
    hours: Math.floor(Math.random() * 5) + 1,
    approved: Math.random() > 0.3
  };
};

// Main data generator function
export const generateMockData = () => {
  // Generate base employee data
  const employeeCount = 50;
  const employees = Array.from({ length: employeeCount }, (_, i) => generateEmployee(i));
  
  // Generate derived data
  const leaveRequests = Array.from({ length: 10 }, (_, i) => generateLeaveRequest(i, employees));
  const overtimeHistory = Array.from({ length: 15 }, (_, i) => generateOvertime(i, employees));
  
  // Calculate statistics
  const stats = calculateStatistics(employees);
  
  return {
    employees,
    leaveRequests,
    overtimeHistory,
    stats,
    departments: ['All Departments', ...DEPARTMENTS],
    years: ['2023', '2024', '2025'],
    lastUpdated: new Date().toISOString()
  };
};

// Calculate statistics from employee data
const calculateStatistics = (employees) => {
  const presentEmployees = employees.filter(e => e.status === 'Present');
  const absentEmployees = employees.filter(e => e.status === 'Absent');
  const totalEmployees = employees.length;
  
  return {
    averageWorkingHour: calculateAverageWorkingHours(presentEmployees),
    averageInTime: calculateAverageCheckIn(presentEmployees),
    averageOutTime: calculateAverageCheckOut(presentEmployees),
    averageBreakTime: '01h 00m',
    workedPercentage: `${Math.round((presentEmployees.length / totalEmployees) * 100)}%`,
    workStatus: calculateWorkStatus(presentEmployees),
    attendanceSource: calculateAttendanceSources(totalEmployees),
    punctuality: calculatePunctuality(presentEmployees),
    overtimeStats: calculateOvertimeStats(employees),
    statusCounts: {
      present: presentEmployees.length,
      absent: absentEmployees.length,
      halfDay: employees.filter(e => e.status === 'Half Day').length,
      paidLeave: Math.floor(totalEmployees * 0.1),
      unpaidLeave: Math.floor(totalEmployees * 0.05),
      holiday: 0,
      weekOff: Math.floor(totalEmployees * 0.15)
    }
  };
};

// Helper calculation functions
const calculateAverageWorkingHours = (employees) => {
  const totalMinutes = employees.reduce((sum, emp) => {
    const [hours, mins] = emp.workHours.split('h ').map(part => parseInt(part));
    return sum + (hours * 60) + mins;
  }, 0);
  
  const avgMinutes = totalMinutes / employees.length;
  const hours = Math.floor(avgMinutes / 60);
  const minutes = Math.round(avgMinutes % 60);
  return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
};

const calculateAverageCheckIn = (employees) => {
  const times = employees.map(emp => emp.checkIn).filter(Boolean);
  if (times.length === 0) return '--:--';
  
  // Simplified average calculation (in real app would parse times properly)
  return times[Math.floor(times.length / 2)];
};

const calculateAverageCheckOut = (employees) => {
  const times = employees.map(emp => emp.checkOut).filter(Boolean);
  if (times.length === 0) return '--:--';
  
  // Simplified average calculation
  return times[Math.floor(times.length / 2)];
};

const calculateWorkStatus = (employees) => {
  return {
    atWork: `${6 + Math.floor(Math.random() * 3)}h ${Math.floor(Math.random() * 60)}m`,
    idle: `${1 + Math.floor(Math.random() * 2)}h ${Math.floor(Math.random() * 60)}m`,
    offline: `${Math.floor(Math.random() * 2)}h ${Math.floor(Math.random() * 60)}m`
  };
};

const calculateAttendanceSources = (totalEmployees) => {
  const device = Math.floor(totalEmployees * 0.6);
  const app = Math.floor(totalEmployees * 0.3);
  const manual = Math.floor(totalEmployees * 0.08);
  const biometric = Math.floor(totalEmployees * 0.02);
  
  return {
    device,
    app,
    manual,
    biometric,
    activeDevices: device,
    inactiveDevices: Math.floor(device * 0.2)
  };
};

const calculatePunctuality = (employees) => {
  return {
    onTime: 70 + Math.floor(Math.random() * 20), // 70-90%
    late: 10 + Math.floor(Math.random() * 20)    // 10-30%
  };
};

const calculateOvertimeStats = (employees) => {
  const overtimeEmployees = employees.filter(emp => emp.overtime !== '0h 00m');
  const totalHours = overtimeEmployees.reduce((sum, emp) => {
    const hours = parseInt(emp.overtime.split('h')[0]);
    return sum + hours;
  }, 0);
  
  return {
    employees: overtimeEmployees.length,
    hours: totalHours
  };
};