import { subDays, format } from 'date-fns';

export const generateMockData = () => {
  const today = new Date();
  
  return {
    stats: {
      averageWorkingHour: "08:00",
      averageInTime: "09:00 AM",
      averageOutTime: "05:00 PM",
      averageBreakTime: "01:00",
      workedPercentage: "75.45%",
      workStatus: {
        atWork: "6h 34m",
        idle: "2h 10m",
        offline: "0h 00m"
      },
      // attendanceSource: {
      //   device: 34,
      //   activeDevices: 45,
      //   manual: 30,
      //   app: 24,
      //   inactiveDevices: 50,
      //   biometric: 10
      // },
      attendanceSource: {
        device: Math.floor(Math.random() * 100),
        activeDevices: Math.floor(Math.random() * 100),
        manual: Math.floor(Math.random() * 100),
        app: Math.floor(Math.random() * 100),
        inactiveDevices: Math.floor(Math.random() * 100),
        biometric: Math.floor(Math.random() * 100)
      },
      overtimeStats: {
        hours: 23,
        employees: 4
      },
      punctuality: {
        onTime: 68,
        late: 32
      }
    },
    leaveRequests: [
      { id: 1, date: `${format(subDays(today, 3), 'dd.MM.yyyy')} - ${format(today, 'dd.MM.yyyy')}`, reason: "Sick + 3 Days", status: "Approved" },
      { id: 2, date: `${format(subDays(today, 4), 'dd.MM.yyyy')} - ${format(today, 'dd.MM.yyyy')}`, reason: "Family Emergency + 4 Days", status: "Rejected" },
      { id: 3, date: `${format(subDays(today, 5), 'dd.MM.yyyy')} - ${format(today, 'dd.MM.yyyy')}`, reason: "Wedding + 5 Days", status: "Rejected" },
      { id: 4, date: `${format(subDays(today, 4), 'dd.MM.yyyy')} - ${format(today, 'dd.MM.yyyy')}`, reason: "Medical Appointment + 4 Days", status: "Pending" }
    ],
    teamLeaves: [
      { id: 1, date: `${format(today, 'dd.MM.yyyy')} - ${format(today, 'dd.MM.yyyy')}`, name: "Cristofer Sars", role: "Executive", type: "Leave", daysLeft: "3 days left" },
      { id: 2, date: `${format(today, 'dd.MM.yyyy')} - ${format(subDays(today, 2), 'dd.MM.yyyy')}`, name: "Roger Geïdt", role: "React Developer", type: "Leave", daysLeft: "" },
      { id: 3, date: `${format(today, 'dd.MM.yyyy')} - ${format(subDays(today, 3), 'dd.MM.yyyy')}`, name: "Leo Kenter", role: "Python Developer", type: "Leave", daysLeft: "" },
      { id: 4, date: `${format(today, 'dd.MM.yyyy')} - ${format(subDays(today, 6), 'dd.MM.yyyy')}`, name: "Lincoln Vetro", role: "Designer", type: "Leave", daysLeft: "9 days left" }
    ],
    overtimeHistory: [
      { id: 1, date: `${format(today, 'dd.MM.yyyy')} - ${format(today, 'dd.MM.yyyy')}`, name: "Alfonso Septimus", role: "Consultant", hours: "+ 3 hours" },
      { id: 2, date: format(subDays(today, 1), 'dd.MM.yyyy'), name: "Emerson Gouse", role: "Technician", hours: "+ 5 hours" },
      { id: 3, date: format(subDays(today, 3), 'dd.MM.yyyy'), name: "Jaxson Arninoff", role: "Architect", hours: "+ 10 hours" },
      { id: 4, date: format(subDays(today, 4), 'dd.MM.yyyy'), name: "Annad Bergson", role: "Data Analyst", hours: "+ 5 hours" }
    ],
    // attendanceOverview: [
    //   { id: "514684", name: "Jane Cooper", role: "Executive", department: "Marketing", status: "Present", checkIn: "09:00 AM", checkOut: "06:00 PM", workHours: "8h 00m", overtime: "0h 00m" },
    //   { id: "134570", name: "Eather Howard", role: "Manager", department: "Design", status: "Absent", checkIn: "00:00", checkOut: "00:00", workHours: "0h 00m", overtime: "0h 00m" },
    //   { id: "134571", name: "Jane Cooper", role: "Designer", department: "Design", status: "Present", checkIn: "09:00 AM", checkOut: "08:00 PM", workHours: "10h 00m", overtime: "2h 00m" },
    //   { id: "134572", name: "John Smith", role: "Developer", department: "IT", status: "Present", checkIn: "08:45 AM", checkOut: "05:30 PM", workHours: "8h 45m", overtime: "0h 45m" },
    //   { id: "134573", name: "Sarah Johnson", role: "HR Manager", department: "HR", status: "Half Day", checkIn: "09:00 AM", checkOut: "01:00 PM", workHours: "4h 00m", overtime: "0h 00m" }
    // ],
    attendanceOverview: Array.from({ length: 20 }, (_, i) => generateEmployee(i)),
    statusCounts: {
      absent: Math.floor(Math.random() * 2000),
      present: Math.floor(Math.random() * 2000),
      weekOff: Math.floor(Math.random() * 2000),
      paidLeave: Math.floor(Math.random() * 2000),
      holiday: Math.floor(Math.random() * 2000),
      halfDay: Math.floor(Math.random() * 2000),
      unpaidLeave: Math.floor(Math.random() * 2000)
    },
    departments: ["All Department", "Marketing", "Design", "IT", "HR", "Finance"],
    years: ["2024", "2023", "2022"]
  };
};

export const timeFilters = ["Day", "Week", "Month", "Custom"];
export const statusTypes = [
  { code: "A", name: "Absent", color: "#FBE7E8", textColor: "#A30D11" },
  { code: "P", name: "Present", color: "#E1F7E5", textColor: "#1F9254" },
  { code: "We", name: "Week Off", color: "#F0F2F5", textColor: "#5F6D7E" },
  { code: "PL", name: "Paid Leave", color: "#E5F1FB", textColor: "#0B5FFF" },
  { code: "H", name: "Holiday", color: "#FEF2E5", textColor: "#CD6200" },
  { code: "HD", name: "Half Day", color: "#FFF8E5", textColor: "#946200" },
  { code: "UL", name: "Unpaid Leave", color: "#F5E5FB", textColor: "#6E0BBA" }
];

const generateEmployee = (id) => {
  const firstNames = ["Jane", "John", "Emily", "Michael", "Sarah", "David"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia"];
  const roles = ["Developer", "Manager", "Designer", "HR", "Executive", "Analyst"];
  const depts = ["Marketing", "Design", "IT", "HR", "Finance"];
  
  const statuses = ["Present", "Absent", "Half Day"];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  
  return {
    id: (100000 + id).toString(),
    name: `${firstNames[id % firstNames.length]} ${lastNames[id % lastNames.length]}`,
    role: roles[id % roles.length],
    department: depts[id % depts.length],
    status,
    checkIn: status === "Present" || status === "Half Day" ? 
      `${8 + Math.floor(Math.random() * 2)}:${Math.random() > 0.5 ? '00' : '30'} AM` : "00:00",
    checkOut: status === "Present" ? 
      `${5 + Math.floor(Math.random() * 3)}:${Math.random() > 0.5 ? '00' : '30'} PM` : 
      (status === "Half Day" ? "01:00 PM" : "00:00"),
    workHours: status === "Present" ? 
      `${8 + Math.floor(Math.random() * 3)}h ${Math.random() > 0.5 ? '00' : '30'}m` :
      (status === "Half Day" ? "4h 00m" : "0h 00m"),
    overtime: status === "Present" && Math.random() > 0.7 ? 
      `${Math.floor(Math.random() * 3)}h ${Math.random() > 0.5 ? '00' : '30'}m` : "0h 00m"
  };
};