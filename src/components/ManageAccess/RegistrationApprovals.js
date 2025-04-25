// // src/components/ManageAccess/RegistrationApprovals.js
// import React, { useState, useEffect } from 'react';
// import { getPendingRegistrations, updateApprovalStatus } from '../../data/users';
// import { getDepartmentById } from '../../data/departments';
// import { toast } from 'react-toastify';
// import emailjs from 'emailjs-com';

// const RegistrationApprovals = () => {
//   const [pendingRegistrations, setPendingRegistrations] = useState([]);

//   useEffect(() => {
//     setPendingRegistrations(getPendingRegistrations());
//   }, []);

//   const handleApproval = (userId, status) => {
//     const success = updateApprovalStatus(userId, status);
//     if (success) {
//       setPendingRegistrations(getPendingRegistrations());
      
//       // Find the user to send email
//       const user = pendingRegistrations.find(u => u.id === userId);
//       if (user) {
//         sendApprovalEmail(user, status);
//       }
      
//       toast.success(`Registration ${status}`);
//     } else {
//       toast.error('Failed to update status');
//     }
//   };

//   // const sendApprovalEmail = (user, status) => {
//   //   const templateParams = {
//   //     to_name: user.name,
//   //     to_email: user.email,
//   //     status: status,
//   //     login_url: `${window.location.origin}/login`
//   //   };

//   //   emailjs.send(
//   //     process.env.REACT_APP_EMAILJS_SERVICE_ID,
//   //     process.env.REACT_APP_EMAILJS_TEMPLATE_ID2,
//   //     templateParams,
//   //     process.env.REACT_APP_EMAILJS_USER_ID
//   //   ).then(response => {
//   //     console.log('Email sent successfully:', response);
//   //   }, error => {
//   //     console.error('Failed to send email:', error);
//   //   });
//   // };

//   const sendApprovalEmail = (user, status) => {
//     const templateParams = {
//       to_name: user.name,
//       to_email: user.email,
//       login_url: `${window.location.origin}/login`
//     };
  
//     // Choose template based on approval status
//     const templateId = status === 'approved' 
//       ? process.env.REACT_APP_EMAILJS_TEMPLATE_ID2S  // Replace with your approval template ID
//       : process.env.REACT_APP_EMAILJS_TEMPLATE_IDS; // Replace with your rejection template ID
  
//     emailjs.send(
//       process.env.REACT_APP_EMAILJS_SERVICE_IDS, // Your service ID
//       templateId,
//       templateParams,
//       process.env.REACT_APP_EMAILJS_USER_IDS // Your user ID
//     ).then(response => {
//       console.log('Email sent successfully:', response);
//     }, error => {
//       console.error('Failed to send email:', error);
//     });
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Registration Approvals</h2>
      
//       {pendingRegistrations.length > 0 ? (
//         <div className="space-y-4">
//           {pendingRegistrations.map(user => (
//             <div key={user.id} className="border rounded-lg p-4 hover:bg-gray-50">
//               <div className="flex items-start space-x-4">
//                 <img 
//                   src={user.avatar} 
//                   alt={user.name} 
//                   className="w-12 h-12 rounded-full"
//                 />
//                 <div className="flex-1">
//                   <h3 className="font-medium text-gray-800">{user.name}</h3>
//                   <p className="text-sm text-gray-600">{user.email}</p>
                  
//                   <div className="mt-3">
//                     <p className="text-sm font-medium text-gray-700 mb-1">Registered for Department</p>
//                     <p className="text-sm">
//                       {user.registeredDepartmentId 
//                         ? (getDepartmentById(user.registeredDepartmentId)?.name || 'Unknown Department')
//                         : 'No department selected'}
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => handleApproval(user.id, 'approved')}
//                     className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() => handleApproval(user.id, 'rejected')}
//                     className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500">No pending registrations</p>
//       )}
//     </div>
//   );
// };

// export default RegistrationApprovals;

// //works 1000
// import React, { useState, useEffect } from 'react';
// import { getPendingRegistrations, updateApprovalStatus } from '../../data/users';
// import { getDepartmentById } from '../../data/departments';
// import { toast } from 'react-toastify';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiUser, FiMail, FiBriefcase, FiCheck, FiX, FiClock } from 'react-icons/fi';
// import emailjs from 'emailjs-com';

// const RegistrationApprovals = () => {
//   const [pendingRegistrations, setPendingRegistrations] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isSendingEmail, setIsSendingEmail] = useState(false);

