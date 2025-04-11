// // WORKS 99.999
// import { useState, useEffect, useMemo, useCallback } from 'react';

// const EmployeeForm = ({
//   employeeData = {},
//   onChange,
//   currentStep,
//   employees = [],
//   departments = [],
//   positions =[],
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

//   const isCEO = formData.position.toLowerCase().includes('ceo');

//   const handleChange = useCallback((e) => {

//     const { name, value } = e.target;
//     if (name === 'photo' && e.target.files && e.target.files[0]) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setFormData(prev => ({
//           ...prev,
//           photo: event.target.result
//         }));
//       };
//       reader.readAsDataURL(e.target.files[0]);
//     }
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     if (onChange) {
//       onChange(e);
//     }
//   }, [onChange]);

//   useEffect(() => {
//     if (employeeData) {
//       setFormData(prev => ({
//         ...prev,
//         ...employeeData
//       }));
//     }
//   }, [employeeData]);

//   useEffect(() => {
//     if (formData.department && formData.position) {
//       const selectedDept = departments.find(d => d.name === formData.department);
//       if (selectedDept && !selectedDept.positions.some(p => p.title === formData.position)) {
//         const event = { target: { name: 'position', value: '' } };
//         handleChange(event);
//       }
//     }
//   }, [formData.department, formData.position, departments, handleChange]);

//   const departmentPositions = useMemo(() => {
//     if (!formData.department) return positions; // Show all positions if no department selected
    
//     // Get positions specific to the selected department
//     const selectedDept = departments.find(d => d.name === formData.department);
//     const deptPositions = selectedDept?.positions || [];
    
//     // Also include general positions (without department or with matching department)
//     const generalPositions = positions.filter(p => 
//       !p.department || p.department === formData.department
//     );
    
//     // Combine and remove duplicates
//     const allPositions = [...deptPositions, ...generalPositions];
//     return allPositions.filter((pos, index, self) =>
//       index === self.findIndex(p => p.title === pos.title)
//     );
//   }, [formData.department, departments, positions]);

//   // Memoize the available managers
//   const availableManagers = useMemo(() => {
//     if (isCEO || !formData.department) return [];
//     return employees.filter(e =>
//       e.department === formData.department &&
//       e.id !== formData.id &&
//       (e.position.toLowerCase().includes('manager') ||
//        e.position.toLowerCase().includes('director') ||
//        e.position.toLowerCase().includes('head'))
//     );
//   }, [formData.department, employees, formData.id, isCEO]);


//   return (
//     <form className="space-y-6">
//       {currentStep >= 1 && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
//             <div className="flex items-center">
//               {formData.photo ? (
//                 <img
//                   src={formData.photo}
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
//                 onChange={(e) => handleChange({ 
//                   target: { 
//                     name: 'photo', 
//                     files: e.target.files 
//                   } 
//                 })}
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
//               <label className="block text-sm font-medium text-gray-700 mb-1">Report To*</label>
//               <select
//                 name="managerId"
//                 value={formData.managerId || ''}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                 required={!isCEO}
//                 disabled={isCEO}
//               >
//                 <option value="">Select Manager or Department</option>
//                 {/* Option to report to department */}
//                 {formData.department && (
//                   <option value={`dept-${formData.department}`}>
//                     {formData.department} (Department)
//                   </option>
//                 )}
//                 {/* Available managers */}
//                 {availableManagers.map(manager => (
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
//               onChange={(event) => {
//                 const skills = event.target.value.split(',').map(s => s.trim()).filter(s => s);
//                 const e = { target: { name: 'skills', value: skills } };
//                 handleChange(e);
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
//                 onChange={(event) => handleChange({ target: { name: 'hasBonus', value: event.target.checked } })}
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



// WORKS 99.999
import { useState, useEffect, useMemo, useCallback } from 'react';

const EmployeeForm = ({
  employeeData = {},
  onChange,
  currentStep,
  employees = [],
  departments = [],
  positions = [],
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

  const isCEO = formData.position.toLowerCase().includes('ceo');

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    if (name === 'photo' && e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          photo: event.target.result
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (onChange) {
      onChange(e);
    }
  }, [onChange]);

  useEffect(() => {
    if (employeeData) {
      setFormData(prev => ({
        ...prev,
        ...employeeData
      }));
    }
  }, [employeeData]);

  // Updated department positions calculation
  const departmentPositions = useMemo(() => {
    if (!formData.department) return positions; // Show all positions if no department selected
    
    // Get positions specific to the selected department from department data
    const selectedDept = departments.find(d => d.name === formData.department);
    const deptPositions = selectedDept?.positions?.map(pos => ({
      ...pos,
      department: formData.department
    })) || [];
    
    // Get general positions that match this department
    const generalPositions = positions.filter(p => 
      p.department === formData.department || !p.department
    );
    
    // Combine and remove duplicates
    const allPositions = [...deptPositions, ...generalPositions];
    return allPositions.filter((pos, index, self) =>
      index === self.findIndex(p => p.title === pos.title && p.level === pos.level)
    );
  }, [formData.department, departments, positions]);

  // Memoize the available managers
  const availableManagers = useMemo(() => {
    if (isCEO || !formData.department) return [];
    return employees.filter(e =>
      e.department === formData.department &&
      e.id !== formData.id &&
      (e.position.toLowerCase().includes('manager') ||
       e.position.toLowerCase().includes('director') ||
       e.position.toLowerCase().includes('head'))
    );
  }, [formData.department, employees, formData.id, isCEO]);


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
                onChange={(e) => handleChange({ 
                  target: { 
                    name: 'photo', 
                    files: e.target.files 
                  } 
                })}
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
          {/* Department field */}
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
                <option 
                  key={`${pos.title}-${idx}`} 
                  value={pos.title}
                >
                  {pos.title} ({pos.level})
                </option>
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
                disabled={isCEO}
              >
                <option value="">Select Manager or Department</option>
                {/* Option to report to department */}
                {formData.department && (
                  <option value={`dept-${formData.department}`}>
                    {formData.department} (Department)
                  </option>
                )}
                {/* Available managers */}
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