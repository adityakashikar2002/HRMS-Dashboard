// import React, { useState } from 'react';
// import { toast } from 'react-toastify';

// const DepartmentForm = ({ onCancel, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     access: {
//       employees: false,
//       attendance: false,
//       payroll: false,
//       hiring: false
//     }
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleAccessChange = (e) => {
//     const { name, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       access: { ...prev.access, [name]: checked }
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (!formData.name.trim()) {
//       toast.error('Department name is required');
//       return;
//     }

//     const access = Object.entries(formData.access)
//       .filter(([_, value]) => value)
//       .map(([key]) => key);

//     onSubmit({
//       name: formData.name.trim(),
//       description: formData.description.trim(),
//       access
//     });
//   };

//   return (
//     <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
//       <h3 className="text-lg font-medium text-gray-800 mb-4">Create New Department</h3>
      
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Department Name*</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//             required
//           />
//         </div>
        
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//             rows="3"
//           />
//         </div>
        
//         <div className="mb-6">
//           <label className="block text-gray-700 mb-2">Default Access Permissions</label>
//           {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {Object.entries(formData.access).map(([key, value]) => (
//               <div key={key} className="flex items-center bg-gray-50 p-3 rounded-lg">
//                 <input
//                   type="checkbox"
//                   id={`new-dept-${key}`}
//                   name={key}
//                   checked={value}
//                   onChange={handleAccessChange}
//                   className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
//                 />
//                 <label htmlFor={`new-dept-${key}`} className="ml-2 capitalize text-gray-700">
//                   {key}
//                 </label>
//               </div>
//             ))}
//           </div> */}
//           <div className="flex flex-wrap gap-2 mb-4">
//             {['Dashboard', 'Tasks', 'Inbox', 'Calendar', 'Projects'].map(access => (
//               <span 
//                 key={access}
//                 className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
//               >
//                 {access}
//               </span>
//             ))}
//           </div>          
//         </div>
        
//         <div className="flex justify-end space-x-3">
//           <button
//             type="button"
//             onClick={onCancel}
//             className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Create Department
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default DepartmentForm;


import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FiX, FiBriefcase, FiFileText, FiCheck } from 'react-icons/fi';

const DepartmentForm = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Department name is required');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSubmit({
      name: formData.name.trim(),
      description: formData.description.trim(),
      access: []
    });
    
    setIsSubmitting(false);
  };

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold flex items-center">
            <FiBriefcase className="mr-2" /> Create New Department
          </h3>
          <button
            onClick={onCancel}
            className="p-1 rounded-full hover:bg-blue-700 transition-colors"
          >
            <FiX className="text-lg" />
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Department Name*</label>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="e.g. Human Resources"
              required
            />
          </div>
        </div>
        
        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            rows="3"
            placeholder="Brief description of the department's purpose..."
          />
        </div>
        
        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-3">Default Access Permissions</label>
          <div className="flex flex-wrap gap-3">
            {['Dashboard', 'Tasks', 'Inbox', 'Calendar', 'Projects'].map(access => (
              <motion.div
                key={access}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium flex items-center"
              >
                <FiCheck className="mr-1" /> {access}
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
          <motion.button
            type="button"
            onClick={onCancel}
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-lg text-white transition-all flex items-center ${
              isSubmitting 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-md'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </>
            ) : (
              <>
                <FiBriefcase className="mr-2" /> Create Department
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default DepartmentForm;