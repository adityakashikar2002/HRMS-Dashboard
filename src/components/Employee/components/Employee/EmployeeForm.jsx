// // EmployeeForm.jsx
// import { useState, useEffect } from 'react';

// const EmployeeForm = ({ 
//   employeeData = {}, 
//   onChange, 
//   currentStep,
//   employees = [], 
//   positions = [],
//   departments = [],
//   isEditMode = false
// }) => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     position: '',
//     department: '',
//     salary: '',
//     hireDate: new Date().toISOString().split('T')[0],
//     managerId: '',
//     skills: [],
//     employmentType: 'full-time',
//     address: '',
//     salaryType: 'annual',
//     hasBonus: false,
//     bonusAmount: '',
//     bonusDescription: '',
//     ...employeeData
//   });

//   useEffect(() => {
//     if (employeeData) {
//       setFormData(prev => ({
//         ...prev,
//         ...employeeData
//       }));
//     }
//   }, [employeeData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     if (onChange) {
//       onChange(e);
//     }
//   };

//   const getDepartmentPositions = (deptName) => {
//     if (!deptName) return [];
//     return positions.filter(p => p.department === deptName);
//   };

//   const getAvailableManagers = () => {
//     if (isCEO) return []; // CEO has no manager
//     if (!formData.department) return [];
    
//     return employees.filter(e => 
//       e.department === formData.department && 
//       e.id !== formData.id && // Don't allow self as manager
//       (e.position.toLowerCase().includes('manager') || 
//        e.position.toLowerCase().includes('director') ||
//        e.position.toLowerCase().includes('vp') ||
//        e.position.toLowerCase().includes('head'))
//     );
//   };

//   const isCEO = formData.position.toLowerCase().includes('ceo');

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
//           {/* Personal Information Fields */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
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
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={employeeData.email}
//               onChange={onChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//             <input
//               type="tel"
//               name="phone"
//               value={employeeData.phone}
//               onChange={onChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//             <input
//               type="text"
//               name="address"
//               value={employeeData.address}
//               onChange={onChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>
//         </div>
//       )}

// {currentStep >= 2 && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Job Information Fields */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Position*</label>
//             <select
//               name="position"
//               value={formData.position}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               required
//             >
//               <option value="">Select Position</option>
//               {positions.map((pos, index) => (
//                 <option key={index} value={pos.title}>{pos.title}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Department*</label>
//             <select
//               name="department"
//               value={formData.department}
//               onChange={(e) => {
//                 handleChange(e);
//                 // Reset position and manager when department changes
//                 handleChange({ target: { name: 'position', value: '' } });
//                 handleChange({ target: { name: 'managerId', value: '' } });
//               }}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               required
//               disabled={isCEO}
//             >
//               <option value="">Select Department</option>
//               {departments.map(dept => (
//                 <option key={dept.id} value={dept.name}>{dept.name}</option>
//               ))}
//             </select>
//             {isCEO && (
//               <p className="text-xs text-gray-500 mt-1">CEO does not belong to any department</p>
//             )}
//           </div>

//           {!isCEO && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Report To*</label>
//               <select
//                 name="managerId"
//                 value={formData.managerId}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                 required={!isCEO}
//                 disabled={isCEO || !formData.department}
//               >
//                 <option value="">Select Manager</option>
//                 {getAvailableManagers().map(manager => (
//                   <option key={manager.id} value={manager.id}>
//                     {manager.firstName} {manager.lastName} ({manager.position})
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
//             <select
//               name="employmentType"
//               value={employeeData.employmentType}
//               onChange={onChange}
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
//               value={employeeData.hireDate}
//               onChange={onChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
//             <input
//               type="text"
//               name="skills"
//               value={employeeData.skills?.join(', ') || ''}
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
//           {/* Compensation Fields */}
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
//               {employeeData.salaryType === 'hourly' 
//                 ? 'Hourly Rate' 
//                 : employeeData.salaryType === 'monthly'
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
//                 value={employeeData.salary}
//                 onChange={onChange}
//                 className="flex-1 block w-full rounded-none rounded-r-md px-4 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </div>
//           </div>
//           <div className="md:col-span-2">
//             <div className="flex items-center">
//               <input
//                 id="add-bonus"
//                 name="hasBonus"
//                 type="checkbox"
//                 checked={employeeData.hasBonus || false}
//                 onChange={(e) => onChange({ target: { name: 'hasBonus', value: e.target.checked } })}
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <label htmlFor="add-bonus" className="ml-2 block text-sm text-gray-700">
//                 Add signing bonus
//               </label>
//             </div>
//           </div>
//           {employeeData.hasBonus && (
//             <>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Bonus Amount</label>
//                 <div className="flex">
//                   <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
//                     Rs.
//                   </span>
//                   <input
//                     type="number"
//                     name="bonusAmount"
//                     value={employeeData.bonusAmount || ''}
//                     onChange={onChange}
//                     className="flex-1 block w-full rounded-none rounded-r-md px-4 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Bonus Description</label>
//                 <input
//                   type="text"
//                   name="bonusDescription"
//                   value={employeeData.bonusDescription || ''}
//                   onChange={onChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//             </>
//           )}
//         </div>
//       )}
//     </form>
//   );
// };

// export default EmployeeForm;

// // WORKS 99.99
// import { useState, useEffect } from 'react';

// const EmployeeForm = ({ 
//   employeeData = {}, 
//   onChange, 
//   currentStep,
//   employees = [], 
//   departments = [],
//   isEditMode = false
// }) => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     position: '',
//     department: '',
//     salary: '',
//     hireDate: new Date().toISOString().split('T')[0],
//     managerId: '',
//     skills: [],
//     employmentType: 'full-time',
//     address: '',
//     salaryType: 'annual',
//     hasBonus: false,
//     bonusAmount: '',
//     bonusDescription: '',
//     ...employeeData
//   });

//   const [departmentPositions, setDepartmentPositions] = useState([]);

//   useEffect(() => {
//     if (employeeData) {
//       setFormData(prev => ({
//         ...prev,
//         ...employeeData
//       }));
//     }
//   }, [employeeData]);

//   useEffect(() => {
//     if (formData.department) {
//       const selectedDept = departments.find(d => d.name === formData.department);
//       if (selectedDept) {
//         setDepartmentPositions(selectedDept.positions || []);
//         // Reset position when department changes
//         if (formData.position && !selectedDept.positions.some(p => p.title === formData.position)) {
//           handleChange({ target: { name: 'position', value: '' } });
//         }
//       }
//     } else {
//       setDepartmentPositions([]);
//     }
//   }, [formData.department, departments]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     if (onChange) {
//       onChange(e);
//     }
//   };

//   const getAvailableManagers = () => {
//     if (isCEO) return []; // CEO has no manager
//     if (!formData.department) return [];
    
//     return employees.filter(e => 
//       e.department === formData.department && 
//       e.id !== formData.id && // Don't allow self as manager
//       (e.position.toLowerCase().includes('manager') || 
//        e.position.toLowerCase().includes('director') ||
//        e.position.toLowerCase().includes('head'))
//     );
//   };

//   const isCEO = formData.position.toLowerCase().includes('ceo');

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
//             <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address || ''}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>
//         </div>
//       )}

//       {currentStep >= 2 && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Department*</label>
//             <select
//               name="department"
//               value={formData.department || ''}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               required
//               disabled={isCEO}
//             >
//               <option value="">Select Department</option>
//               {departments.map(dept => (
//                 <option key={dept.id} value={dept.name}>{dept.name}</option>
//               ))}
//             </select>
//             {isCEO && (
//               <p className="text-xs text-gray-500 mt-1">CEO does not belong to any department</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Position*</label>
//             <select
//               name="position"
//               value={formData.position || ''}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               required
//               disabled={!formData.department || isCEO}
//             >
//               <option value="">Select Position</option>
//               {departmentPositions.map((pos, idx) => (
//                 <option key={idx} value={pos.title}>{pos.title} ({pos.level})</option>
//               ))}
//             </select>
//           </div>

//           {!isCEO && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Manager*</label>
//               <select
//                 name="managerId"
//                 value={formData.managerId || ''}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                 required={!isCEO}
//                 disabled={isCEO || !formData.department}
//               >
//                 <option value="">Select Manager</option>
//                 {getAvailableManagers().map(manager => (
//                   <option key={manager.id} value={manager.id}>
//                     {manager.firstName} {manager.lastName} ({manager.position})
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type*</label>
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
//             <label className="block text-sm font-medium text-gray-700 mb-1">Hire Date*</label>
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
//                 handleChange({ target: { name: 'skills', value: skills } });
//               }}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>
//       )}

//       {currentStep >= 3 && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Salary Type*</label>
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
//                 ? 'Hourly Rate*' 
//                 : formData.salaryType === 'monthly'
//                   ? 'Monthly Salary*'
//                   : 'Annual Salary*'}
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
          
//           <div className="md:col-span-2">
//             <div className="flex items-center">
//               <input
//                 id="add-bonus"
//                 name="hasBonus"
//                 type="checkbox"
//                 checked={formData.hasBonus || false}
//                 onChange={(e) => handleChange({ target: { name: 'hasBonus', value: e.target.checked } })}
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <label htmlFor="add-bonus" className="ml-2 block text-sm text-gray-700">
//                 Add signing bonus
//               </label>
//             </div>
//           </div>
          
//           {formData.hasBonus && (
//             <>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Bonus Amount</label>
//                 <div className="flex">
//                   <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
//                     Rs.
//                   </span>
//                   <input
//                     type="number"
//                     name="bonusAmount"
//                     value={formData.bonusAmount || ''}
//                     onChange={handleChange}
//                     className="flex-1 block w-full rounded-none rounded-r-md px-4 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Bonus Description</label>
//                 <input
//                   type="text"
//                   name="bonusDescription"
//                   value={formData.bonusDescription || ''}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//             </>
//           )}
//         </div>
//       )}
//     </form>
//   );
// };

// export default EmployeeForm;


import { useState, useEffect } from 'react';

const EmployeeForm = ({
  employeeData = {},
  onChange,
  currentStep,
  employees = [],
  departments = [],
  isEditMode = false
}) => {
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
    ...employeeData
  });

  const [departmentPositions, setDepartmentPositions] = useState([]);
  const [availableManagers, setAvailableManagers] = useState([]);

  useEffect(() => {
    if (employeeData) {
      setFormData(prev => ({
        ...prev,
        ...employeeData
      }));
    }
  }, [employeeData]);

  useEffect(() => {
    // Update positions when department changes
    if (formData.department) {
      const selectedDept = departments.find(d => d.name === formData.department);
      if (selectedDept) {
        setDepartmentPositions(selectedDept.positions || []);
        // Reset position if not available in new department
        if (formData.position && !selectedDept.positions.some(p => p.title === formData.position)) {
          const event = { target: { name: 'position', value: '' } };
          handleChange(event);
          if (onChange) onChange(event);
        }
      }
    } else {
      setDepartmentPositions([]);
    }

    // Update available managers when department changes
    if (formData.department && !isCEO) {
      const managers = employees.filter(e =>
        e.department === formData.department &&
        e.id !== formData.id &&
        (e.position.toLowerCase().includes('manager') ||
         e.position.toLowerCase().includes('director') ||
         e.position.toLowerCase().includes('head'))
      );
      setAvailableManagers(managers);
    } else {
      setAvailableManagers([]);
    }
  }, [formData.department, departments, employees, formData.id]);

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

  const isCEO = formData.position.toLowerCase().includes('ceo');

  return (
    <form className="space-y-6">
      {currentStep >= 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
            <div className="flex items-center">
              {formData.photo ? (
                <img
                  src={formData.photo}
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
                onChange={(event) => {
                  const file = event.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (readEvent) => {
                      const fileChangeEvent = { target: { name: 'photo', value: readEvent.target.result } };
                      handleChange(fileChangeEvent);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="text-sm text-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
            <input
              type="text"
              name="address"
              value={formData.address || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
      )}

      {currentStep >= 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department*</label>
            <select
              name="department"
              value={formData.department || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={isCEO}
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.name}>{dept.name}</option>
              ))}
            </select>
            {isCEO && (
              <p className="text-xs text-gray-500 mt-1">CEO does not belong to any department</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position*</label>
            <select
              name="position"
              value={formData.position || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={!formData.department || isCEO}
            >
              <option value="">Select Position</option>
              {departmentPositions.map((pos, idx) => (
                <option key={idx} value={pos.title}>{pos.title} ({pos.level})</option>
              ))}
            </select>
          </div>

          {!isCEO && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Report To*</label>
              <select
                name="managerId"
                value={formData.managerId || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required={!isCEO}
                disabled={isCEO || !formData.department}
              >
                <option value="">Select Manager</option>
                {availableManagers.map(manager => (
                  <option key={manager.id} value={manager.id}>
                    {manager.firstName} {manager.lastName} ({manager.position})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type*</label>
            <select
              name="employmentType"
              value={formData.employmentType || 'full-time'}
              onChange={handleChange}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Hire Date*</label>
            <input
              type="date"
              name="hireDate"
              value={formData.hireDate || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
            <input
              type="text"
              name="skills"
              value={formData.skills?.join(', ') || ''}
              onChange={(event) => {
                const skills = event.target.value.split(',').map(s => s.trim()).filter(s => s);
                const e = { target: { name: 'skills', value: skills } };
                handleChange(e);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {currentStep >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary Type*</label>
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
              {formData.salaryType === 'hourly'
                ? 'Hourly Rate*'
                : formData.salaryType === 'monthly'
                  ? 'Monthly Salary*'
                  : 'Annual Salary*'}
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                Rs.
              </span>
              <input
                type="number"
                name="salary"
                value={formData.salary || ''}
                onChange={handleChange}
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
                checked={formData.hasBonus || false}
                onChange={(event) => handleChange({ target: { name: 'hasBonus', value: event.target.checked } })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="add-bonus" className="ml-2 block text-sm text-gray-700">
                Add signing bonus
              </label>
            </div>
          </div>

          {formData.hasBonus && (
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
                    value={formData.bonusAmount || ''}
                    onChange={handleChange}
                    className="flex-1 block w-full rounded-none rounded-r-md px-4 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bonus Description</label>
                <input
                  type="text"
                  name="bonusDescription"
                  value={formData.bonusDescription || ''}
                  onChange={handleChange}
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