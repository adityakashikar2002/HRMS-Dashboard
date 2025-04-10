import { useState } from 'react';
import Button from '../UI/Button';
import EmployeeForm from './EmployeeForm';

const EmployeeDetails = ({ 
  employee = {}, 
  employees = [],
  positions = [],
  isEditing = false, 
  onEditToggle = () => {},
  onUpdate = () => {},
  onDelete = () => {},
  onClose = () => {}
}) => {
  const [employeeData, setEmployeeData] = useState({
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
    photo: '',
    ...employee
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(employeeData);
  };

  // Safe manager lookup
  const getManagerName = () => {
    if (!employeeData.managerId) return 'None';
    const manager = Array.isArray(employees) 
      ? employees.find(e => e?.id === employeeData.managerId)
      : null;
    return manager ? `${manager.firstName} ${manager.lastName}` : 'Unknown';
  };

  const positionColors = {
    'CEO': 'bg-gradient-to-r from-purple-600 to-indigo-600',
    'Manager': 'bg-gradient-to-r from-blue-600 to-cyan-500',
    'Director': 'bg-gradient-to-r from-green-600 to-teal-500',
    'Engineer': 'bg-gradient-to-r from-yellow-500 to-amber-500',
    'Specialist': 'bg-gradient-to-r from-pink-500 to-rose-500',
    'default': 'bg-gradient-to-r from-gray-600 to-gray-500'
  };

  const getPositionColor = (position) => {
    if (!position) return positionColors.default;
    const key = Object.keys(positionColors).find(key => 
      position.toLowerCase().includes(key.toLowerCase())
    );
    return key ? positionColors[key] : positionColors.default;
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      <div className={`p-6 ${getPositionColor(employeeData.position)}`}>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {employeeData.firstName || ''} {employeeData.lastName || ''}
            </h2>
            <p className="text-white/90">{employeeData.position || ''}</p>
          </div>
          <Button 
            variant="ghost"
            className="text-white hover:bg-white/10"
            onClick={onClose}
            icon="times"
          />
        </div>
      </div>

      <div className="p-6">
        {!isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* View Mode Content */}
            <div className="md:col-span-1">
              <div className="flex flex-col items-center">
                <div className="relative">
                  {employeeData.photo ? (
                    <img 
                      src={employeeData.photo} 
                      alt="Profile" 
                      className="w-32 h-32 rounded-full mb-4 border-4 border-white shadow-lg object-cover"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-4 border-4 border-white shadow-lg">
                      <span className="text-4xl font-bold text-gray-600">
                        {employeeData.firstName?.charAt(0) || ''}{employeeData.lastName?.charAt(0) || ''}
                      </span>
                    </div>
                  )}
                  {isEditing && (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              handleChange({ target: { name: 'photo', value: event.target.result } });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="absolute -bottom-2 left-0 right-0 mx-auto w-32 text-sm text-gray-500 opacity-0"
                        id="profile-photo-upload"
                      />
                      <label 
                        htmlFor="profile-photo-upload"
                        className="absolute -bottom-2 left-0 right-0 mx-auto w-32 px-2 py-1 bg-blue-600 text-white text-xs rounded-full cursor-pointer text-center"
                      >
                        Change Photo
                      </label>
                    </>
                  )}
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold">{employee.position}</h3>
                  <p className="text-gray-600">{employee.department}</p>
                </div>

                <div className="w-full space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Employee ID</h4>
                    <p className="text-gray-800 font-mono">{employee.id}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Employment Type</h4>
                    <p className="text-gray-800 capitalize">
                      {employee.employmentType.replace('-', ' ')}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Hire Date</h4>
                    <p className="text-gray-800">
                      {new Date(employee.hireDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Manager</h4>
                  <p className="text-gray-800">{getManagerName()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                  <p className="text-gray-800">{employee.phone}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="text-sm font-medium text-gray-500">Address</h4>
                  <p className="text-gray-800">{employee.address}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Salary</h4>
                  <p className="text-gray-800 font-medium">
                    {employee.salaryType === 'hourly' 
                      ? `Rs.${employee.salary}/hr` 
                      : employee.salaryType === 'monthly'
                        ? `Rs.${employee.salary}/mo`
                        : `Rs.${employee.salary}/yr`}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Manager</h4>
                  <p className="text-gray-800">
                    {employee.managerId 
                      ? employees.find(e => e.id === employee.managerId)?.fullName 
                      : 'None'}
                  </p>
                </div>
              </div>

              {employee.skills?.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-4">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {employee.skills.map(skill => (
                      <span 
                        key={skill} 
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {employee.hasBonus && (
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-2">Signing Bonus</h4>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                    <div className="flex">
                      <div className="flex-shrink-0 text-yellow-500 font-bold">
                        Rs.{employee.bonusAmount}
                      </div>
                      <div className="ml-3">
                        {employee.bonusDescription && (
                          <p className="text-yellow-700">
                            {employee.bonusDescription}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <EmployeeForm
            employeeData={employeeData}
            onChange={handleChange}
            currentStep={3}
            employees={employees}
            positions={positions}
            isEditMode={true}
          />
        )}

        <div className="mt-8 flex justify-between">
          <Button 
            variant="danger"
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this employee?')) {
                onDelete(employeeData.id);
              }
            }}
            icon="trash"
          >
            Delete Employee
          </Button>
          <div className="space-x-4">
            <Button 
              variant="outline" 
              onClick={onClose}
            >
              Close
            </Button>
            <Button 
              variant={isEditing ? 'success' : 'primary'}
              onClick={isEditing ? handleSubmit : onEditToggle}
              icon={isEditing ? 'save' : 'edit'}
            >
              {isEditing ? 'Save Changes' : 'Edit Details'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;


// // src/components/Employee/EmployeeDetails.jsx
// import { useState } from 'react';
// import { Button } from '../UI';
// import EmployeeForm from './EmployeeForm';

// const EmployeeDetails = ({ 
//   employee = {}, 
//   employees = [],
//   departments = [],
//   positions = [],
//   isEditing = false, 
//   onEditToggle = () => {},
//   onUpdate = () => {},
//   onDelete = () => {},
//   onClose = () => {}
// }) => {
//   const [employeeData, setEmployeeData] = useState({
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
//     salaryType: 'annual',
//     hasBonus: false,
//     bonusAmount: '',
//     bonusDescription: '',
//     photo: '',
//     ...employee
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmployeeData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onUpdate(employeeData);
//   };

//   const getManagerName = () => {
//     if (!employeeData.managerId) return 'None';
//     const manager = employees.find(e => e.id === employeeData.managerId);
//     return manager ? `${manager.firstName} ${manager.lastName}` : 'Unknown';
//   };

//   const getDepartmentName = () => {
//     if (!employeeData.departmentId) return 'None';
//     const department = departments.find(d => d.id === employeeData.departmentId);
//     return department ? department.name : 'Unknown';
//   };

//   const getPositionName = () => {
//     if (!employeeData.positionId) return 'None';
//     const position = positions.find(p => p.id === employeeData.positionId);
//     return position ? position.title : 'Unknown';
//   };

//   const getPositionColor = (positionId) => {
//     if (!positionId) return 'bg-gray-600';
//     const position = positions.find(p => p.id === positionId);
    
//     if (!position) return 'bg-gray-600';
    
//     const colors = {
//       'C-Level': 'bg-gradient-to-r from-purple-600 to-indigo-600',
//       'Director': 'bg-gradient-to-r from-blue-600 to-cyan-500',
//       'Manager': 'bg-gradient-to-r from-green-600 to-teal-500',
//       'Senior': 'bg-gradient-to-r from-yellow-500 to-amber-500',
//       'default': 'bg-gradient-to-r from-gray-600 to-gray-500'
//     };
    
//     return colors[position.level] || colors.default;
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-xl overflow-hidden">
//       <div className={`p-6 ${getPositionColor(employeeData.positionId)}`}>
//         <div className="flex justify-between items-start">
//           <div>
//             <h2 className="text-2xl font-bold text-white">
//               {employeeData.firstName} {employeeData.lastName}
//             </h2>
//             <p className="text-white/90">{getPositionName()}</p>
//           </div>
//           <Button 
//             variant="ghost"
//             className="text-white hover:bg-white/10"
//             onClick={onClose}
//             icon="times"
//           />
//         </div>
//       </div>

//       <div className="p-6">
//         {!isEditing ? (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="md:col-span-1">
//               <div className="flex flex-col items-center">
//                 <div className="relative">
//                   {employeeData.photo ? (
//                     <img 
//                       src={employeeData.photo} 
//                       alt="Profile" 
//                       className="w-32 h-32 rounded-full mb-4 border-4 border-white shadow-lg object-cover"
//                     />
//                   ) : (
//                     <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-4 border-4 border-white shadow-lg">
//                       <span className="text-4xl font-bold text-gray-600">
//                         {employeeData.firstName?.charAt(0)}{employeeData.lastName?.charAt(0)}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//                 <div className="text-center mb-6">
//                   <h3 className="text-xl font-semibold">{getPositionName()}</h3>
//                   <p className="text-gray-600">{getDepartmentName()}</p>
//                 </div>

//                 <div className="w-full space-y-4">
//                   <div>
//                     <h4 className="text-sm font-medium text-gray-500">Employee ID</h4>
//                     <p className="text-gray-800 font-mono">{employee.id}</p>
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-medium text-gray-500">Employment Type</h4>
//                     <p className="text-gray-800 capitalize">
//                       {employeeData.employmentType.replace('-', ' ')}
//                     </p>
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-medium text-gray-500">Hire Date</h4>
//                     <p className="text-gray-800">
//                       {new Date(employeeData.hireDate).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="md:col-span-2">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500">Department</h4>
//                   <p className="text-gray-800">{getDepartmentName()}</p>
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500">Manager</h4>
//                   <p className="text-gray-800">{getManagerName()}</p>
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500">Phone</h4>
//                   <p className="text-gray-800">{employeeData.phone}</p>
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500">Email</h4>
//                   <p className="text-gray-800">{employeeData.email}</p>
//                 </div>
//                 <div className="md:col-span-2">
//                   <h4 className="text-sm font-medium text-gray-500">Address</h4>
//                   <p className="text-gray-800">{employeeData.address}</p>
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500">Salary</h4>
//                   <p className="text-gray-800 font-medium">
//                     {employeeData.salaryType === 'hourly' 
//                       ? `Rs.${employeeData.salary}/hr` 
//                       : employeeData.salaryType === 'monthly'
//                         ? `Rs.${employeeData.salary}/mo`
//                         : `Rs.${employeeData.salary}/yr`}
//                   </p>
//                 </div>
//               </div>

//               {employeeData.skills?.length > 0 && (
//                 <div className="mt-8">
//                   <h4 className="text-lg font-semibold mb-4">Skills</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {employeeData.skills.map(skill => (
//                       <span 
//                         key={skill} 
//                         className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {employeeData.hasBonus && (
//                 <div className="mt-8">
//                   <h4 className="text-lg font-semibold mb-2">Signing Bonus</h4>
//                   <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
//                     <div className="flex">
//                       <div className="flex-shrink-0 text-yellow-500 font-bold">
//                         Rs.{employeeData.bonusAmount}
//                       </div>
//                       <div className="ml-3">
//                         {employeeData.bonusDescription && (
//                           <p className="text-yellow-700">
//                             {employeeData.bonusDescription}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         ) : (
//           <EmployeeForm
//             employeeData={employeeData}
//             onChange={handleChange}
//             currentStep={3}
//             departments={departments}
//             positions={positions}
//             employees={employees}
//             isEditMode={true}
//           />
//         )}

//         <div className="mt-8 flex justify-between">
//           <Button 
//             variant="danger"
//             onClick={() => {
//               if (window.confirm('Are you sure you want to delete this employee?')) {
//                 onDelete(employeeData.id);
//               }
//             }}
//             icon="trash"
//           >
//             Delete Employee
//           </Button>
//           <div className="space-x-4">
//             <Button 
//               variant="outline" 
//               onClick={onClose}
//             >
//               Close
//             </Button>
//             <Button 
//               variant={isEditing ? 'success' : 'primary'}
//               onClick={isEditing ? handleSubmit : onEditToggle}
//               icon={isEditing ? 'save' : 'edit'}
//             >
//               {isEditing ? 'Save Changes' : 'Edit Details'}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeDetails;