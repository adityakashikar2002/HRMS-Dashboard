// // src/data/users.js
// const USERS_KEY = 'efficio_users';

// // Initial mock data
// const initialUsers = [
//   {
//     id: 1,
//     name: 'Admin User',
//     email: 'admin@efficio.com',
//     password: 'admin123',
//     role: 'admin',
//     access: ['dashboard', 'tasks', 'inbox', 'calendar', 'projects', 'employees', 'attendance', 'payroll', 'hiring', 'access', 'settings'],
//     avatar: 'https://storage.googleapis.com/a1aa/image/M_ndFiXb_v1UvWw1xBPEm68Oge9VVCbOhtoHGeH8y3E.jpg'
//   }
//   // No initial employees - they will register
// ];


// // Load users from localStorage or initialize with mock data
// const loadUsers = () => {
//   const storedUsers = localStorage.getItem(USERS_KEY);
//   return storedUsers ? JSON.parse(storedUsers) : [...initialUsers];
// };

// let users = loadUsers();

// // Save users to localStorage
// const saveUsers = () => {
//   localStorage.setItem(USERS_KEY, JSON.stringify(users));
// };

// export const getUsers = () => users;

// export const updateUserAccess = (userId, newAccess) => {
//   const userIndex = users.findIndex(u => u.id === userId);
//   if (userIndex !== -1) {
//     users[userIndex].access = newAccess;
//     saveUsers();
//     return true;
//   }
//   return false;
// };

// export const addAdmin = (newAdmin) => {
//   const adminCount = users.filter(u => u.role === 'admin').length;
//   if (adminCount >= 2) {
//     throw new Error('Maximum number of admins reached');
//   }
//   users.push(newAdmin);
//   saveUsers();
// };

// export const addEmployee = (newEmployee) => {
//   users.push({
//     ...newEmployee,
//     id: users.length + 1,
//     role: 'employee',
//     access: ['dashboard', 'tasks', 'inbox', 'calendar', 'projects']
//   });
//   saveUsers();
// };

// export const registerEmployee = (name, email, password) => {
//   const users = getUsers();
//   const emailExists = users.some(u => u.email === email);
//   if (emailExists) {
//     throw new Error('Email already registered');
//   }

//   const newEmployee = {
//     id: users.length + 1,
//     name,
//     email,
//     password,
//     role: 'employee',
//     access: ['dashboard', 'tasks', 'inbox', 'calendar', 'projects'], // Default access
//     avatar: `https://i.pravatar.cc/150?u=${email}` // Generate random avatar
//   };

//   users.push(newEmployee);
//   saveUsers(users);
//   return newEmployee;
// };

// // Reset to initial data if needed (for development)
// export const resetUsers = () => {
//   users = [...initialUsers];
//   saveUsers();
// };
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------


// // WORKS 24-04
// const USERS_KEY = 'efficio_users';

// // Indian names for employees
// const indianNames = [
//   "Aarav Patel", "Priya Sharma", "Rahul Singh", "Ananya Gupta", "Vikram Joshi",
//   "Neha Reddy", "Arjun Kumar", "Divya Iyer", "Rohan Malhotra", "Shreya Chatterjee",
//   "Aditya Rao", "Pooja Mehta", "Karan Verma", "Isha Nair", "Rishi Kapoor"
// ];

// // Initial mock data with Indian employees
// const initialUsers = [
//   {
//     id: 1,
//     name: "Admin User",
//     email: "admin@efficio.com",
//     password: "admin123",
//     role: "admin",
//     departmentId: null,
//     access: ['dashboard', 'tasks', 'inbox', 'calendar', 'projects', 'employees', 'attendance', 'payroll', 'hiring', 'access', 'settings'],
//     avatar: 'https://storage.googleapis.com/a1aa/image/M_ndFiXb_v1UvWw1xBPEm68Oge9VVCbOhtoHGeH8y3E.jpg'
//   },
//   // HR Department Employees
//   {
//     id: 2,
//     name: "Aarav Patel",
//     email: "aarav.hr@efficio.com",
//     password: "aarav123",
//     role: "employee",
//     departmentId: 1,
//     access: ['dashboard', 'tasks', 'inbox', 'calendar', 'employees', 'hiring', 'attendance'],
//     avatar: 'https://i.pravatar.cc/150?u=aarav.hr@efficio.com'
//   },
//   {
//     id: 3,
//     name: "Priya Sharma",
//     email: "priya.hr@efficio.com",
//     password: "priya123",
//     role: "employee",
//     departmentId: 1,
//     access: ['dashboard', 'tasks', 'inbox', 'calendar', 'employees', 'hiring'],
//     avatar: 'https://i.pravatar.cc/150?u=priya.hr@efficio.com'
//   },
//   // Finance Department Employees
//   {
//     id: 4,
//     name: "Rahul Singh",
//     email: "rahul.finance@efficio.com",
//     password: "rahul123",
//     role: "employee",
//     departmentId: 2,
//     access: ['dashboard', 'tasks', 'inbox', 'calendar', 'payroll'],
//     avatar: 'https://i.pravatar.cc/150?u=rahul.finance@efficio.com'
//   },
//   {
//     id: 5,
//     name: "Ananya Gupta",
//     email: "ananya.finance@efficio.com",
//     password: "ananya123",
//     role: "employee",
//     departmentId: 2,
//     access: ['dashboard', 'tasks', 'inbox', 'calendar', 'payroll'],
//     avatar: 'https://i.pravatar.cc/150?u=ananya.finance@efficio.com'
//   },
//   // Engineering Department Employees
//   {
//     id: 6,
//     name: "Vikram Joshi",
//     email: "vikram.eng@efficio.com",
//     password: "vikram123",
//     role: "employee",
//     departmentId: 3,
//     access: ['dashboard', 'tasks', 'inbox', 'calendar', 'projects'],
//     avatar: 'https://i.pravatar.cc/150?u=vikram.eng@efficio.com'
//   },
//   {
//     id: 7,
//     name: "Neha Reddy",
//     email: "neha.eng@efficio.com",
//     password: "neha123",
//     role: "employee",
//     departmentId: 3,
//     access: ['dashboard', 'tasks', 'inbox', 'calendar', 'projects'],
//     avatar: 'https://i.pravatar.cc/150?u=neha.eng@efficio.com'
//   }
// ];

// const loadUsers = () => {
//   const storedUsers = localStorage.getItem(USERS_KEY);
//   return storedUsers ? JSON.parse(storedUsers) : [...initialUsers];
// };

// let users = loadUsers();

// const saveUsers = () => {
//   localStorage.setItem(USERS_KEY, JSON.stringify(users));
// };

// export const getUsers = () => users;

// export const getUserById = (id) => users.find(u => u.id === id);

// export const getUsersByDepartment = (departmentId) => 
//   users.filter(u => u.departmentId === departmentId);

// export const updateUserAccess = (userId, newAccess) => {
//   const userIndex = users.findIndex(u => u.id === userId);
//   if (userIndex !== -1) {
//     users[userIndex].access = newAccess;
//     saveUsers();
//     return true;
//   }
//   return false;
// };

// export const updateUserDepartment = (userId, departmentId) => {
//   const userIndex = users.findIndex(u => u.id === userId);
//   if (userIndex !== -1) {
//     users[userIndex].departmentId = departmentId;
//     saveUsers();
//     return true;
//   }
//   return false;
// };

// export const addAdmin = (newAdmin) => {
//   const adminCount = users.filter(u => u.role === 'admin').length;
//   if (adminCount >= 2) {
//     throw new Error('Maximum number of admins reached');
//   }
//   users.push(newAdmin);
//   saveUsers();
// };

// export const addEmployee = (newEmployee) => {
//   users.push({
//     ...newEmployee,
//     id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
//     role: 'employee',
//     departmentId: null,
//     access: ['dashboard', 'tasks', 'inbox', 'calendar', 'projects']
//   });
//   saveUsers();
// };

// export const registerEmployee = (name, email, password, departmentId = null) => {
//   const users = getUsers();
//   const emailExists = users.some(u => u.email === email);
//   if (emailExists) {
//     throw new Error('Email already registered');
//   }

