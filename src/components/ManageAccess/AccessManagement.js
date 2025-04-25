// // AccessManagement.js
// import React, { useState, useEffect } from 'react';
// import { getDepartments, addDepartment } from '../../data/departments';
// import { getUsersByDepartment, updateUserAccess, updateDepartmentAccess, getPendingRegistrations } from '../../data/users';
// import { toast } from 'react-toastify';
// import { motion, AnimatePresence } from 'framer-motion';
// import DepartmentForm from './DepartmentForm';
// import RegistrationApprovals from './RegistrationApprovals';
// import { FiUsers, FiClock, FiDollarSign, FiBriefcase, FiPlus, FiChevronRight, FiArrowLeft } from 'react-icons/fi';
// import { RiShieldUserLine } from 'react-icons/ri';

// const AccessManagement = () => {
//   const [departments, setDepartments] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState(null);
//   const [departmentEmployees, setDepartmentEmployees] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [accessSettings, setAccessSettings] = useState({
//     employees: false,
//     attendance: false,
//     payroll: false,
//     hiring: false
//   });
//   const [isCreatingDepartment, setIsCreatingDepartment] = useState(false);
//   const [activeTab, setActiveTab] = useState('departments');
//   const [isLoading, setIsLoading] = useState(true);
//   const [pendingRegistrationsCount, setPendingRegistrationsCount] = useState(0);

//   useEffect(() => {
//     const loadData = async () => {
//       setIsLoading(true);
//       // Simulate API loading
//       await new Promise(resolve => setTimeout(resolve, 800));
//       loadDepartments();
//       loadPendingRegistrationsCount();
//       setIsLoading(false);
//     };
//     loadData();
//   }, []);

//   const loadDepartments = () => {
//     const depts = getDepartments();
//     setDepartments(depts);
//     if (depts.length > 0 && !selectedDepartment) {
//       handleDepartmentSelect(depts[0]);
//     }
//   };

//   const loadPendingRegistrationsCount = () => {
//     const pending = getPendingRegistrations();
//     setPendingRegistrationsCount(pending.length);
//   };

//   useEffect(() => {
//     if (selectedDepartment) {
//       const employees = getUsersByDepartment(selectedDepartment.id);
//       setDepartmentEmployees(employees);
      
//       if (selectedEmployee && !employees.some(e => e.id === selectedEmployee.id)) {
//         setSelectedEmployee(null);
//       }
      
//       if (selectedEmployee) {
//         setAccessSettings({
//           employees: selectedEmployee.access.includes('employees'),
//           attendance: selectedEmployee.access.includes('attendance'),
//           payroll: selectedEmployee.access.includes('payroll'),
//           hiring: selectedEmployee.access.includes('hiring'),
//         });
//       } else {
//         const commonAccess = employees.reduce((acc, emp) => {
//           if (acc.length === 0) return emp.access;
//           return acc.filter(access => emp.access.includes(access));
//         }, []);
        
//         setAccessSettings({
//           employees: commonAccess.includes('employees'),
//           attendance: commonAccess.includes('attendance'),
//           payroll: commonAccess.includes('payroll'),
//           hiring: commonAccess.includes('hiring'),
//         });
//       }
//     }
//   }, [selectedDepartment, selectedEmployee]);

//   const handleDepartmentSelect = (dept) => {
//     setSelectedDepartment(dept);
//     setSelectedEmployee(null);
//   };

//   const handleEmployeeSelect = (employee) => {
//     setSelectedEmployee(employee);
//   };

//   const handleAccessChange = (e) => {
//     const { name, checked } = e.target;
//     setAccessSettings(prev => ({ ...prev, [name]: checked }));
//   };

//   const saveAccess = () => {
//     if (!selectedDepartment) return;

//     const defaultAccess = ['dashboard', 'tasks', 'inbox', 'calendar', 'projects'];
//     const additionalAccess = Object.entries(accessSettings)
//       .filter(([_, value]) => value)
//       .map(([key]) => key);
    
//     const newAccess = [...defaultAccess, ...additionalAccess];

