// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { registerEmployee } from '../data/users';
// import { toast } from 'react-toastify';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (password !== confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }

//     try {
//       registerEmployee(name, email, password);
//       toast.success('Registration successful! Please login');
//       navigate('/login');
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Employee Registration</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2" htmlFor="name">
//               Full Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               className="w-full px-3 py-2 border rounded-lg"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2" htmlFor="email">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="w-full px-3 py-2 border rounded-lg"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="w-full px-3 py-2 border rounded-lg"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               minLength="6"
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               className="w-full px-3 py-2 border rounded-lg"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
//           >
//             Register
//           </button>
//           <div className="mt-4 text-center">
//             <span className="text-gray-600">Already have an account? </span>
//             <button 
//               type="button"
//               className="text-blue-500 hover:underline"
//               onClick={() => navigate('/login')}
//             >
//               Login here
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerEmployee } from '../data/users';
import { getDepartments } from '../data/departments';
import { toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const depts = getDepartments();
    if (depts.length === 0) {
      toast.error('No departments available. Please contact admin.');
      navigate('/login');
    }
    setDepartments(depts);
    setDepartmentId(depts[0].id); // Set default to first department
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!departmentId) {
      toast.error('Please select a department');
      return;
    }

    try {
      registerEmployee(name, email, password, departmentId);
      toast.success('Registration successful! Please login');
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Employee Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-3 py-2 border rounded-lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="department">
              Department
            </label>
            <select
              id="department"
              className="w-full px-3 py-2 border rounded-lg"
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              required
            >
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;