//   const newEmployee = {
//     id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
//     name,
//     email,
//     password,
//     role: 'employee',
//     departmentId: departmentId ? parseInt(departmentId) : null,
//     access: ['dashboard', 'tasks', 'inbox', 'calendar', 'projects'],
//     avatar: `https://i.pravatar.cc/150?u=${email}`
//   };

//   users.push(newEmployee);
//   saveUsers();
//   return newEmployee;
// };

// export const deleteUser = (id) => {
//   const index = users.findIndex(u => u.id === id);
//   if (index !== -1) {
//     users.splice(index, 1);
//     saveUsers();
//     return true;
//   }
//   return false;
// };

// export const resetUsers = () => {
//   users = [...initialUsers];
//   saveUsers();
// };

// // Add to existing exports
// export const updateDepartmentAccess = (departmentId, newAccess) => {
//   let updated = false;
//   users = users.map(u => {
//     if (u.departmentId === departmentId) {
//       updated = true;
//       return { ...u, access: newAccess };
//     }
//     return u;
//   });
//   if (updated) saveUsers();
//   return updated;
// };

// export const getDepartmentAccess = (departmentId) => {
//   const deptEmployees = users.filter(u => u.departmentId === departmentId);
//   if (deptEmployees.length === 0) return [];
  
//   // Return common access across all department employees
//   return deptEmployees[0].access.filter(access => 
//     deptEmployees.every(emp => emp.access.includes(access))
//   );
// };


const USERS_KEY = 'efficio_users';

// Indian names for employees
const indianNames = [
  "Aarav Patel", "Priya Sharma", "Rahul Singh", "Ananya Gupta", "Vikram Joshi",
  "Neha Reddy", "Arjun Kumar", "Divya Iyer", "Rohan Malhotra", "Shreya Chatterjee",
  "Aditya Rao", "Pooja Mehta", "Karan Verma", "Isha Nair", "Rishi Kapoor"
];

// Initial mock data with Indian employees
const initialUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@efficio.com",
    password: "admin123",
    role: "admin",
    departmentId: null,
    access: ['dashboard', 'tasks', 'inbox', 'calendar', 'projects', 'employees', 'attendance', 'payroll', 'hiring', 'access', 'settings'],
    avatar: 'https://storage.googleapis.com/a1aa/image/M_ndFiXb_v1UvWw1xBPEm68Oge9VVCbOhtoHGeH8y3E.jpg',
    approvalStatus: 'approved'
  },
  // HR Department Employees
  {
    id: 2,
    name: "Aarav Patel",
    email: "aarav.hr@efficio.com",
    password: "aarav123",
    role: "employee",
    departmentId: 1,
    access: ['dashboard', 'tasks', 'inbox', 'calendar', 'employees', 'hiring', 'attendance'],
    avatar: 'https://i.pravatar.cc/150?u=aarav.hr@efficio.com',
    approvalStatus: 'approved'
  },
  {
    id: 3,
    name: "Priya Sharma",
    email: "priya.hr@efficio.com",
    password: "priya123",
    role: "employee",
    departmentId: 1,
    access: ['dashboard', 'tasks', 'inbox', 'calendar', 'employees', 'hiring'],
    avatar: 'https://i.pravatar.cc/150?u=priya.hr@efficio.com',
    approvalStatus: 'approved'
  },
  // Finance Department Employees
  {
    id: 4,
    name: "Rahul Singh",
    email: "rahul.finance@efficio.com",
    password: "rahul123",
    role: "employee",
    departmentId: 2,
    access: ['dashboard', 'tasks', 'inbox', 'calendar', 'payroll'],
    avatar: 'https://i.pravatar.cc/150?u=rahul.finance@efficio.com',
    approvalStatus: 'approved'
  },
  {
    id: 5,
    name: "Ananya Gupta",
    email: "ananya.finance@efficio.com",
    password: "ananya123",
    role: "employee",
    departmentId: 2,
    access: ['dashboard', 'tasks', 'inbox', 'calendar', 'payroll'],
    avatar: 'https://i.pravatar.cc/150?u=ananya.finance@efficio.com',
    approvalStatus: 'approved'
  },
  // Engineering Department Employees
  {
    id: 6,
    name: "Vikram Joshi",
    email: "vikram.eng@efficio.com",
    password: "vikram123",
    role: "employee",
    departmentId: 3,
    access: ['dashboard', 'tasks', 'inbox', 'calendar', 'projects'],
    avatar: 'https://i.pravatar.cc/150?u=vikram.eng@efficio.com',
    approvalStatus: 'approved'
  },
  {
    id: 7,
    name: "Neha Reddy",
    email: "neha.eng@efficio.com",
    password: "neha123",
    role: "employee",
    departmentId: 3,
    access: ['dashboard', 'tasks', 'inbox', 'calendar', 'projects'],
    avatar: 'https://i.pravatar.cc/150?u=neha.eng@efficio.com',
    approvalStatus: 'approved'
  }
];

const loadUsers = () => {
  const storedUsers = localStorage.getItem(USERS_KEY);
  return storedUsers ? JSON.parse(storedUsers) : [...initialUsers];
};

let users = loadUsers();

const saveUsers = () => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getUsers = () => users;

export const getUserById = (id) => users.find(u => u.id === id);

export const getUsersByDepartment = (departmentId) => 
  users.filter(u => u.departmentId === departmentId && u.approvalStatus === 'approved');

export const updateUserAccess = (userId, newAccess) => {
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex].access = newAccess;
    saveUsers();
    return true;
  }
  return false;
};

export const updateUserDepartment = (userId, departmentId) => {
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex].departmentId = departmentId;
    saveUsers();
    return true;
  }
  return false;
};

export const addAdmin = (newAdmin) => {
  const adminCount = users.filter(u => u.role === 'admin').length;
  if (adminCount >= 2) {
    throw new Error('Maximum number of admins reached');
  }
  users.push(newAdmin);
  saveUsers();
};

export const addEmployee = (newEmployee) => {
  users.push({
    ...newEmployee,
    id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
    role: 'employee',
    departmentId: null,
    access: ['dashboard', 'tasks', 'inbox', 'calendar', 'projects']
  });
  saveUsers();
};

export const registerEmployee = (name, email, password, departmentId = null) => {
  const users = getUsers();
  const emailExists = users.some(u => u.email === email);
  if (emailExists) {
    throw new Error('Email already registered');
  }

  const newEmployee = {
    id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name,
    email,
    password,
    role: 'employee',
    registeredDepartmentId: departmentId ? parseInt(departmentId) : null, // Store separately
    departmentId: null, // Will be set after approval
    access: [], // No access until approved
    avatar: `https://i.pravatar.cc/150?u=${email}`,
    approvalStatus: 'pending' // 'pending', 'approved', 'rejected'
  };

  users.push(newEmployee);
  saveUsers();
  return newEmployee;
};

// Add new functions for approval management
export const getPendingRegistrations = () => {
  return users.filter(u => u.role === 'employee' && u.approvalStatus === 'pending');
};

export const updateApprovalStatus = (userId, status) => {
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex].approvalStatus = status;
    if (status === 'approved') {
      // Set departmentId only when approved
      users[userIndex].departmentId = users[userIndex].registeredDepartmentId;
      // Give default access when approved
      users[userIndex].access = ['dashboard', 'tasks', 'inbox', 'calendar', 'projects'];
    }
    saveUsers();
    return true;
  }
  return false;
};

export const deleteUser = (id) => {
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    saveUsers();
    return true;
  }
  return false;
};

export const resetUsers = () => {
  users = [...initialUsers];
  saveUsers();
};

// Add to existing exports
export const updateDepartmentAccess = (departmentId, newAccess) => {
  let updated = false;
  users = users.map(u => {
    if (u.departmentId === departmentId) {
      updated = true;
      return { ...u, access: newAccess };
    }
    return u;
  });
  if (updated) saveUsers();
  return updated;
};

export const getDepartmentAccess = (departmentId) => {
  const deptEmployees = users.filter(u => u.departmentId === departmentId);
  if (deptEmployees.length === 0) return [];
  
  // Return common access across all department employees
  return deptEmployees[0].access.filter(access => 
    deptEmployees.every(emp => emp.access.includes(access))
  );
};