//     if (selectedEmployee) {
//       updateUserAccess(selectedEmployee.id, newAccess);
//       toast.success(`Access updated for ${selectedEmployee.name}`);
//       setDepartmentEmployees(getUsersByDepartment(selectedDepartment.id));
//     } else {
//       updateDepartmentAccess(selectedDepartment.id, newAccess);
//       toast.success(`Access updated for all employees in ${selectedDepartment.name}`);
//       setDepartmentEmployees(getUsersByDepartment(selectedDepartment.id).map(emp => ({
//         ...emp,
//         access: newAccess
//       })));
//     }
//   };

//   const handleCreateDepartment = (newDepartment) => {
//     addDepartment(newDepartment);
//     loadDepartments();
//     setIsCreatingDepartment(false);
//     toast.success(`Department "${newDepartment.name}" created`);
//   };

//   const tabVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.3, ease: "easeOut" }
//     },
//     exit: { 
//       opacity: 0, 
//       y: -20,
//       transition: { duration: 0.2, ease: "easeIn" }
//     }
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.3, delay: 0.1 }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//           <motion.h2 
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="text-3xl font-bold text-gray-800 mb-4 md:mb-0"
//           >
//             Access Management
//           </motion.h2>
          
//           <motion.div 
//             className="flex space-x-2 bg-white rounded-xl p-1 shadow-sm"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//           >
//             <button
//               onClick={() => setActiveTab('departments')}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
//                 activeTab === 'departments' 
//                   ? 'bg-blue-600 text-white shadow-md' 
//                   : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
//               }`}
//             >
//               Departments
//             </button>
//             <button
//               onClick={() => {
//                 setActiveTab('approvals');
//                 loadPendingRegistrationsCount();
//               }}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative ${
//                 activeTab === 'approvals' 
//                   ? 'bg-blue-600 text-white shadow-md' 
//                   : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
//               }`}
//             >
//               Registration Approvals
//               {pendingRegistrationsCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                   {pendingRegistrationsCount}
//                 </span>
//               )}
//             </button>
//           </motion.div>
//         </div>
        
//         <AnimatePresence mode="wait">
//           {isLoading ? (
//             <motion.div
//               key="loading"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="flex justify-center items-center h-64"
//             >
//               <div className="animate-pulse flex space-x-4">
//                 <div className="rounded-full bg-blue-100 h-12 w-12"></div>
//               </div>
//             </motion.div>
//           ) : (
//             <motion.div
//               key={activeTab}
//               variants={tabVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//             >
//               {activeTab === 'departments' ? (
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                   {/* Department List */}
//                   <motion.div 
//                     className="lg:col-span-1"
//                     variants={cardVariants}
//                   >
//                     <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//                       <div className="flex justify-between items-center mb-4">
//                         <h4 className="font-semibold text-gray-700 text-lg">Departments</h4>
//                         <motion.button
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={() => setIsCreatingDepartment(true)}
//                           className="flex items-center text-sm bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-all"
//                         >
//                           <FiPlus className="mr-1" /> New
//                         </motion.button>
//                       </div>
                      
//                       <ul className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
//                         {departments.map((dept, index) => (
//                           <motion.li 
//                             key={dept.id}
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: index * 0.05 }}
//                             onClick={() => handleDepartmentSelect(dept)}
//                             className={`p-4 rounded-xl cursor-pointer transition-all group ${
//                               selectedDepartment?.id === dept.id 
//                                 ? 'bg-blue-50 border-l-4 border-blue-500 shadow-inner' 
//                                 : 'hover:bg-gray-50 hover:shadow-sm'
//                             }`}
//                           >
//                             <div className="flex justify-between items-center">
//                               <div>
//                                 <div className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
//                                   {dept.name}
//                                 </div>
//                                 <div className="text-sm text-gray-500 mt-1">
//                                   {getUsersByDepartment(dept.id).length} employees
//                                 </div>
//                               </div>
//                               <FiChevronRight className="text-gray-400 group-hover:text-blue-500 transition-colors" />
//                             </div>
//                           </motion.li>
//                         ))}
//                       </ul>
//                     </div>
//                   </motion.div>

