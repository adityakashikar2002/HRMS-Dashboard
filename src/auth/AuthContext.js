// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { users } from '../data/users';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);

//   const login = (email, password) => {
//     const foundUser = users.find(u => u.email === email && u.password === password);
//     if (foundUser) {
//       setUser(foundUser);
//       localStorage.setItem('user', JSON.stringify(foundUser));
//       return true;
//     }
//     return false;
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   const updateUserAccess = (userId, newAccess) => {
//     const userIndex = users.findIndex(u => u.id === userId);
//     if (userIndex !== -1) {
//       users[userIndex].access = newAccess;
//       // If the logged in user is being updated, update the state
//       if (user && user.id === userId) {
//         setUser({ ...user, access: newAccess });
//         localStorage.setItem('user', JSON.stringify({ ...user, access: newAccess }));
//       }
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout, updateUserAccess }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, updateUserAccess } from '../data/users';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Get fresh user data from our users storage
      const currentUserData = getUsers().find(u => u.id === parsedUser.id);
      if (currentUserData) {
        setUser(currentUserData);
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const foundUser = getUsers().find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const updateUserAccessContext = (userId, newAccess) => { // Renamed to avoid confusion
    const success = updateUserAccess(userId, newAccess); // Call the imported function
    if (success && user && user.id === userId) {
    // Update current user if they modified their own access
       setUser({ ...user, access: newAccess });
       localStorage.setItem('user', JSON.stringify({ ...user, access: newAccess }));
    }

    return success;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUserAccess: updateUserAccessContext }}>
    {children}
    </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);