// import { subDays, format, addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

// export const generateMockData = (timeRange = 'Day') => {
//   const today = new Date();
//   let dateRange = format(today, 'dd.MM.yyyy');
  
//   if (timeRange === 'Week') {
//     const start = startOfWeek(today);
//     const end = endOfWeek(today);
//     dateRange = `${format(start, 'dd.MM.yyyy')} - ${format(end, 'dd.MM.yyyy')}`;
//   } else if (timeRange === 'Month') {
//     const start = startOfMonth(today);
//     const end = endOfMonth(today);
//     dateRange = `${format(start, 'dd.MM.yyyy')} - ${format(end, 'dd.MM.yyyy')}`;
//   }

//   // Generate different stats based on time range
//   const rangeFactor = timeRange === 'Day' ? 1 : timeRange === 'Week' ? 7 : 30;
  
//   return {
//     stats: {
//       averageWorkingHour: `${Math.floor(8 * rangeFactor)}:${rangeFactor > 1 ? '00' : '30'}`,
//       averageInTime: `${8 + Math.floor(Math.random() * 2)}:${Math.random() > 0.5 ? '00' : '30'} AM`,
//       averageOutTime: `${5 + Math.floor(Math.random() * 3)}:${Math.random() > 0.5 ? '00' : '30'} PM`,
//       averageBreakTime: `${Math.floor(rangeFactor)}:00`,
//       workedPercentage: `${Math.floor(75 + Math.random() * 20)}.${Math.floor(Math.random() * 99)}%`,
//       workStatus: {
//         atWork: `${6 + Math.floor(Math.random() * 2 * rangeFactor)}h ${Math.random() > 0.5 ? '00' : '30'}m`,
//         idle: `${Math.floor(1 + Math.random() * rangeFactor)}h ${Math.random() > 0.5 ? '00' : '30'}m`,
//         offline: `${Math.floor(Math.random() * rangeFactor)}h ${Math.random() > 0.5 ? '00' : '30'}m`
//       },
//       attendanceSource: {
//         device: Math.floor(Math.random() * 100 * rangeFactor),
//         activeDevices: Math.floor(Math.random() * 50 * rangeFactor),
//         manual: Math.floor(Math.random() * 100 * rangeFactor),
//         app: Math.floor(Math.random() * 100 * rangeFactor),
//         inactiveDevices: Math.floor(Math.random() * 50 * rangeFactor),
//         biometric: Math.floor(Math.random() * 50 * rangeFactor)
//       },
//       overtimeStats: {
//         hours: Math.floor(Math.random() * 50 * rangeFactor),
//         employees: Math.floor(Math.random() * 10 * rangeFactor)
//       },
//       punctuality: {
//         onTime: Math.floor(70 + Math.random() * 20),
//         late: Math.floor(Math.random() * 30)
//       }
//     },
//     leaveRequests: Array.from({ length: 4 }, (_, i) => ({
//       id: i + 1,
//       date: dateRange,
//       reason: ["Sick", "Family Emergency", "Wedding", "Medical Appointment"][i] + ` (${Math.floor(1 + Math.random() * 3)} days)`,
//       status: ["Approved", "Rejected", "Pending", "Approved"][i],
//       employee: ["Jane Cooper", "John Smith", "Emily Johnson", "Michael Brown"][i],
//       days: Math.floor(1 + Math.random() * 5),
//       notes: ["Doctor's note provided", "Urgent family matter", "Personal event", "Regular checkup"][i]
//     })),
//     teamLeaves: Array.from({ length: 4 }, (_, i) => ({
//       id: i + 1,
//       date: dateRange,
//       name: ["Cristofer Sars", "Roger Geïdt", "Leo Kenter", "Lincoln Vetro"][i],
//       role: ["Executive", "React Developer", "Python Developer", "Designer"][i],
//       type: ["Leave", "Sick Leave", "Vacation", "Personal Leave"][i],
//       daysLeft: i % 2 === 0 ? `${Math.floor(1 + Math.random() * 10)} days left` : null,
//       startDate: format(subDays(today, Math.floor(Math.random() * 5)), 'dd.MM.yyyy'),
//       endDate: format(addDays(today, Math.floor(Math.random() * 5)), 'dd.MM.yyyy'),
//       reason: ["Family event", "Health issues", "Vacation", "Personal reasons"][i],
//       contact: i % 2 === 0 ? `+1 555-010-${1000 + i}` : null
//     })),
//     overtimeHistory: Array.from({ length: 4 }, (_, i) => ({
//       id: i + 1,
//       date: dateRange,
//       name: ["Alfonso Septimus", "Emerson Gouse", "Jaxson Arninoff", "Annad Bergson"][i],
//       role: ["Consultant", "Technician", "Architect", "Data Analyst"][i],
//       hours: `+ ${Math.floor(1 + Math.random() * 10)} hours`,
//       approvalStatus: ["Approved", "Pending", "Rejected", "Approved"][i],
//       reason: ["Project deadline", "Client meeting", "System maintenance", "Data processing"][i],
//       manager: ["Sarah Johnson", "Michael Brown", "Sarah Johnson", "Emily Davis"][i]
//     })),
//     attendanceOverview: Array.from({ length: 20 }, (_, i) => generateEmployee(i, timeRange)),
//     statusCounts: {
//       absent: Math.floor(Math.random() * 20 * rangeFactor),
//       present: Math.floor(Math.random() * 100 * rangeFactor),
//       weekOff: Math.floor(Math.random() * 10 * rangeFactor),
//       paidLeave: Math.floor(Math.random() * 15 * rangeFactor),
//       holiday: Math.floor(Math.random() * 5 * rangeFactor),
//       halfDay: Math.floor(Math.random() * 10 * rangeFactor),
//       unpaidLeave: Math.floor(Math.random() * 5 * rangeFactor)
//     },
//     departments: ["All Department", "Marketing", "Design", "IT", "HR", "Finance"],
//     years: ["2024", "2023", "2022", "2021"]
//   };
// };

