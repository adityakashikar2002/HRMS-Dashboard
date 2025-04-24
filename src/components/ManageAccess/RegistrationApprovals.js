// src/components/ManageAccess/RegistrationApprovals.js
import React, { useState, useEffect } from 'react';
import { getPendingRegistrations, updateApprovalStatus } from '../../data/users';
import { getDepartmentById } from '../../data/departments';
import { toast } from 'react-toastify';
import emailjs from 'emailjs-com';

const RegistrationApprovals = () => {
  const [pendingRegistrations, setPendingRegistrations] = useState([]);

  useEffect(() => {
    setPendingRegistrations(getPendingRegistrations());
  }, []);

  const handleApproval = (userId, status) => {
    const success = updateApprovalStatus(userId, status);
    if (success) {
      setPendingRegistrations(getPendingRegistrations());
      
      // Find the user to send email
      const user = pendingRegistrations.find(u => u.id === userId);
      if (user) {
        sendApprovalEmail(user, status);
      }
      
      toast.success(`Registration ${status}`);
    } else {
      toast.error('Failed to update status');
    }
  };

  const sendApprovalEmail = (user, status) => {
    const templateParams = {
      to_name: user.name,
      to_email: user.email,
      status: status,
      login_url: `${window.location.origin}/login`
    };

    emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID2,
      templateParams,
      process.env.REACT_APP_EMAILJS_USER_ID
    ).then(response => {
      console.log('Email sent successfully:', response);
    }, error => {
      console.error('Failed to send email:', error);
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Registration Approvals</h2>
      
      {pendingRegistrations.length > 0 ? (
        <div className="space-y-4">
          {pendingRegistrations.map(user => (
            <div key={user.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-start space-x-4">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Registered for Department</p>
                    <p className="text-sm">
                      {user.registeredDepartmentId 
                        ? (getDepartmentById(user.registeredDepartmentId)?.name || 'Unknown Department')
                        : 'No department selected'}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleApproval(user.id, 'approved')}
                    className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApproval(user.id, 'rejected')}
                    className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No pending registrations</p>
      )}
    </div>
  );
};

export default RegistrationApprovals;