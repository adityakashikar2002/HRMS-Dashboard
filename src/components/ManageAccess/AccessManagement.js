// import React, { useState, useEffect } from 'react';
// import { getDepartments, addDepartment } from '../../data/departments';
// import { getUsersByDepartment, updateUserAccess, updateDepartmentAccess } from '../../data/users';
// import { toast } from 'react-toastify';
// import DepartmentForm from './DepartmentForm';

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

//   useEffect(() => {
//     loadDepartments();
//   }, []);

//   const loadDepartments = () => {
//     const depts = getDepartments();
//     setDepartments(depts);
//     if (depts.length > 0 && !selectedDepartment) {
//       handleDepartmentSelect(depts[0]);
//     }
//   };

//   useEffect(() => {
//     if (selectedDepartment) {
//       const employees = getUsersByDepartment(selectedDepartment.id);
//       setDepartmentEmployees(employees);
      
//       // Reset selected employee if not in current department
//       if (selectedEmployee && !employees.some(e => e.id === selectedEmployee.id)) {
//         setSelectedEmployee(null);
//       }
      
//       // Set default access based on department or employee
//       if (selectedEmployee) {
//         setAccessSettings({
//           employees: selectedEmployee.access.includes('employees'),
//           attendance: selectedEmployee.access.includes('attendance'),
//           payroll: selectedEmployee.access.includes('payroll'),
//           hiring: selectedEmployee.access.includes('hiring'),
//         });
//       } else {
//         // Get common access across all department employees
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

//     // Default access for all employees
//     const defaultAccess = ['dashboard', 'tasks', 'inbox', 'calendar', 'projects'];
    
//     // Additional selected access
//     const additionalAccess = Object.entries(accessSettings)
//       .filter(([_, value]) => value)
//       .map(([key]) => key);
    
//     const newAccess = [...defaultAccess, ...additionalAccess];

//     if (selectedEmployee) {
//       // Update individual employee
//       updateUserAccess(selectedEmployee.id, newAccess);
//       toast.success(`Access updated for ${selectedEmployee.name}`);
//       setDepartmentEmployees(getUsersByDepartment(selectedDepartment.id));
//     } else {
//       // Update entire department
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

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Access Management</h2>
      
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Department List */}
//         <div className="lg:col-span-1">
//           <div className="bg-gray-50 rounded-lg p-4 shadow-inner">
//             <div className="flex justify-between items-center mb-3">
//               <h4 className="font-medium text-gray-700">Departments</h4>
//               <button
//                 onClick={() => setIsCreatingDepartment(true)}
//                 className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//               >
//                 + New
//               </button>
//             </div>
            
//             <ul className="space-y-2 max-h-96 overflow-y-auto">
//               {departments.map(dept => (
//                 <li 
//                   key={dept.id}
//                   onClick={() => handleDepartmentSelect(dept)}
//                   className={`p-3 rounded-md cursor-pointer transition ${
//                     selectedDepartment?.id === dept.id 
//                       ? 'bg-blue-100 border-l-4 border-blue-500' 
//                       : 'hover:bg-gray-100'
//                   }`}
//                 >
//                   <div className="font-medium">{dept.name}</div>
//                   <div className="text-sm text-gray-500">
//                     {getUsersByDepartment(dept.id).length} employees
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="lg:col-span-2 space-y-6">
//           {isCreatingDepartment ? (
//             <DepartmentForm 
//               onCancel={() => setIsCreatingDepartment(false)}
//               onSubmit={handleCreateDepartment}
//             />
//           ) : selectedDepartment ? (
//             <>
//               {/* Department Access */}
//               <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
//                 <h3 className="text-lg font-medium text-gray-800 mb-4">
//                   {selectedEmployee 
//                     ? `Custom Access for ${selectedEmployee.name}`
//                     : `Default Access for ${selectedDepartment.name} Department`
//                   }
//                 </h3>
                