//                   {/* Main Content */}
//                   <div className="lg:col-span-2 space-y-6">
//                     <AnimatePresence mode="wait">
//                       {isCreatingDepartment ? (
//                         <motion.div
//                           key="department-form"
//                           initial={{ opacity: 0, height: 0 }}
//                           animate={{ opacity: 1, height: 'auto' }}
//                           exit={{ opacity: 0, height: 0 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           <DepartmentForm 
//                             onCancel={() => setIsCreatingDepartment(false)}
//                             onSubmit={handleCreateDepartment}
//                           />
//                         </motion.div>
//                       ) : selectedDepartment ? (
//                         <>
//                           {/* Department Access */}
//                           <motion.div 
//                             className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
//                             variants={cardVariants}
//                           >
//                             <h3 className="text-xl font-semibold text-gray-800 mb-6">
//                               {selectedEmployee 
//                                 ? (
//                                   <div className="flex items-center">
//                                     <button 
//                                       onClick={() => setSelectedEmployee(null)}
//                                       className="mr-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
//                                     >
//                                       <FiArrowLeft className="text-gray-500" />
//                                     </button>
//                                     <span>Custom Access for <span className="text-blue-600">{selectedEmployee.name}</span></span>
//                                   </div>
//                                 )
//                                 : `Default Access for ${selectedDepartment.name} Department`
//                               }
//                             </h3>
                            
//                             <div className="mb-6">
//                               <h4 className="text-md font-medium text-gray-700 mb-3">Default Access (All Employees)</h4>
//                               <div className="flex flex-wrap gap-3 mb-6">
//                                 {['Dashboard', 'Tasks', 'Inbox', 'Calendar', 'Projects'].map(access => (
//                                   <motion.span 
//                                     key={access}
//                                     whileHover={{ y: -2 }}
//                                     className="px-3 py-1.5 bg-green-50 text-green-700 text-xs rounded-full font-medium flex items-center"
//                                   >
//                                     <RiShieldUserLine className="mr-1" /> {access}
//                                   </motion.span>
//                                 ))}
//                               </div>
                              
//                               <h4 className="text-md font-medium text-gray-700 mb-3">Additional Access</h4>
//                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 {Object.entries(accessSettings).map(([key, value]) => (
//                                   <motion.div 
//                                     key={key}
//                                     whileHover={{ y: -2 }}
//                                     className={`flex items-center p-4 rounded-xl cursor-pointer transition-all ${
//                                       value ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 hover:bg-gray-100'
//                                     }`}
//                                   >
//                                     <input
//                                       type="checkbox"
//                                       id={`access-${key}`}
//                                       name={key}
//                                       checked={value}
//                                       onChange={handleAccessChange}
//                                       className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
//                                     />
//                                     <label htmlFor={`access-${key}`} className="ml-3 capitalize text-gray-700 font-medium flex items-center">
//                                       {key === 'employees' && <FiUsers className="mr-2" />}
//                                       {key === 'attendance' && <FiClock className="mr-2" />}
//                                       {key === 'payroll' && <FiDollarSign className="mr-2" />}
//                                       {key === 'hiring' && <FiBriefcase className="mr-2" />}
//                                       {key}
//                                     </label>
//                                   </motion.div>
//                                 ))}
//                               </div>
//                             </div>

//                             <div className="flex justify-between pt-4 border-t border-gray-100">
//                               <div>
//                                 {selectedEmployee && (
//                                   <motion.button
//                                     whileHover={{ x: -2 }}
//                                     whileTap={{ scale: 0.98 }}
//                                     onClick={() => setSelectedEmployee(null)}
//                                     className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
//                                   >
//                                     <FiArrowLeft className="mr-2" /> Back to Department
//                                   </motion.button>
//                                 )}
//                               </div>
//                               <motion.button
//                                 whileHover={{ scale: 1.02 }}
//                                 whileTap={{ scale: 0.98 }}
//                                 onClick={saveAccess}
//                                 className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-md"
//                               >
//                                 {selectedEmployee ? 'Save Employee Access' : 'Save Department Access'}
//                               </motion.button>
//                             </div>
//                           </motion.div>