// export const timeFilters = ["Day", "Week", "Month"];
// export const statusTypes = [
//   { code: "A", name: "Absent", color: "#FBE7E8", textColor: "#A30D11" },
//   { code: "P", name: "Present", color: "#E1F7E5", textColor: "#1F9254" },
//   { code: "We", name: "Week Off", color: "#F0F2F5", textColor: "#5F6D7E" },
//   { code: "PL", name: "Paid Leave", color: "#E5F1FB", textColor: "#0B5FFF" },
//   { code: "H", name: "Holiday", color: "#FEF2E5", textColor: "#CD6200" },
//   { code: "HD", name: "Half Day", color: "#FFF8E5", textColor: "#946200" },
//   { code: "UL", name: "Unpaid Leave", color: "#F5E5FB", textColor: "#6E0BBA" }
// ];

// const generateEmployee = (id, timeRange = 'Day') => {
//   const firstNames = ["Jane", "John", "Emily", "Michael", "Sarah", "David"];
//   const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia"];
//   const roles = ["Developer", "Manager", "Designer", "HR", "Executive", "Analyst"];
//   const depts = ["Marketing", "Design", "IT", "HR", "Finance"];
//   const devices = ["iPhone 12", "Android Device", "Biometric Scanner", "Web App", "iPad"];
//   const locations = ["Office", "Remote", "Client Site", "Field", "Home"];
  
//   const statuses = ["Present", "Absent", "Half Day"];
//   const status = statuses[Math.floor(Math.random() * statuses.length)];
  
//   return {
//     id: (100000 + id).toString(),
//     name: `${firstNames[id % firstNames.length]} ${lastNames[id % lastNames.length]}`,
//     role: roles[id % roles.length],
//     department: depts[id % depts.length],
//     status,
//     checkIn: status === "Present" || status === "Half Day" ? 
//       `${8 + Math.floor(Math.random() * 2)}:${Math.random() > 0.5 ? '00' : '30'} AM` : "00:00",
//     checkOut: status === "Present" ? 
//       `${5 + Math.floor(Math.random() * 3)}:${Math.random() > 0.5 ? '00' : '30'} PM` : 
//       (status === "Half Day" ? "01:00 PM" : "00:00"),
//     workHours: status === "Present" ? 
//       `${8 + Math.floor(Math.random() * 3)}h ${Math.random() > 0.5 ? '00' : '30'}m` :
//       (status === "Half Day" ? "4h 00m" : "0h 00m"),
//     overtime: status === "Present" && Math.random() > 0.7 ? 
//       `${Math.floor(Math.random() * 3)}h ${Math.random() > 0.5 ? '00' : '30'}m` : "0h 00m",
//     lastActivity: format(new Date(), 'hh:mm a'),
//     device: devices[Math.floor(Math.random() * devices.length)],
//     location: locations[Math.floor(Math.random() * locations.length)]
//   };
// };


import {
  subDays,
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth
} from 'date-fns';