//                 <div className="mb-4">
//                   <h4 className="text-md font-medium text-gray-700 mb-2">Default Access (All Employees)</h4>
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {['dashboard', 'tasks', 'inbox', 'calendar', 'projects'].map(access => (
//                       <span 
//                         key={access}
//                         className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
//                       >
//                         {access}
//                       </span>
//                     ))}
//                   </div>
                  
//                   <h4 className="text-md font-medium text-gray-700 mb-2">Additional Access</h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {Object.entries(accessSettings).map(([key, value]) => (
//                       <div key={key} className="flex items-center bg-gray-50 p-3 rounded-lg">
//                         <input
//                           type="checkbox"
//                           id={`access-${key}`}
//                           name={key}
//                           checked={value}
//                           onChange={handleAccessChange}
//                           className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
//                         />
//                         <label htmlFor={`access-${key}`} className="ml-2 capitalize text-gray-700">
//                           {key}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="flex justify-between">
//                   <div>
//                     {selectedEmployee && (
//                       <button
//                         onClick={() => setSelectedEmployee(null)}
//                         className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
//                       >
//                         ← Back to Department
//                       </button>
//                     )}
//                   </div>
//                   <button
//                     onClick={saveAccess}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//                   >
//                     {selectedEmployee ? 'Save Employee Access' : 'Save Department Access'}
//                   </button>
//                 </div>
//               </div>

//               {/* Employees List */}
//               <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
//                 <h3 className="text-lg font-medium text-gray-800 mb-4">
//                   Employees in {selectedDepartment.name}
//                 </h3>
                
//                 {departmentEmployees.length > 0 ? (
//                   <div className="space-y-3">
//                     {departmentEmployees.map(emp => (
//                       <div 
//                         key={emp.id}
//                         onClick={() => handleEmployeeSelect(emp)}
//                         className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${
//                           selectedEmployee?.id === emp.id
//                             ? 'bg-blue-50 border-blue-200'
//                             : 'hover:bg-gray-50'
//                         }`}
//                       >
//                         <img 
//                           src={emp.avatar} 
//                           alt={emp.name} 
//                           className="w-10 h-10 rounded-full mr-3"
//                         />
//                         <div className="flex-1">
//                           <p className="font-medium">{emp.name}</p>
//                           <p className="text-sm text-gray-500">{emp.email}</p>
//                         </div>
//                         {emp.access.some(a => ['employees', 'attendance', 'payroll', 'hiring'].includes(a)) && (
//                           <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
//                             Custom Access
//                           </span>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-gray-500">No employees in this department</p>
//                 )}
//               </div>
//             </>
//           ) : (
//             <div className="bg-white rounded-lg p-6 shadow border border-gray-200 text-center">
//               <p className="text-gray-500">No departments available</p>
//               <button
//                 onClick={() => setIsCreatingDepartment(true)}
//                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//               >
//                 Create First Department
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccessManagement;





// AccessManagement.js
import React, { useState, useEffect } from 'react';
import { getDepartments, addDepartment } from '../../data/departments';
import { getUsersByDepartment, updateUserAccess, updateDepartmentAccess } from '../../data/users';
import { toast } from 'react-toastify';
import DepartmentForm from './DepartmentForm';
import RegistrationApprovals from './RegistrationApprovals';

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

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = () => {
    const depts = getDepartments();
    setDepartments(depts);
    if (depts.length > 0 && !selectedDepartment) {
      handleDepartmentSelect(depts[0]);
    }
  };

  useEffect(() => {
    if (selectedDepartment) {
      const employees = getUsersByDepartment(selectedDepartment.id);
      setDepartmentEmployees(employees);
      
      // Reset selected employee if not in current department
      if (selectedEmployee && !employees.some(e => e.id === selectedEmployee.id)) {
        setSelectedEmployee(null);
      }
      
      // Set default access based on department or employee
      if (selectedEmployee) {
        setAccessSettings({
          employees: selectedEmployee.access.includes('employees'),
          attendance: selectedEmployee.access.includes('attendance'),
          payroll: selectedEmployee.access.includes('payroll'),
          hiring: selectedEmployee.access.includes('hiring'),
        });
      } else {
        // Get common access across all department employees
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

    // Default access for all employees
    const defaultAccess = ['dashboard', 'tasks', 'inbox', 'calendar', 'projects'];
    
    // Additional selected access
    const additionalAccess = Object.entries(accessSettings)
      .filter(([_, value]) => value)
      .map(([key]) => key);
    
    const newAccess = [...defaultAccess, ...additionalAccess];

    if (selectedEmployee) {
      // Update individual employee
      updateUserAccess(selectedEmployee.id, newAccess);
      toast.success(`Access updated for ${selectedEmployee.name}`);
      setDepartmentEmployees(getUsersByDepartment(selectedDepartment.id));
    } else {
      // Update entire department
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

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Access Management</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('departments')}
            className={`px-4 py-2 rounded-md ${activeTab === 'departments' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Departments
          </button>
          <button
            onClick={() => setActiveTab('approvals')}
            className={`px-4 py-2 rounded-md ${activeTab === 'approvals' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Registration Approvals
          </button>
        </div>
      </div>
      
      {activeTab === 'departments' ? (
        // Existing department management code
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department List */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-4 shadow-inner">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-700">Departments</h4>
              <button
                onClick={() => setIsCreatingDepartment(true)}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                + New
              </button>
            </div>
            
            <ul className="space-y-2 max-h-96 overflow-y-auto">
              {departments.map(dept => (
                <li 
                  key={dept.id}
                  onClick={() => handleDepartmentSelect(dept)}
                  className={`p-3 rounded-md cursor-pointer transition ${
                    selectedDepartment?.id === dept.id 
                      ? 'bg-blue-100 border-l-4 border-blue-500' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="font-medium">{dept.name}</div>
                  <div className="text-sm text-gray-500">
                    {getUsersByDepartment(dept.id).length} employees
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {isCreatingDepartment ? (
            <DepartmentForm 
              onCancel={() => setIsCreatingDepartment(false)}
              onSubmit={handleCreateDepartment}
            />
          ) : selectedDepartment ? (
            <>
              {/* Department Access */}
              <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  {selectedEmployee 
                    ? `Custom Access for ${selectedEmployee.name}`
                    : `Default Access for ${selectedDepartment.name} Department`
                  }
                </h3>
                
                <div className="mb-4">
                  <h4 className="text-md font-medium text-gray-700 mb-2">Default Access (All Employees)</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['dashboard', 'tasks', 'inbox', 'calendar', 'projects'].map(access => (
                      <span 
                        key={access}
                        className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
                      >
                        {access}
                      </span>
                    ))}
                  </div>
                  
                  <h4 className="text-md font-medium text-gray-700 mb-2">Additional Access</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(accessSettings).map(([key, value]) => (
                      <div key={key} className="flex items-center bg-gray-50 p-3 rounded-lg">
                        <input
                          type="checkbox"
                          id={`access-${key}`}
                          name={key}
                          checked={value}
                          onChange={handleAccessChange}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <label htmlFor={`access-${key}`} className="ml-2 capitalize text-gray-700">
                          {key}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <div>
                    {selectedEmployee && (
                      <button
                        onClick={() => setSelectedEmployee(null)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                      >
                        ← Back to Department
                      </button>
                    )}
                  </div>
                  <button
                    onClick={saveAccess}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    {selectedEmployee ? 'Save Employee Access' : 'Save Department Access'}
                  </button>
                </div>
              </div>

              {/* Employees List */}
              <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Employees in {selectedDepartment.name}
                </h3>
                
                {departmentEmployees.length > 0 ? (
                  <div className="space-y-3">
                    {departmentEmployees.map(emp => (
                      <div 
                        key={emp.id}
                        onClick={() => handleEmployeeSelect(emp)}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${
                          selectedEmployee?.id === emp.id
                            ? 'bg-blue-50 border-blue-200'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <img 
                          src={emp.avatar} 
                          alt={emp.name} 
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{emp.name}</p>
                          <p className="text-sm text-gray-500">{emp.email}</p>
                        </div>
                        {emp.access.some(a => ['employees', 'attendance', 'payroll', 'hiring'].includes(a)) && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Custom Access
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No employees in this department</p>
                )}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg p-6 shadow border border-gray-200 text-center">
              <p className="text-gray-500">No departments available</p>
              <button
                onClick={() => setIsCreatingDepartment(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Create First Department
              </button>
            </div>
          )}
        </div>
      </div>
    ) : (
      <RegistrationApprovals />
    )}
  </div>
);
};

export default AccessManagement;