//                           {/* Employees List */}
//                           <motion.div 
//                             className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
//                             variants={cardVariants}
//                             transition={{ delay: 0.1 }}
//                           >
//                             <h3 className="text-lg font-semibold text-gray-800 mb-6">
//                               Employees in {selectedDepartment.name}
//                             </h3>
                            
//                             {departmentEmployees.length > 0 ? (
//                               <div className="space-y-4">
//                                 {departmentEmployees.map((emp, index) => (
//                                   <motion.div 
//                                     key={emp.id}
//                                     initial={{ opacity: 0, y: 10 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     transition={{ delay: index * 0.05 }}
//                                     onClick={() => handleEmployeeSelect(emp)}
//                                     className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
//                                       selectedEmployee?.id === emp.id
//                                         ? 'bg-blue-50 border-blue-200 shadow-inner'
//                                         : 'hover:bg-gray-50 hover:shadow-sm border-gray-100'
//                                     }`}
//                                   >
//                                     <div className="relative">
//                                       <img 
//                                         src={emp.avatar} 
//                                         alt={emp.name} 
//                                         className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-white shadow"
//                                       />
//                                       {emp.access.some(a => ['employees', 'attendance', 'payroll', 'hiring'].includes(a)) && (
//                                         <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-1 flex items-center justify-center w-5 h-5">
//                                           <RiShieldUserLine size={10} />
//                                         </div>
//                                       )}
//                                     </div>
//                                     <div className="flex-1">
//                                       <p className="font-medium text-gray-800">{emp.name}</p>
//                                       <p className="text-sm text-gray-500">{emp.email}</p>
//                                     </div>
//                                     <FiChevronRight className="text-gray-400" />
//                                   </motion.div>
//                                 ))}
//                               </div>
//                             ) : (
//                               <div className="text-center py-8">
//                                 <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                                   <FiUsers className="text-gray-400 text-3xl" />
//                                 </div>
//                                 <p className="text-gray-500">No employees in this department</p>
//                               </div>
//                             )}
//                           </motion.div>
//                         </>
//                       ) : (
//                         <motion.div 
//                           className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center"
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           transition={{ delay: 0.2 }}
//                         >
//                           <div className="mx-auto w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mb-6">
//                             <FiBriefcase className="text-blue-500 text-5xl" />
//                           </div>
//                           <h3 className="text-xl font-semibold text-gray-800 mb-2">No Department Selected</h3>
//                           <p className="text-gray-500 mb-6">Select a department from the list or create a new one to manage access permissions</p>
//                           <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => setIsCreatingDepartment(true)}
//                             className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-md"
//                           >
//                             Create New Department
//                           </motion.button>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                 </div>
//               ) : (
//                 <RegistrationApprovals 
//                   onApprovalProcessed={loadPendingRegistrationsCount}
//                 />
//               )}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default AccessManagement;



// AccessManagement.js
import React, { useState, useEffect } from 'react';
import { getDepartments, addDepartment } from '../../data/departments';
import { getUsersByDepartment, updateUserAccess, updateDepartmentAccess, getPendingRegistrations } from '../../data/users';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import DepartmentForm from './DepartmentForm';
import RegistrationApprovals from './RegistrationApprovals';
import { 
  FiUsers, 
  FiClock, 
  FiDollarSign, 
  FiBriefcase, 
  FiPlus, 
  FiChevronRight, 
  FiArrowLeft,
  FiUser,
  FiSettings,
  FiLock,
  FiCheckCircle,
  FiMail
} from 'react-icons/fi';
import { RiShieldUserLine, RiTeamLine } from 'react-icons/ri';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BsGraphUp, BsCalendarCheck } from 'react-icons/bs';

const AccessManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departmentEmployees, setDepartmentEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [accessSettings, setAccessSettings] = useState({
    employees: false,
    attendance: false,
    payroll: false,
    hiring: false
  });
  const [isCreatingDepartment, setIsCreatingDepartment] = useState(false);
  const [activeTab, setActiveTab] = useState('departments');
  const [isLoading, setIsLoading] = useState(true);
  const [pendingRegistrationsCount, setPendingRegistrationsCount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      loadDepartments();
      loadPendingRegistrationsCount();
      setIsLoading(false);
    };
    loadData();
  }, []);

  const loadDepartments = () => {
    const depts = getDepartments();
    setDepartments(depts);
    if (depts.length > 0 && !selectedDepartment) {
      handleDepartmentSelect(depts[0]);
    }
  };

  const loadPendingRegistrationsCount = () => {
    const pending = getPendingRegistrations();
    setPendingRegistrationsCount(pending.length);
  };

  useEffect(() => {
    if (selectedDepartment) {
      const employees = getUsersByDepartment(selectedDepartment.id);
      setDepartmentEmployees(employees);
      
      if (selectedEmployee && !employees.some(e => e.id === selectedEmployee.id)) {
        setSelectedEmployee(null);
      }
      
      if (selectedEmployee) {
        setAccessSettings({
          employees: selectedEmployee.access.includes('employees'),
          attendance: selectedEmployee.access.includes('attendance'),
          payroll: selectedEmployee.access.includes('payroll'),
          hiring: selectedEmployee.access.includes('hiring'),
        });
      } else {
        const commonAccess = employees.reduce((acc, emp) => {
          if (acc.length === 0) return emp.access;
          return acc.filter(access => emp.access.includes(access));
        }, []);
        
        setAccessSettings({
          employees: commonAccess.includes('employees'),
          attendance: commonAccess.includes('attendance'),
          payroll: commonAccess.includes('payroll'),
          hiring: commonAccess.includes('hiring'),
        });
      }
    }
  }, [selectedDepartment, selectedEmployee]);

  const handleDepartmentSelect = (dept) => {
    setSelectedDepartment(dept);
    setSelectedEmployee(null);
  };

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleAccessChange = (e) => {
    const { name, checked } = e.target;
    setAccessSettings(prev => ({ ...prev, [name]: checked }));
  };

  const saveAccess = () => {
    if (!selectedDepartment) return;

    const defaultAccess = ['dashboard', 'tasks', 'inbox', 'calendar', 'projects'];
    const additionalAccess = Object.entries(accessSettings)
      .filter(([_, value]) => value)
      .map(([key]) => key);
    
    const newAccess = [...defaultAccess, ...additionalAccess];

    if (selectedEmployee) {
      updateUserAccess(selectedEmployee.id, newAccess);
      toast.success(`Access updated for ${selectedEmployee.name}`);
      setDepartmentEmployees(getUsersByDepartment(selectedDepartment.id));
    } else {
      updateDepartmentAccess(selectedDepartment.id, newAccess);
      toast.success(`Access updated for all employees in ${selectedDepartment.name}`);
      setDepartmentEmployees(getUsersByDepartment(selectedDepartment.id).map(emp => ({
        ...emp,
        access: newAccess
      })));
    }
  };

  const handleCreateDepartment = (newDepartment) => {
    addDepartment(newDepartment);
    loadDepartments();
    setIsCreatingDepartment(false);
    toast.success(`Department "${newDepartment.name}" created`);
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: 0.1 }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-1">Access Management</h2>
            <p className="text-gray-500">Control and manage user permissions across departments</p>
          </div>
          
          <motion.div 
            className="flex space-x-2 bg-white rounded-xl p-1 shadow-sm border border-gray-200 mt-4 md:mt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => setActiveTab('departments')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
                activeTab === 'departments' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <RiTeamLine className="mr-2" /> Departments
            </button>
            <button
              onClick={() => {
                setActiveTab('approvals');
                loadPendingRegistrationsCount();
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative flex items-center ${
                activeTab === 'approvals' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <IoMdNotificationsOutline className="mr-2" /> Approvals
              {pendingRegistrationsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {pendingRegistrationsCount}
                </span>
              )}
            </button>
          </motion.div>
        </motion.div>
        
        {/* Main Content */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500">Loading access data...</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {activeTab === 'departments' ? (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
                  {/* Department List Sidebar */}
                  <motion.div 
                    className="lg:col-span-1 bg-gray-50 border-r border-gray-200"
                    variants={cardVariants}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h4 className="font-semibold text-gray-700 text-lg flex items-center">
                          <RiTeamLine className="mr-2 text-blue-500" /> Departments
                        </h4>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsCreatingDepartment(true)}
                          className="flex items-center text-sm bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-2 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-sm"
                        >
                          <FiPlus className="mr-1" /> New
                        </motion.button>
                      </div>
                      
                      <div className="relative mb-4">
                        <input
                          type="text"
                          placeholder="Search departments..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                        <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      
                      <ul className="space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
                        {departments.map((dept, index) => (
                          <motion.li 
                            key={dept.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleDepartmentSelect(dept)}
                            className={`p-4 rounded-xl cursor-pointer transition-all group flex items-center ${
                              selectedDepartment?.id === dept.id 
                                ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 shadow-inner' 
                                : 'hover:bg-gray-100 hover:shadow-sm'
                            }`}
                          >
                            <div className="flex-shrink-0 mr-3">
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                <FiBriefcase className="text-lg" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors truncate">
                                {dept.name}
                              </div>
                              <div className="text-sm text-gray-500 mt-1 flex items-center">
                                <FiUser className="mr-1" /> {getUsersByDepartment(dept.id).length} members
                              </div>
                            </div>
                            <FiChevronRight className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Main Content Area */}
                  <div className="lg:col-span-3 p-6">
                    <AnimatePresence mode="wait">
                      {isCreatingDepartment ? (
                        <motion.div
                          key="department-form"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mb-6"
                        >
                          <DepartmentForm 
                            onCancel={() => setIsCreatingDepartment(false)}
                            onSubmit={handleCreateDepartment}
                          />
                        </motion.div>
                      ) : selectedDepartment ? (
                        <>
                          {/* Department Header */}
                          <motion.div 
                            className="mb-6"
                            variants={fadeIn}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                                  {selectedEmployee ? (
                                    <>
                                      <button 
                                        onClick={() => setSelectedEmployee(null)}
                                        className="mr-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
                                      >
                                        <FiArrowLeft className="text-gray-500" />
                                      </button>
                                      <span>Custom Access for <span className="text-blue-600">{selectedEmployee.name}</span></span>
                                    </>
                                  ) : (
                                    <>
                                      <FiBriefcase className="mr-3 text-blue-500" />
                                      {selectedDepartment.name} Department
                                    </>
                                  )}
                                </h3>
                                <p className="text-gray-500">
                                  {selectedEmployee 
                                    ? `Customize individual access permissions for ${selectedEmployee.name}`
                                    : `Manage default access permissions for all members of ${selectedDepartment.name}`}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center">
                                  <FiUser className="mr-1" /> {departmentEmployees.length} members
                                </span>
                              </div>
                            </div>
                            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4"></div>
                          </motion.div>

                          {/* Access Control Section */}
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                            {/* Access Settings Card */}
                            <motion.div 
                              className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
                              variants={cardVariants}
                            >
                              <h4 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                                <FiLock className="mr-2 text-blue-500" /> Access Permissions
                              </h4>
                              
                              <div className="mb-8">
                                <h5 className="text-md font-medium text-gray-700 mb-3 flex items-center">
                                  <FiCheckCircle className="mr-2 text-green-500" /> Default Access (All Members)
                                </h5>
                                <div className="flex flex-wrap gap-3 mb-6">
                                  {[
                                    { name: 'Dashboard', icon: <BsGraphUp className="mr-1" /> },
                                    { name: 'Tasks', icon: <FiCheckCircle className="mr-1" /> },
                                    { name: 'Inbox', icon: <FiMail className="mr-1" /> },
                                    { name: 'Calendar', icon: <BsCalendarCheck className="mr-1" /> },
                                    { name: 'Projects', icon: <FiBriefcase className="mr-1" /> }
                                  ].map((access, i) => (
                                    <motion.span 
                                      key={access.name}
                                      whileHover={{ y: -2 }}
                                      className="px-3 py-1.5 bg-green-50 text-green-700 text-sm rounded-full font-medium flex items-center shadow-sm"
                                      transition={{ delay: i * 0.05 }}
                                    >
                                      {access.icon} {access.name}
                                    </motion.span>
                                  ))}
                                </div>
                                
                                <h5 className="text-md font-medium text-gray-700 mb-3 flex items-center">
                                  <FiSettings className="mr-2 text-blue-500" /> Additional Access Controls
                                </h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {[
                                    { key: 'employees', icon: <FiUsers className="mr-2" />, label: 'Employees' },
                                    { key: 'attendance', icon: <FiClock className="mr-2" />, label: 'Attendance' },
                                    { key: 'payroll', icon: <FiDollarSign className="mr-2" />, label: 'Payroll' },
                                    { key: 'hiring', icon: <RiTeamLine className="mr-2" />, label: 'Hiring' }
                                  ].map((item, i) => (
                                    <motion.div 
                                      key={item.key}
                                      whileHover={{ y: -2 }}
                                      className={`flex items-center p-4 rounded-xl cursor-pointer transition-all border ${
                                        accessSettings[item.key] 
                                          ? 'bg-blue-50 border-blue-200 shadow-inner' 
                                          : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                                      }`}
                                      transition={{ delay: i * 0.1 }}
                                    >
                                      <input
                                        type="checkbox"
                                        id={`access-${item.key}`}
                                        name={item.key}
                                        checked={accessSettings[item.key]}
                                        onChange={handleAccessChange}
                                        className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                                      />
                                      <label htmlFor={`access-${item.key}`} className="ml-3 text-gray-700 font-medium flex items-center">
                                        <span className="text-blue-500">{item.icon}</span> {item.label}
                                      </label>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>

                              <div className="flex justify-between pt-4 border-t border-gray-100">
                                <div>
                                  {selectedEmployee && (
                                    <motion.button
                                      whileHover={{ x: -2 }}
                                      whileTap={{ scale: 0.98 }}
                                      onClick={() => setSelectedEmployee(null)}
                                      className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                                    >
                                      <FiArrowLeft className="mr-2" /> Back to Department
                                    </motion.button>
                                  )}
                                </div>
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={saveAccess}
                                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-md flex items-center"
                                >
                                  <FiCheckCircle className="mr-2" />
                                  {selectedEmployee ? 'Save Employee Access' : 'Save Department Access'}
                                </motion.button>
                              </div>
                            </motion.div>

                            {/* Department Stats Card */}
                            <motion.div 
                              className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl p-6 text-white shadow-lg"
                              variants={cardVariants}
                              transition={{ delay: 0.2 }}
                            >
                              <h4 className="text-lg font-semibold mb-6 flex items-center">
                                <RiShieldUserLine className="mr-2" /> Department Overview
                              </h4>
                              
                              <div className="space-y-4 mb-6">
                                <div className="bg-blue-700 bg-opacity-30 rounded-lg p-4">
                                  <div className="text-sm font-medium mb-1">Total Members</div>
                                  <div className="text-2xl font-bold">{departmentEmployees.length}</div>
                                </div>
                                
                                <div className="bg-blue-700 bg-opacity-30 rounded-lg p-4">
                                  <div className="text-sm font-medium mb-1">Active Permissions</div>
                                  <div className="text-2xl font-bold">
                                    {Object.values(accessSettings).filter(Boolean).length} / 4
                                  </div>
                                </div>
                              </div>
                              
                              <div className="pt-4 border-t border-blue-400 border-opacity-30">
                                <h5 className="text-sm font-medium mb-3">Permission Distribution</h5>
                                <div className="space-y-3">
                                  {[
                                    { key: 'employees', label: 'Employees', color: 'bg-green-400' },
                                    { key: 'attendance', label: 'Attendance', color: 'bg-yellow-400' },
                                    { key: 'payroll', label: 'Payroll', color: 'bg-purple-400' },
                                    { key: 'hiring', label: 'Hiring', color: 'bg-pink-400' }
                                  ].map(item => (
                                    <div key={item.key} className="flex items-center">
                                      <div className="w-24 text-sm font-medium">{item.label}</div>
                                      <div className="flex-1 h-2 bg-blue-700 bg-opacity-30 rounded-full overflow-hidden">
                                        <div 
                                          className={`h-full ${item.color} rounded-full ${accessSettings[item.key] ? 'w-full' : 'w-0'}`}
                                          style={{ transition: 'width 0.5s ease' }}
                                        ></div>
                                      </div>
                                      <div className="ml-2 text-xs font-bold">
                                        {accessSettings[item.key] ? 'ON' : 'OFF'}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          </div>

                          {/* Employees List Section */}
                          <motion.div 
                            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
                            variants={cardVariants}
                            transition={{ delay: 0.1 }}
                          >
                            <div className="flex justify-between items-center mb-6">
                              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                                <FiUsers className="mr-2 text-blue-500" /> Department Members
                              </h3>
                              <div className="relative">
                                <input
                                  type="text"
                                  placeholder="Search members..."
                                  className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                />
                                <svg className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                              </div>
                            </div>
                            
                            {departmentEmployees.length > 0 ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {departmentEmployees.map((emp, index) => (
                                  <motion.div 
                                    key={emp.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => handleEmployeeSelect(emp)}
                                    className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                                      selectedEmployee?.id === emp.id
                                        ? 'bg-blue-50 border-blue-200 shadow-inner'
                                        : 'hover:bg-gray-50 hover:shadow-sm border-gray-200'
                                    }`}
                                  >
                                    <div className="relative flex-shrink-0">
                                      <img 
                                        src={emp.avatar} 
                                        alt={emp.name} 
                                        className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-white shadow"
                                      />
                                      {emp.access.some(a => ['employees', 'attendance', 'payroll', 'hiring'].includes(a)) && (
                                        <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-1 flex items-center justify-center w-5 h-5">
                                          <RiShieldUserLine size={10} />
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="font-medium text-gray-800 truncate">{emp.name}</p>
                                      <p className="text-sm text-gray-500 truncate">{emp.email}</p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                      <span className={`text-xs px-2 py-1 rounded-full ${
                                        emp.role === 'admin' 
                                          ? 'bg-purple-100 text-purple-800' 
                                          : 'bg-blue-100 text-blue-800'
                                      }`}>
                                        {emp.role}
                                      </span>
                                      {emp.access.some(a => ['employees', 'attendance', 'payroll', 'hiring'].includes(a)) && (
                                        <span className="text-xs text-gray-500 mt-1">Custom Access</span>
                                      )}
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-12">
                                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                  <FiUsers className="text-gray-400 text-3xl" />
                                </div>
                                <h4 className="text-lg font-medium text-gray-700 mb-2">No Members Found</h4>
                                <p className="text-gray-500">This department currently has no members assigned</p>
                              </div>
                            )}
                          </motion.div>
                        </>
                      ) : (
                        <motion.div 
                          className="bg-white rounded-xl border border-gray-200 p-12 text-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mb-6">
                            <FiBriefcase className="text-blue-500 text-5xl" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-3">No Department Selected</h3>
                          <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            Select a department from the sidebar to manage access permissions or create a new department to get started
                          </p>
                          <div className="flex justify-center space-x-4">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => departments.length > 0 && handleDepartmentSelect(departments[0])}
                              disabled={departments.length === 0}
                              className={`px-6 py-3 rounded-lg font-medium flex items-center ${
                                departments.length === 0
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                              }`}
                            >
                              <FiBriefcase className="mr-2" /> Select Department
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setIsCreatingDepartment(true)}
                              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 shadow-sm flex items-center"
                            >
                              <FiPlus className="mr-2" /> Create New
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <RegistrationApprovals 
                  onApprovalProcessed={loadPendingRegistrationsCount}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AccessManagement;