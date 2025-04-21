// export const users = [
//     {
//       id: 1,
//       name: 'Admin User',
//       email: 'admin@efficio.com',
//       password: 'admin123',
//       role: 'admin',
//       access: ['dashboard', 'tasks', 'inbox', 'calendar', 'projects', 'employees', 'attendance', 'payroll', 'hiring', 'access'],
//       avatar: 'https://storage.googleapis.com/a1aa/image/M_ndFiXb_v1UvWw1xBPEm68Oge9VVCbOhtoHGeH8y3E.jpg'
//     },
//     {
//       id: 2,
//       name: 'Employee User',
//       email: 'employee@efficio.com',
//       password: 'employee123',
//       role: 'employee',
//       access: ['dashboard', 'tasks', 'inbox', 'calendar', 'projects'],
//       avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
//     }
//   ];
  
//   // Function to add new admin (limited to 2)
//   export const addAdmin = (newAdmin) => {
//     const adminCount = users.filter(u => u.role === 'admin').length;
//     if (adminCount >= 2) {
//       throw new Error('Maximum number of admins reached');
//     }
//     users.push(newAdmin);
//   };
  
//   // Function to add new employee
//   export const addEmployee = (newEmployee) => {
//     users.push({
//       ...newEmployee,
//       id: users.length + 1,
//       role: 'employee',
//       access: ['dashboard', 'tasks', 'inbox', 'calendar', 'projects']
//     });
//   }


//------------------------------------------------------
//-----------------------------------------------------
// const USERS_KEY = 'efficio_users';

// // Initial mock data
// const initialUsers = [
//   {
//     id: 1,
//     name: 'Admin User',
//     email: 'admin@efficio.com',
//     password: 'admin123',
//     role: 'admin',
//     access: ['dashboard', 'tasks', 'inbox', 'calendar', 'projects', 'employees', 'attendance', 'payroll', 'hiring', 'access'],
//     avatar: 'https://storage.googleapis.com/a1aa/image/M_ndFiXb_v1UvWw1xBPEm68Oge9VVCbOhtoHGeH8y3E.jpg'
//   },
//   {
//     id: 2,
//     name: 'Employee User',
//     email: 'employee@efficio.com',
//     password: 'employee123',
//     role: 'employee',
//     access: ['dashboard', 'tasks', 'inbox', 'calendar', 'projects'],
//     avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
//   }
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

// // Reset to initial data if needed (for development)
// export const resetUsers = () => {
//   users = [...initialUsers];
//   saveUsers();
// };



// src/data/users.js
const USERS_KEY = 'efficio_users';

// Initial mock data
const initialUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@efficio.com',
    password: 'admin123',
    role: 'admin',
    access: ['dashboard', 'tasks', 'inbox', 'calendar', 'projects', 'employees', 'attendance', 'payroll', 'hiring', 'access', 'settings'],
    avatar: 'https://storage.googleapis.com/a1aa/image/M_ndFiXb_v1UvWw1xBPEm68Oge9VVCbOhtoHGeH8y3E.jpg'
  }
  // No initial employees - they will register
];


// Load users from localStorage or initialize with mock data
const loadUsers = () => {
  const storedUsers = localStorage.getItem(USERS_KEY);
  return storedUsers ? JSON.parse(storedUsers) : [...initialUsers];
};

let users = loadUsers();

// Save users to localStorage
const saveUsers = () => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getUsers = () => users;

export const updateUserAccess = (userId, newAccess) => {
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex].access = newAccess;
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
    id: users.length + 1,
    role: 'employee',
    access: ['dashboard', 'tasks', 'inbox', 'calendar', 'projects']
  });
  saveUsers();
};

export const registerEmployee = (name, email, password) => {
  const users = getUsers();
  const emailExists = users.some(u => u.email === email);
  if (emailExists) {
    throw new Error('Email already registered');
  }

  const newEmployee = {
    id: users.length + 1,
    name,
    email,
    password,
    role: 'employee',
    access: ['dashboard', 'tasks', 'inbox', 'calendar', 'projects'], // Default access
    avatar: `https://i.pravatar.cc/150?u=${email}` // Generate random avatar
  };

  users.push(newEmployee);
  saveUsers(users);
  return newEmployee;
};

// Reset to initial data if needed (for development)
export const resetUsers = () => {
  users = [...initialUsers];
  saveUsers();
};