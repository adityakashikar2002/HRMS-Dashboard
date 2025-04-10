// // src/components/Employee/DepartmentManager.jsx
// import { useState } from 'react';
// import { Modal, Button } from '../UI';

// const DepartmentManager = ({ 
//   departments = [], 
//   positions = [],
//   employees = [],
//   onAddDepartment,
//   onUpdateDepartment,
//   onDeleteDepartment,
//   onClose 
// }) => {
//   const [isAdding, setIsAdding] = useState(false);
//   const [isEditing, setIsEditing] = useState(null);
//   const [departmentData, setDepartmentData] = useState({
//     name: '',
//     parentId: '',
//     headPositionId: '',
//     description: ''
//   });

//   const handleEditDepartment = (department) => {
//     setIsEditing(department.id);
//     setDepartmentData(department);
//   };

//   const handleSaveDepartment = () => {
//     if (isEditing) {
//       onUpdateDepartment(departmentData);
//     } else {
//       onAddDepartment({
//         id: `dep-${Date.now()}`,
//         ...departmentData
//       });
//     }
//     setIsEditing(null);
//     setIsAdding(false);
//     setDepartmentData({
//       name: '',
//       parentId: '',
//       headPositionId: '',
//       description: ''
//     });
//   };

//   const handleDeleteDepartment = (id) => {
//     if (window.confirm('Are you sure you want to delete this department?')) {
//       onDeleteDepartment(id);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDepartmentData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const getPossibleParentDepartments = (currentId) => {
//     return departments.filter(d => d.id !== currentId);
//   };

//   const getPossibleHeadPositions = () => {
//     if (!departmentData.parentId) {
//       // For top-level departments, show executive positions
//       return positions.filter(p => 
//         p.level === 'C-Level' || p.level === 'Director'
//       );
//     }
//     // For sub-departments, show manager-level positions
//     return positions.filter(p => 
//       p.level === 'Manager' || p.level === 'Director'
//     );
//   };

//   return (
//     <Modal onClose={onClose} title="Manage Departments" size="lg">
//       <div className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {departments.map(dept => (
//             <div key={dept.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative">
//               {isEditing !== dept.id ? (
//                 <>
//                   <h3 className="font-semibold text-gray-800">{dept.name}</h3>
//                   <div className="flex justify-between mt-2">
//                     <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
//                       {dept.parentId 
//                         ? departments.find(d => d.id === dept.parentId)?.name || 'Sub-department'
//                         : 'Top-level department'}
//                     </span>
//                   </div>
//                   {dept.description && (
//                     <p className="text-sm text-gray-600 mt-2">{dept.description}</p>
//                   )}
//                   <div className="flex justify-end space-x-2 mt-4">
//                     <Button 
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => handleEditDepartment(dept)}
//                       icon="edit"
//                     />
//                     <Button 
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => handleDeleteDepartment(dept.id)}
//                       icon="trash"
//                       className="text-red-500 hover:text-red-700"
//                     />
//                   </div>
//                 </>
//               ) : (
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={departmentData.name}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                       required
//                       autoFocus
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Parent Department</label>
//                     <select
//                       name="parentId"
//                       value={departmentData.parentId || ''}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                     >
//                       <option value="">None (Top-level)</option>
//                       {getPossibleParentDepartments(dept.id).map(parent => (
//                         <option key={parent.id} value={parent.id}>{parent.name}</option>
//                       ))}
//                     </select>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Head Position*</label>
//                     <select
//                       name="headPositionId"
//                       value={departmentData.headPositionId || ''}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                       required
//                     >
//                       <option value="">Select Head Position</option>
//                       {getPossibleHeadPositions().map(pos => (
//                         <option key={pos.id} value={pos.id}>{pos.title}</option>
//                       ))}
//                     </select>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                     <textarea
//                       name="description"
//                       value={departmentData.description}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                       rows="2"
//                     />
//                   </div>
                  
//                   <div className="flex justify-end space-x-2">
//                     <Button 
//                       variant="outline"
//                       onClick={() => setIsEditing(null)}
//                     >
//                       Cancel
//                     </Button>
//                     <Button 
//                       variant="primary"
//                       onClick={handleSaveDepartment}
//                       disabled={!departmentData.name.trim() || !departmentData.headPositionId}
//                     >
//                       Save Changes
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {isAdding ? (
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={departmentData.name}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                 required
//                 autoFocus
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Parent Department</label>
//               <select
//                 name="parentId"
//                 value={departmentData.parentId || ''}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//               >
//                 <option value="">None (Top-level)</option>
//                 {departments.map(parent => (
//                   <option key={parent.id} value={parent.id}>{parent.name}</option>
//                 ))}
//               </select>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Head Position*</label>
//               <select
//                 name="headPositionId"
//                 value={departmentData.headPositionId || ''}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                 required
//               >
//                 <option value="">Select Head Position</option>
//                 {getPossibleHeadPositions().map(pos => (
//                   <option key={pos.id} value={pos.id}>{pos.title}</option>
//                 ))}
//               </select>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//               <textarea
//                 name="description"
//                 value={departmentData.description}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                 rows="2"
//               />
//             </div>
            
//             <div className="flex justify-end space-x-2">
//               <Button 
//                 variant="outline"
//                 onClick={() => setIsAdding(false)}
//               >
//                 Cancel
//               </Button>
//               <Button 
//                 variant="primary"
//                 onClick={handleSaveDepartment}
//                 disabled={!departmentData.name.trim() || !departmentData.headPositionId}
//               >
//                 Add Department
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <Button 
//             variant="primary"
//             onClick={() => setIsAdding(true)}
//             icon="plus"
//           >
//             Add New Department
//           </Button>
//         )}
//       </div>
//     </Modal>
//   );
// };

// export default DepartmentManager;

// // src/components/Employee/DepartmentManager.jsx
// import { useState } from 'react';
// import { Modal, Button } from '../UI';

// const DepartmentManager = ({ 
//   departments = [], 
//   positions = [],
//   employees = [],
//   onAddDepartment,
//   onUpdateDepartment,
//   onDeleteDepartment,
//   onClose 
// }) => {
//   const [isAdding, setIsAdding] = useState(false);
//   const [isEditing, setIsEditing] = useState(null);
//   const [isSubDepartment, setIsSubDepartment] = useState(false);
//   const [departmentData, setDepartmentData] = useState({
//     name: '',
//     parentId: '',
//     headPositionId: '',
//     description: '',
//     isSubDepartment: false
//   });

//   const handleEditDepartment = (department) => {
//     setIsEditing(department.id);
//     setIsSubDepartment(department.isSubDepartment || false);
//     setDepartmentData(department);
//   };

//   const handleSaveDepartment = () => {
//     const departmentToSave = {
//       ...departmentData,
//       isSubDepartment,
//       headPositionId: departmentData.headPositionId || null
//     };

//     if (isEditing) {
//       onUpdateDepartment(departmentToSave);
//     } else {
//       onAddDepartment({
//         id: `dep-${Date.now()}`,
//         ...departmentToSave
//       });
//     }
//     resetForm();
//   };

//   const resetForm = () => {
//     setIsEditing(null);
//     setIsAdding(false);
//     setIsSubDepartment(false);
//     setDepartmentData({
//       name: '',
//       parentId: '',
//       headPositionId: '',
//       description: '',
//       isSubDepartment: false
//     });
//   };

//   const handleDeleteDepartment = (id) => {
//     if (window.confirm('Are you sure you want to delete this department?')) {
//       onDeleteDepartment(id);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDepartmentData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const getPossibleParentDepartments = () => {
//     return departments.filter(d => !d.isSubDepartment);
//   };

//   const getPossibleHeadPositions = () => {
//     if (!departmentData.parentId && !isSubDepartment) {
//       // For top-level departments, show executive positions
//       return positions.filter(p => 
//         p.level === 'C-Level' || p.level === 'Director'
//       );
//     }
//     // For sub-departments, show manager-level positions
//     return positions.filter(p => 
//       p.level === 'Manager' || p.level === 'Director'
//     );
//   };

//   const getDepartmentPositions = (deptName) => {
//     return positions.filter(p => p.department === deptName);
//   };

//   return (
//     <Modal onClose={onClose} title="Manage Departments" size="lg">
//       <div className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {departments.map(dept => (
//             <div key={dept.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative">
//               {isEditing !== dept.id ? (
//                 <>
//                   <div className="flex justify-between items-start">
//                     <h3 className="font-semibold text-gray-800">{dept.name}</h3>
//                     {dept.isSubDepartment && (
//                       <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
//                         Sub-department
//                       </span>
//                     )}
//                   </div>
//                   <div className="flex justify-between mt-2">
//                     {dept.parentId ? (
//                       <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
//                         Reports to: {departments.find(d => d.id === dept.parentId)?.name}
//                       </span>
//                     ) : (
//                       <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
//                         Top-level department
//                       </span>
//                     )}
//                   </div>
//                   {dept.description && (
//                     <p className="text-sm text-gray-600 mt-2">{dept.description}</p>
//                   )}
//                   <div className="mt-4">
//                     <h4 className="text-sm font-medium text-gray-500 mb-1">Positions</h4>
//                     <div className="flex flex-wrap gap-1">
//                       {getDepartmentPositions(dept.name).map(pos => (
//                         <span key={pos.id} className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
//                           {pos.title}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="flex justify-end space-x-2 mt-4">
//                     <Button 
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => handleEditDepartment(dept)}
//                       icon="edit"
//                     />
//                     <Button 
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => handleDeleteDepartment(dept.id)}
//                       icon="trash"
//                       className="text-red-500 hover:text-red-700"
//                     />
//                   </div>
//                 </>
//               ) : (
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={departmentData.name}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                       required
//                       autoFocus
//                     />
//                   </div>
                  
//                   <div className="flex items-center">
//                     <input
//                       id="is-sub-dept"
//                       name="isSubDepartment"
//                       type="checkbox"
//                       checked={isSubDepartment}
//                       onChange={(e) => setIsSubDepartment(e.target.checked)}
//                       className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                     />
//                     <label htmlFor="is-sub-dept" className="ml-2 block text-sm text-gray-700">
//                       Is Sub-department
//                     </label>
//                   </div>
                  
//                   {(isSubDepartment || departmentData.isSubDepartment) && (
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Parent Department*</label>
//                       <select
//                         name="parentId"
//                         value={departmentData.parentId || ''}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                         required
//                       >
//                         <option value="">Select Parent Department</option>
//                         {getPossibleParentDepartments().map(parent => (
//                           <option key={parent.id} value={parent.id}>{parent.name}</option>
//                         ))}
//                       </select>
//                     </div>
//                   )}
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Head Position*</label>
//                     <select
//                       name="headPositionId"
//                       value={departmentData.headPositionId || ''}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                       required
//                     >
//                       <option value="">Select Head Position</option>
//                       {getPossibleHeadPositions().map(pos => (
//                         <option key={pos.id} value={pos.id}>{pos.title}</option>
//                       ))}
//                     </select>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                     <textarea
//                       name="description"
//                       value={departmentData.description}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                       rows="2"
//                     />
//                   </div>
                  
//                   <div className="flex justify-end space-x-2">
//                     <Button 
//                       variant="outline"
//                       onClick={resetForm}
//                     >
//                       Cancel
//                     </Button>
//                     <Button 
//                       variant="primary"
//                       onClick={handleSaveDepartment}
//                       disabled={!departmentData.name.trim() || !departmentData.headPositionId}
//                     >
//                       Save Changes
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {isAdding ? (
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={departmentData.name}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                 required
//                 autoFocus
//               />
//             </div>
            
//             <div className="flex items-center">
//               <input
//                 id="new-is-sub-dept"
//                 name="isSubDepartment"
//                 type="checkbox"
//                 checked={isSubDepartment}
//                 onChange={(e) => setIsSubDepartment(e.target.checked)}
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <label htmlFor="new-is-sub-dept" className="ml-2 block text-sm text-gray-700">
//                 Is Sub-department
//               </label>
//             </div>
            
//             {isSubDepartment && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Parent Department*</label>
//                 <select
//                   name="parentId"
//                   value={departmentData.parentId || ''}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                   required
//                 >
//                   <option value="">Select Parent Department</option>
//                   {getPossibleParentDepartments().map(parent => (
//                     <option key={parent.id} value={parent.id}>{parent.name}</option>
//                   ))}
//                 </select>
//               </div>
//             )}
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Head Position*</label>
//               <select
//                 name="headPositionId"
//                 value={departmentData.headPositionId || ''}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                 required
//               >
//                 <option value="">Select Head Position</option>
//                 {getPossibleHeadPositions().map(pos => (
//                   <option key={pos.id} value={pos.id}>{pos.title}</option>
//                 ))}
//               </select>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//               <textarea
//                 name="description"
//                 value={departmentData.description}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                 rows="2"
//               />
//             </div>
            
//             <div className="flex justify-end space-x-2">
//               <Button 
//                 variant="outline"
//                 onClick={resetForm}
//               >
//                 Cancel
//               </Button>
//               <Button 
//                 variant="primary"
//                 onClick={handleSaveDepartment}
//                 disabled={!departmentData.name.trim() || !departmentData.headPositionId}
//               >
//                 Add Department
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <Button 
//             variant="primary"
//             onClick={() => setIsAdding(true)}
//             icon="plus"
//           >
//             Add New Department
//           </Button>
//         )}
//       </div>
//     </Modal>
//   );
// };

// export default DepartmentManager;



// src/components/Employee/DepartmentManager.jsx
import { useState } from 'react';
import { Modal, Button } from '../UI';

const DepartmentManager = ({ 
  departments = [], 
  positions = [],
  employees = [],
  onAddDepartment,
  onUpdateDepartment,
  onDeleteDepartment,
  onClose 
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [isSubDepartment, setIsSubDepartment] = useState(false);
  const [departmentData, setDepartmentData] = useState({
    name: '',
    parentId: '',
    headPositionId: '',
    description: '',
    isSubDepartment: false
  });

  const handleEditDepartment = (department) => {
    setIsEditing(department.id);
    setIsSubDepartment(department.isSubDepartment || false);
    setDepartmentData(department);
  };

  const handleSaveDepartment = () => {
    const departmentToSave = {
      ...departmentData,
      isSubDepartment,
      headPositionId: departmentData.headPositionId || null
    };

    if (isEditing) {
      onUpdateDepartment(departmentToSave);
    } else {
      onAddDepartment({
        id: `dep-${Date.now()}`,
        ...departmentToSave,
        // New departments are under CEO by default unless it's a sub-department
        parentId: isSubDepartment ? departmentData.parentId : 'ceo-root'
      });
    }
    resetForm();
  };

  const resetForm = () => {
    setIsEditing(null);
    setIsAdding(false);
    setIsSubDepartment(false);
    setDepartmentData({
      name: '',
      parentId: '',
      headPositionId: '',
      description: '',
      isSubDepartment: false
    });
  };

  const handleDeleteDepartment = (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      onDeleteDepartment(id);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartmentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getPossibleParentDepartments = () => {
    return departments.filter(d => !d.isSubDepartment);
  };

  const getPossibleHeadPositions = () => {
    if (!isSubDepartment) {
      // For top-level departments, show executive positions
      return positions.filter(p => 
        p.level === 'C-Level' || p.level === 'Director'
      );
    }
    // For sub-departments, show manager-level positions
    return positions.filter(p => 
      p.level === 'Manager' || p.level === 'Director'
    );
  };

  const getDepartmentPositions = (deptName) => {
    return positions.filter(p => p.department === deptName);
  };

  return (
    <Modal onClose={onClose} title="Manage Departments" size="lg">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {departments.map(dept => (
            <div key={dept.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative">
              {isEditing !== dept.id ? (
                <>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-800">{dept.name}</h3>
                    {dept.isSubDepartment && (
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                        Sub-department
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between mt-2">
                    {dept.parentId === 'ceo-root' ? (
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                        Reports to CEO
                      </span>
                    ) : dept.parentId ? (
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                        Reports to: {departments.find(d => d.id === dept.parentId)?.name}
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                        Top-level department
                      </span>
                    )}
                  </div>
                  {dept.description && (
                    <p className="text-sm text-gray-600 mt-2">{dept.description}</p>
                  )}
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Positions</h4>
                    <div className="flex flex-wrap gap-1">
                      {getDepartmentPositions(dept.name).map(pos => (
                        <span key={pos.id} className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
                          {pos.title}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button 
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditDepartment(dept)}
                      icon="edit"
                    />
                    <Button 
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteDepartment(dept.id)}
                      icon="trash"
                      className="text-red-500 hover:text-red-700"
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={departmentData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      required
                      autoFocus
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="is-sub-dept"
                      name="isSubDepartment"
                      type="checkbox"
                      checked={isSubDepartment}
                      onChange={(e) => setIsSubDepartment(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="is-sub-dept" className="ml-2 block text-sm text-gray-700">
                      Is Sub-department
                    </label>
                  </div>
                  
                  {isSubDepartment && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Parent Department*</label>
                      <select
                        name="parentId"
                        value={departmentData.parentId || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required={isSubDepartment}
                      >
                        <option value="">Select Parent Department</option>
                        {getPossibleParentDepartments().map(parent => (
                          <option key={parent.id} value={parent.id}>{parent.name}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Head Position*</label>
                    <select
                      name="headPositionId"
                      value={departmentData.headPositionId || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      required
                    >
                      <option value="">Select Head Position</option>
                      {getPossibleHeadPositions().map(pos => (
                        <option key={pos.id} value={pos.id}>{pos.title}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={departmentData.description}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      rows="2"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline"
                      onClick={resetForm}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="primary"
                      onClick={handleSaveDepartment}
                      disabled={!departmentData.name.trim() || !departmentData.headPositionId}
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {isAdding ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
              <input
                type="text"
                name="name"
                value={departmentData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
                autoFocus
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="new-is-sub-dept"
                name="isSubDepartment"
                type="checkbox"
                checked={isSubDepartment}
                onChange={(e) => setIsSubDepartment(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="new-is-sub-dept" className="ml-2 block text-sm text-gray-700">
                Is Sub-department
              </label>
            </div>
            
            {isSubDepartment && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent Department*</label>
                <select
                  name="parentId"
                  value={departmentData.parentId || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required={isSubDepartment}
                >
                  <option value="">Select Parent Department</option>
                  {getPossibleParentDepartments().map(parent => (
                    <option key={parent.id} value={parent.id}>{parent.name}</option>
                  ))}
                </select>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Head Position*</label>
              <select
                name="headPositionId"
                value={departmentData.headPositionId || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Head Position</option>
                {getPossibleHeadPositions().map(pos => (
                  <option key={pos.id} value={pos.id}>{pos.title}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={departmentData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                rows="2"
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline"
                onClick={resetForm}
              >
                Cancel
              </Button>
              <Button 
                variant="primary"
                onClick={handleSaveDepartment}
                disabled={!departmentData.name.trim() || !departmentData.headPositionId}
              >
                Add Department
              </Button>
            </div>
          </div>
        ) : (
          <Button 
            variant="primary"
            onClick={() => setIsAdding(true)}
            icon="plus"
          >
            Add New Department
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default DepartmentManager;