//   // Initialize EmailJS (should be done once when the app loads, but we'll do it here for completeness)
//   useEffect(() => {
//     emailjs.init(process.env.REACT_APP_EMAILJS_USER_ID);
//   }, []);

//   useEffect(() => {
//     const loadData = async () => {
//       setIsLoading(true);
//       await new Promise(resolve => setTimeout(resolve, 800));
//       setPendingRegistrations(getPendingRegistrations());
//       setIsLoading(false);
//     };
//     loadData();
//   }, []);

//   const sendApprovalEmail = async (user, status) => {
//     setIsSendingEmail(true);
    
//     try {
//       const templateId = status === 'approved' 
//         ? process.env.REACT_APP_EMAILJS_TEMPLATE_ID2
//         : process.env.REACT_APP_EMAILJS_TEMPLATE_ID;

//       const templateParams = {
//         to_name: user.name,
//         to_email: user.email,
//         status: status,
//         login_url: `${window.location.origin}/login`,
//         department: user.registeredDepartmentId 
//           ? getDepartmentById(user.registeredDepartmentId)?.name 
//           : 'No department assigned',
//         date: new Date().toLocaleDateString('en-US', { 
//           weekday: 'long', 
//           year: 'numeric', 
//           month: 'long', 
//           day: 'numeric' 
//         })
//       };

//       await emailjs.send(
//         process.env.REACT_APP_EMAILJS_SERVICE_ID,
//         templateId,
//         templateParams
//       );

//       console.log('Email successfully sent!');
//       return true;
//     } catch (error) {
//       console.error('Failed to send email:', error);
//       toast.error('Failed to send notification email');
//       return false;
//     } finally {
//       setIsSendingEmail(false);
//     }
//   };

//   const handleApproval = async (userId, status) => {
//     setIsLoading(true);
    
//     try {
//       const user = pendingRegistrations.find(u => u.id === userId);
//       if (!user) return;

//       // First update the approval status
//       const success = await updateApprovalStatus(userId, status);
//       if (!success) {
//         throw new Error('Failed to update approval status');
//       }

//       // Then send the appropriate email
//       const emailSent = await sendApprovalEmail(user, status);
//       if (!emailSent) {
//         console.warn('Status updated but email failed to send');
//       }

//       // Refresh the list
//       setPendingRegistrations(getPendingRegistrations());
      
//       toast.success(`Registration ${status}`, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     } catch (error) {
//       console.error('Approval process failed:', error);
//       toast.error(`Failed to ${status} registration`);
//     } finally {
//       setIsLoading(false);
//       setSelectedUser(null);
//     }
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.3 }
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//       <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
//         <h2 className="text-2xl font-bold flex items-center">
//           <FiClock className="mr-3" /> Registration Approvals
//         </h2>
//       </div>
      
//       <div className="p-6">
//         {isLoading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-pulse flex flex-col items-center">
//               <div className="w-16 h-16 bg-blue-100 rounded-full mb-4"></div>
//               <div className="h-4 bg-blue-100 rounded w-3/4"></div>
//             </div>
//           </div>
//         ) : pendingRegistrations.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {pendingRegistrations.map((user, index) => (
//               <motion.div
//                 key={user.id}
//                 variants={cardVariants}
//                 initial="hidden"
//                 animate="visible"
//                 transition={{ delay: index * 0.1 }}
//                 onClick={() => setSelectedUser(user)}
//                 className="border rounded-xl p-5 hover:shadow-md transition-all cursor-pointer bg-white"
//               >
//                 <div className="flex items-start space-x-4">
//                   <div className="relative">
//                     <img 
//                       src={user.avatar} 
//                       alt={user.name} 
//                       className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
//                     />
//                     <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-white rounded-full p-1 flex items-center justify-center w-5 h-5">
//                       <FiClock size={10} />
//                     </div>
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="font-semibold text-gray-800">{user.name}</h3>
//                     <p className="text-sm text-gray-600 flex items-center mt-1">
//                       <FiMail className="mr-1" /> {user.email}
//                     </p>
                    
//                     <div className="mt-3">
//                       <p className="text-xs font-medium text-gray-500 mb-1 flex items-center">
//                         <FiBriefcase className="mr-1" /> REGISTERED FOR DEPARTMENT
//                       </p>
//                       <p className="text-sm font-medium">
//                         {user.registeredDepartmentId 
//                           ? (getDepartmentById(user.registeredDepartmentId)?.name) || 'Unknown Department'
//                           : 'No department selected'}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="text-center py-12"
//           >
//             <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
//               <FiCheck className="text-gray-400 text-3xl" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">No Pending Approvals</h3>
//             <p className="text-gray-500">All registration requests have been processed</p>
//           </motion.div>
//         )}
//       </div>

//       {/* User Detail Modal */}
//       <AnimatePresence>
//         {selectedUser && (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//             onClick={() => !isSendingEmail && setSelectedUser(null)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white rounded-2xl w-full max-w-md overflow-hidden"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-xl font-semibold">Review Registration</h3>
//                   <button
//                     onClick={() => !isSendingEmail && setSelectedUser(null)}
//                     disabled={isSendingEmail}
//                     className="p-1 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
//                   >
//                     <FiX className="text-lg" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="p-6">
//                 <div className="flex flex-col items-center mb-6">
//                   <img 
//                     src={selectedUser.avatar} 
//                     alt={selectedUser.name} 
//                     className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg mb-4"
//                   />
//                   <h4 className="font-bold text-gray-800 text-lg">{selectedUser.name}</h4>
//                   <p className="text-gray-600 flex items-center">
//                     <FiMail className="mr-1" /> {selectedUser.email}
//                   </p>
//                 </div>
                
//                 <div className="space-y-4 mb-6">
//                   <div>
//                     <p className="text-xs font-medium text-gray-500 mb-1">REGISTERED DEPARTMENT</p>
//                     <p className="font-medium">
//                       {selectedUser.registeredDepartmentId 
//                         ? (getDepartmentById(selectedUser.registeredDepartmentId)?.name || 'Unknown Department')
//                         : 'No department selected'}
//                     </p>
//                   </div>
                  
//                   {/* <div>
//                     <p className="text-xs font-medium text-gray-500 mb-1">REGISTRATION DATE</p>
//                     <p className="font-medium">{new Date(selectedUser.registrationDate).toLocaleDateString()}</p>
//                   </div> */}
                  
//                   <div>
//                     <p className="text-xs font-medium text-gray-500 mb-1">ROLE</p>
//                     <p className="font-medium capitalize">{selectedUser.role || 'employee'}</p>
//                   </div>
//                 </div>
                
//                 <div className="flex space-x-3 pt-4 border-t border-gray-100">
//                   <motion.button
//                     whileHover={{ scale: 1.03 }}
//                     whileTap={{ scale: 0.97 }}
//                     onClick={() => handleApproval(selectedUser.id, 'rejected')}
//                     disabled={isSendingEmail}
//                     className={`flex-1 px-4 py-3 rounded-lg font-medium flex items-center justify-center transition-colors ${
//                       isSendingEmail 
//                         ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                         : 'bg-red-100 text-red-700 hover:bg-red-200'
//                     }`}
//                   >
//                     {isSendingEmail ? (
//                       'Processing...'
//                     ) : (
//                       <>
//                         <FiX className="mr-2" /> Reject
//                       </>
//                     )}
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.03 }}
//                     whileTap={{ scale: 0.97 }}
//                     onClick={() => handleApproval(selectedUser.id, 'approved')}
//                     disabled={isSendingEmail}
//                     className={`flex-1 px-4 py-3 rounded-lg font-medium flex items-center justify-center transition-colors ${
//                       isSendingEmail 
//                         ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                         : 'bg-green-100 text-green-700 hover:bg-green-200'
//                     }`}
//                   >
//                     {isSendingEmail ? (
//                       'Processing...'
//                     ) : (
//                       <>
//                         <FiCheck className="mr-2" /> Approve
//                       </>
//                     )}
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default RegistrationApprovals;

import React, { useState, useEffect } from 'react';
import { getPendingRegistrations, updateApprovalStatus } from '../../data/users';
import { getDepartmentById } from '../../data/departments';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiBriefcase, FiCheck, FiX, FiClock } from 'react-icons/fi';
import emailjs from 'emailjs-com';

const RegistrationApprovals = ({ onApprovalProcessed }) => {
  const [pendingRegistrations, setPendingRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  useEffect(() => {
    emailjs.init(process.env.REACT_APP_EMAILJS_USER_ID);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setPendingRegistrations(getPendingRegistrations());
      setIsLoading(false);
    };
    loadData();
  }, []);

  const sendApprovalEmail = async (user, status) => {
    setIsSendingEmail(true);
    
    try {
      const templateId = status === 'approved' 
        ? process.env.REACT_APP_EMAILJS_TEMPLATE_ID2
        : process.env.REACT_APP_EMAILJS_TEMPLATE_ID;

      const templateParams = {
        to_name: user.name,
        to_email: user.email,
        status: status,
        login_url: `${window.location.origin}/login`,
        department: user.registeredDepartmentId 
          ? getDepartmentById(user.registeredDepartmentId)?.name 
          : 'No department assigned',
        date: new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      };

      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        templateId,
        templateParams
      );

      console.log('Email successfully sent!');
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      toast.error('Failed to send notification email');
      return false;
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleApproval = async (userId, status) => {
    setIsLoading(true);
    
    try {
      const user = pendingRegistrations.find(u => u.id === userId);
      if (!user) return;

      const success = await updateApprovalStatus(userId, status);
      if (!success) {
        throw new Error('Failed to update approval status');
      }

      const emailSent = await sendApprovalEmail(user, status);
      if (!emailSent) {
        console.warn('Status updated but email failed to send');
      }

      setPendingRegistrations(getPendingRegistrations());
      
      toast.success(`Registration ${status}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Call the callback to update the counter in parent
      if (onApprovalProcessed) {
        onApprovalProcessed();
      }
    } catch (error) {
      console.error('Approval process failed:', error);
      toast.error(`Failed to ${status} registration`);
    } finally {
      setIsLoading(false);
      setSelectedUser(null);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
        <h2 className="text-2xl font-bold flex items-center">
          <FiClock className="mr-3" /> Registration Approvals
        </h2>
      </div>
      
      <div className="p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mb-4"></div>
              <div className="h-4 bg-blue-100 rounded w-3/4"></div>
            </div>
          </div>
        ) : pendingRegistrations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pendingRegistrations.map((user, index) => (
              <motion.div
                key={user.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedUser(user)}
                className="border rounded-xl p-5 hover:shadow-md transition-all cursor-pointer bg-white"
              >
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-white rounded-full p-1 flex items-center justify-center w-5 h-5">
                      <FiClock size={10} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{user.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <FiMail className="mr-1" /> {user.email}
                    </p>
                    
                    <div className="mt-3">
                      <p className="text-xs font-medium text-gray-500 mb-1 flex items-center">
                        <FiBriefcase className="mr-1" /> REGISTERED FOR DEPARTMENT
                      </p>
                      <p className="text-sm font-medium">
                        {user.registeredDepartmentId 
                          ? (getDepartmentById(user.registeredDepartmentId)?.name) || 'Unknown Department'
                          : 'No department selected'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-12"
          >
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <FiCheck className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Pending Approvals</h3>
            <p className="text-gray-500">All registration requests have been processed</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedUser && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => !isSendingEmail && setSelectedUser(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Review Registration</h3>
                  <button
                    onClick={() => !isSendingEmail && setSelectedUser(null)}
                    disabled={isSendingEmail}
                    className="p-1 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    <FiX className="text-lg" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <img 
                    src={selectedUser.avatar} 
                    alt={selectedUser.name} 
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg mb-4"
                  />
                  <h4 className="font-bold text-gray-800 text-lg">{selectedUser.name}</h4>
                  <p className="text-gray-600 flex items-center">
                    <FiMail className="mr-1" /> {selectedUser.email}
                  </p>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">REGISTERED DEPARTMENT</p>
                    <p className="font-medium">
                      {selectedUser.registeredDepartmentId 
                        ? (getDepartmentById(selectedUser.registeredDepartmentId)?.name || 'Unknown Department')
                        : 'No department selected'}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">ROLE</p>
                    <p className="font-medium capitalize">{selectedUser.role || 'employee'}</p>
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-4 border-t border-gray-100">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleApproval(selectedUser.id, 'rejected')}
                    disabled={isSendingEmail}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium flex items-center justify-center transition-colors ${
                      isSendingEmail 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {isSendingEmail ? (
                      'Processing...'
                    ) : (
                      <>
                        <FiX className="mr-2" /> Reject
                      </>
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleApproval(selectedUser.id, 'approved')}
                    disabled={isSendingEmail}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium flex items-center justify-center transition-colors ${
                      isSendingEmail 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {isSendingEmail ? (
                      'Processing...'
                    ) : (
                      <>
                        <FiCheck className="mr-2" /> Approve
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegistrationApprovals;