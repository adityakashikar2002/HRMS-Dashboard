import { useState, useEffect } from 'react';

const EmployeeForm = ({ 
  employeeData = {}, 
  onChange, 
  currentStep,
  employees = [], 
  positions = [],
  isEditMode = false
}) => {
  // Set default form data structure
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    salary: '',
    hireDate: new Date().toISOString().split('T')[0],
    managerId: '',
    skills: [],
    employmentType: 'full-time',
    address: '',
    salaryType: 'annual',
    hasBonus: false,
    bonusAmount: '',
    bonusDescription: '',
    ...employeeData // Override with passed data
  });

  // Update form data when employeeData changes
  useEffect(() => {
    if (employeeData) {
      setFormData(prev => ({
        ...prev,
        ...employeeData
      }));
    }
  }, [employeeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (onChange) {
      onChange(e);
    }
  };

  // Safe manager options
  // const availableManagers = Array.isArray(employees) 
  //   ? employees.filter(e => 
  //       e?.position?.toLowerCase().includes('manager') || 
  //       e?.position?.toLowerCase().includes('director') ||
  //       e?.position?.toLowerCase().includes('executive')
  //     )
  //   : [];
  const availableManagers = Array.isArray(employees) 
  ? employees.filter(e => 
      e.department === employeeData.department && // Only show managers from same department
      e.id !== employeeData.id // Don't allow self as manager
    )
  : [];

  // Safe position options
  const positionOptions = Array.isArray(positions) 
    ? positions.map(pos => pos?.title).filter(Boolean)
    : [];
  
  const isCEO = employeeData.position.toLowerCase().includes('ceo');

  {!isCEO && (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Report To</label>
      <select
        name="managerId"
        value={employeeData.managerId}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        disabled={isCEO}
      >
        {isCEO ? (
          <option value="">CEO has no manager</option>
        ) : availableManagers.length > 0 ? (
          <>
            <option value="">No Manager</option>
            {availableManagers.map(manager => (
              <option key={manager.id} value={manager.id}>
                {manager.firstName} {manager.lastName} ({manager.position})
              </option>
            ))}
          </>
        ) : (
          <option value="" disabled>
            No managers available in {employeeData.department || 'this department'}
          </option>
        )}
      </select>
    </div>
  )}
  
  return (
    <form className="space-y-6">
      {currentStep >= 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
            <div className="flex items-center">
              {employeeData.photo ? (
                <img 
                  src={employeeData.photo} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <span className="text-gray-500">No photo</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      onChange({ target: { name: 'photo', value: event.target.result } });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="text-sm text-gray-500"
              />
            </div>
          </div>
          {/* Personal Information Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={isEditMode}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={employeeData.email}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={employeeData.phone}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={employeeData.address}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
      )}

      {currentStep >= 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Information Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <select
              name="position"
              value={formData.position || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Position</option>
              {positionOptions.map((position, index) => (
                <option key={index} value={position}>{position}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            {/* <select
              name="department"
              value={employeeData.department}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            > */}
            <select
              name="department"
              value={employeeData.department}
              onChange={(e) => {
                onChange(e); // Update department
                onChange({ target: { name: 'managerId', value: '' }}); // Reset manager
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Department</option>
              <option value="Executive">Executive</option>
              <option value="Engineering">Engineering</option>
              <option value="Product">Product</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report To</label>
            {/* <select
              name="managerId"
              value={employeeData.managerId}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">No Manager</option>
              {availableManagers.map(manager => (
                <option key={manager.id} value={manager.id}>
                  {manager.firstName} {manager.lastName} ({manager.position})
                </option>
              ))}
            </select> */}
            <select
              name="managerId"
              value={employeeData.managerId}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">No Manager</option>
              {availableManagers.length > 0 ? (
                availableManagers.map(manager => (
                  <option key={manager.id} value={manager.id}>
                    {manager.firstName} {manager.lastName} ({manager.position})
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No managers available in {employeeData.department || 'this department'}
                </option>
              )}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
            <select
              name="employmentType"
              value={employeeData.employmentType}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="intern">Intern</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hire Date</label>
            <input
              type="date"
              name="hireDate"
              value={employeeData.hireDate}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
            <input
              type="text"
              name="skills"
              value={employeeData.skills?.join(', ') || ''}
              onChange={(e) => {
                const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                onChange({ target: { name: 'skills', value: skills } });
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {currentStep >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Compensation Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary Type</label>
            <select
              name="salaryType"
              value={formData.salaryType || 'annual'}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="annual">Annual</option>
              <option value="monthly">Monthly</option>
              <option value="hourly">Hourly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {employeeData.salaryType === 'hourly' 
                ? 'Hourly Rate' 
                : employeeData.salaryType === 'monthly'
                  ? 'Monthly Salary'
                  : 'Annual Salary'}
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                Rs.
              </span>
              <input
                type="number"
                name="salary"
                value={employeeData.salary}
                onChange={onChange}
                className="flex-1 block w-full rounded-none rounded-r-md px-4 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="flex items-center">
              <input
                id="add-bonus"
                name="hasBonus"
                type="checkbox"
                checked={employeeData.hasBonus || false}
                onChange={(e) => onChange({ target: { name: 'hasBonus', value: e.target.checked } })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="add-bonus" className="ml-2 block text-sm text-gray-700">
                Add signing bonus
              </label>
            </div>
          </div>
          {employeeData.hasBonus && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bonus Amount</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    Rs.
                  </span>
                  <input
                    type="number"
                    name="bonusAmount"
                    value={employeeData.bonusAmount || ''}
                    onChange={onChange}
                    className="flex-1 block w-full rounded-none rounded-r-md px-4 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bonus Description</label>
                <input
                  type="text"
                  name="bonusDescription"
                  value={employeeData.bonusDescription || ''}
                  onChange={onChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </>
          )}
        </div>
      )}
    </form>
  );
};

export default EmployeeForm;


// // src/components/Employee/EmployeeForm.jsx
// import { useEffect, useState } from 'react';

// const EmployeeForm = ({ 
//   employeeData = {}, 
//   onChange, 
//   currentStep,
//   departments = [],
//   positions = [],
//   employees = [],
//   isEditMode = false
// }) => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     positionId: '',
//     departmentId: '',
//     salary: '',
//     hireDate: new Date().toISOString().split('T')[0],
//     managerId: '',
//     skills: [],
//     employmentType: 'full-time',
//     address: '',
//     ...employeeData
//   });

//   const [departmentPositions, setDepartmentPositions] = useState([]);
//   const [possibleManagers, setPossibleManagers] = useState([]);

//   useEffect(() => {
//     if (formData.departmentId) {
//       const deptPositions = positions.filter(p => p.departmentId === formData.departmentId);
//       setDepartmentPositions(deptPositions);
      
//       const managers = employees.filter(e => 
//         deptPositions.some(p => 
//           p.id === e.positionId && 
//           (p.level === 'Manager' || p.level === 'Director' || p.level === 'C-Level')
//         )
//       );
//       setPossibleManagers(managers);
//     } else {
//       setDepartmentPositions([]);
//       setPossibleManagers([]);
//     }
//   }, [formData.departmentId, positions, employees]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const newData = {
//       ...formData,
//       [name]: value
//     };
    
//     // Reset position if department changes
//     if (name === 'departmentId' && formData.departmentId !== value) {
//       newData.positionId = '';
//       newData.managerId = '';
//     }
    
//     setFormData(newData);
//     if (onChange) {
//       onChange({ target: { name, value } });
//     }
//   };

//   return (
//     <form className="space-y-6">
//       {currentStep >= 1 && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
//             <div className="flex items-center">
//               {employeeData.photo ? (
//                 <img 
//                   src={employeeData.photo} 
//                   alt="Profile" 
//                   className="w-16 h-16 rounded-full object-cover mr-4"
//                 />
//               ) : (
//                 <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
//                   <span className="text-gray-500">No photo</span>
//                 </div>
//               )}
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => {
//                   const file = e.target.files[0];
//                   if (file) {
//                     const reader = new FileReader();
//                     reader.onload = (event) => {
//                       onChange({ target: { name: 'photo', value: event.target.result } });
//                     };
//                     reader.readAsDataURL(file);
//                   }
//                 }}
//                 className="text-sm text-gray-500"
//               />
//             </div>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName || ''}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               required
//               disabled={isEditMode}
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName || ''}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               required
//               disabled={isEditMode}
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email || ''}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone || ''}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>
          
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address || ''}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>
//       )}

//       {currentStep >= 2 && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Department*</label>
//             <select
//               name="departmentId"
//               value={formData.departmentId || ''}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               required
//             >
//               <option value="">Select Department</option>
//               {departments.map(dept => (
//                 <option key={dept.id} value={dept.id}>{dept.name}</option>
//               ))}
//             </select>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Position*</label>
//             <select
//               name="positionId"
//               value={formData.positionId || ''}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               required
//               disabled={!formData.departmentId}
//             >
//               <option value="">Select Position</option>
//               {departmentPositions.map(position => (
//                 <option key={position.id} value={position.id}>
//                   {position.title} ({position.level})
//                 </option>
//               ))}
//             </select>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Reports To</label>
//             <select
//               name="managerId"
//               value={formData.managerId || ''}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">No Manager</option>
//               {possibleManagers.map(manager => (
//                 <option key={manager.id} value={manager.id}>
//                   {manager.firstName} {manager.lastName} ({positions.find(p => p.id === manager.positionId)?.title})
//                 </option>
//               ))}
//             </select>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
//             <select
//               name="employmentType"
//               value={formData.employmentType || 'full-time'}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               required
//             >
//               <option value="full-time">Full Time</option>
//               <option value="part-time">Part Time</option>
//               <option value="contract">Contract</option>
//               <option value="intern">Intern</option>
//             </select>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Hire Date</label>
//             <input
//               type="date"
//               name="hireDate"
//               value={formData.hireDate || ''}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>
          
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
//             <input
//               type="text"
//               name="skills"
//               value={formData.skills?.join(', ') || ''}
//               onChange={(e) => {
//                 const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
//                 onChange({ target: { name: 'skills', value: skills } });
//               }}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>
//       )}

//       {currentStep >= 3 && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Salary Type</label>
//             <select
//               name="salaryType"
//               value={formData.salaryType || 'annual'}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               required
//             >
//               <option value="annual">Annual</option>
//               <option value="monthly">Monthly</option>
//               <option value="hourly">Hourly</option>
//             </select>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               {formData.salaryType === 'hourly' 
//                 ? 'Hourly Rate' 
//                 : formData.salaryType === 'monthly'
//                   ? 'Monthly Salary'
//                   : 'Annual Salary'}
//             </label>
//             <div className="flex">
//               <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
//                 Rs.
//               </span>
//               <input
//                 type="number"
//                 name="salary"
//                 value={formData.salary || ''}
//                 onChange={handleChange}
//                 className="flex-1 block w-full rounded-none rounded-r-md px-4 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </form>
//   );
// };

// export default EmployeeForm;