export const generateMockData = (timeRange = 'Day') => {
  const today = new Date();
  let dateRange = format(today, 'dd.MM.yyyy');

  if (timeRange === 'Week') {
    const start = startOfWeek(today);
    const end = endOfWeek(today);
    dateRange = `${format(start, 'dd.MM.yyyy')} - ${format(end, 'dd.MM.yyyy')}`;
  } else if (timeRange === 'Month') {
    const start = startOfMonth(today);
    const end = endOfMonth(today);
    dateRange = `${format(start, 'dd.MM.yyyy')} - ${format(end, 'dd.MM.yyyy')}`;
  }

  const rangeFactor = timeRange === 'Day' ? 1 : timeRange === 'Week' ? 7 : 30;

  return {
    stats: {
      averageWorkingHour: `${Math.floor(8 * rangeFactor)}:${rangeFactor > 1 ? '00' : '30'}`,
      averageInTime: `${8 + Math.floor(Math.random() * 2)}:${Math.random() > 0.5 ? '00' : '30'} AM`,
      averageOutTime: `${5 + Math.floor(Math.random() * 3)}:${Math.random() > 0.5 ? '00' : '30'} PM`,
      averageBreakTime: `${Math.floor(rangeFactor)}:00`,
      workedPercentage: `${Math.floor(75 + Math.random() * 20)}.${Math.floor(Math.random() * 99)}%`,
      workStatus: {
        atWork: `${6 + Math.floor(Math.random() * 2 * rangeFactor)}h ${Math.random() > 0.5 ? '00' : '30'}m`,
        idle: `${Math.floor(1 + Math.random() * rangeFactor)}h ${Math.random() > 0.5 ? '00' : '30'}m`,
        offline: `${Math.floor(Math.random() * rangeFactor)}h ${Math.random() > 0.5 ? '00' : '30'}m`
      },
      attendanceSource: {
        device: Math.floor(Math.random() * 100 * rangeFactor),
        activeDevices: Math.floor(Math.random() * 50 * rangeFactor),
        manual: Math.floor(Math.random() * 100 * rangeFactor),
        app: Math.floor(Math.random() * 100 * rangeFactor),
        inactiveDevices: Math.floor(Math.random() * 50 * rangeFactor),
        biometric: Math.floor(Math.random() * 50 * rangeFactor)
      },
      overtimeStats: {
        hours: Math.floor(Math.random() * 50 * rangeFactor),
        employees: Math.floor(Math.random() * 10 * rangeFactor)
      },
      punctuality: {
        onTime: Math.floor(70 + Math.random() * 20),
        late: Math.floor(Math.random() * 30)
      }
    },

    leaveRequests: Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      date: dateRange,
      reason: ["Sick", "Family Emergency", "Wedding", "Medical Appointment", "Festival", "Personal Work"][i] +
        ` (${Math.floor(1 + Math.random() * 3)} days)`,
      status: ["Approved", "Rejected", "Pending", "Approved", "Pending", "Approved"][i],
      employee: [
        "Amit Sharma",
        "Priya Patel",
        "Rahul Verma",
        "Neha Singh",
        "Karan Mehta",
        "Anjali Nair"
      ][i],
      days: Math.floor(1 + Math.random() * 5),
      notes: [
        "Doctor's note provided",
        "Urgent family matter",
        "Sister's wedding",
        "Regular checkup",
        "Ganesh festival",
        "House shifting"
      ][i]
    })),

    teamLeaves: Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      date: dateRange,
      name: [
        "Vidya Thakre",
        "Ramesh Naik",
        "Ria Sen",
        "Sumedh Mude",
        "Niharika Deshmukh",
        "Abhishek Thakur"
      ][i],
      role: [
        "Executive",
        "React Developer",
        "Python Developer",
        "Designer",
        "Backend Engineer",
        "Product Manager"
      ][i],
      type: ["Leave", "Sick Leave", "Vacation", "Personal Leave", "Festival Leave", "Work From Home"][i],
      daysLeft: i % 2 === 0 ? `${Math.floor(1 + Math.random() * 10)} days left` : null,
      startDate: format(subDays(today, Math.floor(Math.random() * 5)), 'dd.MM.yyyy'),
      endDate: format(addDays(today, Math.floor(Math.random() * 5)), 'dd.MM.yyyy'),
      reason: [
        "Family event",
        "Health issues",
        "Vacation",
        "Personal reasons",
        "Navratri Puja",
        "Electrician visit"
      ][i],
      contact: i % 2 === 0 ? `+91 98${Math.floor(10000000 + Math.random() * 89999999)}` : null
    })),

    overtimeHistory: Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      date: dateRange,
      name: [
        "Mohit Sharma",
        "Rani Gouse",
        "Jack Sen",
        "Anand Mehra",
        "Rohit Yadav",
        "Divya Menon"
      ][i],
      role: ["Consultant", "Technician", "Architect", "Data Analyst", "ML Engineer", "Frontend Developer"][i],
      hours: `+ ${Math.floor(1 + Math.random() * 10)} hours`,
      approvalStatus: ["Approved", "Pending", "Rejected", "Approved", "Approved", "Pending"][i],
      reason: [
        "Project deadline",
        "Client meeting",
        "System maintenance",
        "Data processing",
        "Bug fixes",
        "UI revamp"
      ][i],
      manager: ["Sarah Johnson", "Michael Brown", "Anita Rao", "Emily Davis", "Kunal Das", "Neeraj Kapoor"][i]
    })),

    attendanceOverview: Array.from({ length: 30 }, (_, i) => generateEmployee(i, timeRange)),

    statusCounts: {
      absent: Math.floor(Math.random() * 20 * rangeFactor),
      present: Math.floor(Math.random() * 100 * rangeFactor),
      weekOff: Math.floor(Math.random() * 10 * rangeFactor),
      paidLeave: Math.floor(Math.random() * 15 * rangeFactor),
      holiday: Math.floor(Math.random() * 5 * rangeFactor),
      halfDay: Math.floor(Math.random() * 10 * rangeFactor),
      unpaidLeave: Math.floor(Math.random() * 5 * rangeFactor)
    },

    departments: ["All Department", "Marketing", "Design", "IT", "HR", "Finance", "Operations", "Legal"],

    years: ["2024", "2023", "2022", "2021"]
  };
};

export const timeFilters = ["Day", "Week", "Month"];

export const statusTypes = [
  { code: "A", name: "Absent", color: "#FBE7E8", textColor: "#A30D11" },
  { code: "P", name: "Present", color: "#E1F7E5", textColor: "#1F9254" },
  { code: "We", name: "Week Off", color: "#F0F2F5", textColor: "#5F6D7E" },
  { code: "PL", name: "Paid Leave", color: "#E5F1FB", textColor: "#0B5FFF" },
  { code: "H", name: "Holiday", color: "#FEF2E5", textColor: "#CD6200" },
  { code: "HD", name: "Half Day", color: "#FFF8E5", textColor: "#946200" },
  { code: "UL", name: "Unpaid Leave", color: "#F5E5FB", textColor: "#6E0BBA" }
];

const generateEmployee = (id, timeRange = 'Day') => {
  const firstNames = [
    "Amit", "Priya", "Rahul", "Neha", "Karan", "Anjali",
    "Ravi", "Sneha", "Deepak", "Pooja", "Suresh", "Kavita"
  ];
  const lastNames = [
    "Sharma", "Patel", "Verma", "Singh", "Mehta", "Nair",
    "Yadav", "Menon", "Kulkarni", "Deshmukh", "Reddy", "Kapoor"
  ];
  const roles = ["Developer", "Manager", "Designer", "HR", "Executive", "Analyst"];
  const depts = ["Marketing", "Design", "IT", "HR", "Finance"];
  const devices = ["iPhone 12", "Android Device", "Biometric Scanner", "Web App", "iPad"];
  const locations = ["Office", "Remote", "Client Site", "Field", "Home"];
  const statuses = ["Present", "Absent", "Half Day"];
  const status = statuses[Math.floor(Math.random() * statuses.length)];

  return {
    id: (100000 + id).toString(),
    name: `${firstNames[id % firstNames.length]} ${lastNames[id % lastNames.length]}`,
    role: roles[id % roles.length],
    department: depts[id % depts.length],
    status,
    checkIn: status === "Present" || status === "Half Day"
      ? `${8 + Math.floor(Math.random() * 2)}:${Math.random() > 0.5 ? '00' : '30'} AM`
      : "00:00",
    checkOut: status === "Present"
      ? `${5 + Math.floor(Math.random() * 3)}:${Math.random() > 0.5 ? '00' : '30'} PM`
      : (status === "Half Day" ? "01:00 PM" : "00:00"),
    workHours: status === "Present"
      ? `${8 + Math.floor(Math.random() * 3)}h ${Math.random() > 0.5 ? '00' : '30'}m`
      : (status === "Half Day" ? "4h 00m" : "0h 00m"),
    overtime: status === "Present" && Math.random() > 0.7
      ? `${Math.floor(Math.random() * 3)}h ${Math.random() > 0.5 ? '00' : '30'}m`
      : "0h 00m",
    lastActivity: format(new Date(), 'hh:mm a'),
    device: devices[Math.floor(Math.random() * devices.length)],
    location: locations[Math.floor(Math.random() * locations.length)]
  };
};
