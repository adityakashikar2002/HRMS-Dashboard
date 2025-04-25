// AccessManagement.js
import React, { useState, useEffect } from 'react';
import { getDepartments, addDepartment } from '../../data/departments';
import { getUsersByDepartment, updateUserAccess, updateDepartmentAccess, getPendingRegistrations } from '../../data/users';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import DepartmentForm from './DepartmentForm';
import RegistrationApprovals from './RegistrationApprovals';
import { FiUsers, FiClock, FiDollarSign, FiBriefcase, FiPlus, FiChevronRight, FiArrowLeft } from 'react-icons/fi';
import { RiShieldUserLine } from 'react-icons/ri';

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
      // Simulate API loading
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-800 mb-4 md:mb-0"
          >
            Access Management
          </motion.h2>
          
          <motion.div 
            className="flex space-x-2 bg-white rounded-xl p-1 shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => setActiveTab('departments')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'departments' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
              }`}
            >
              Departments
            </button>
            <button
              onClick={() => {
                setActiveTab('approvals');
                loadPendingRegistrationsCount();
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                activeTab === 'approvals' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
              }`}
            >
              Registration Approvals
              {pendingRegistrationsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {pendingRegistrationsCount}
                </span>
              )}
            </button>
          </motion.div>
        </div>
        
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-blue-100 h-12 w-12"></div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {activeTab === 'departments' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Department List */}
                  <motion.div 
                    className="lg:col-span-1"
                    variants={cardVariants}
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold text-gray-700 text-lg">Departments</h4>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsCreatingDepartment(true)}
                          className="flex items-center text-sm bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-all"
                        >
                          <FiPlus className="mr-1" /> New
                        </motion.button>
                      </div>
                      
                      <ul className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                        {departments.map((dept, index) => (
                          <motion.li 
                            key={dept.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleDepartmentSelect(dept)}
                            className={`p-4 rounded-xl cursor-pointer transition-all group ${
                              selectedDepartment?.id === dept.id 
                                ? 'bg-blue-50 border-l-4 border-blue-500 shadow-inner' 
                                : 'hover:bg-gray-50 hover:shadow-sm'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                                  {dept.name}
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                  {getUsersByDepartment(dept.id).length} employees
                                </div>
                              </div>
                              <FiChevronRight className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    <AnimatePresence mode="wait">
                      {isCreatingDepartment ? (
                        <motion.div
                          key="department-form"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <DepartmentForm 
                            onCancel={() => setIsCreatingDepartment(false)}
                            onSubmit={handleCreateDepartment}
                          />
                        </motion.div>
                      ) : selectedDepartment ? (
                        <>
                          {/* Department Access */}
                          <motion.div 
                            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                            variants={cardVariants}
                          >
                            <h3 className="text-xl font-semibold text-gray-800 mb-6">
                              {selectedEmployee 
                                ? (
                                  <div className="flex items-center">
                                    <button 
                                      onClick={() => setSelectedEmployee(null)}
                                      className="mr-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
                                    >
                                      <FiArrowLeft className="text-gray-500" />
                                    </button>
                                    <span>Custom Access for <span className="text-blue-600">{selectedEmployee.name}</span></span>
                                  </div>
                                )
                                : `Default Access for ${selectedDepartment.name} Department`
                              }
                            </h3>
                            
                            <div className="mb-6">
                              <h4 className="text-md font-medium text-gray-700 mb-3">Default Access (All Employees)</h4>
                              <div className="flex flex-wrap gap-3 mb-6">
                                {['Dashboard', 'Tasks', 'Inbox', 'Calendar', 'Projects'].map(access => (
                                  <motion.span 
                                    key={access}
                                    whileHover={{ y: -2 }}
                                    className="px-3 py-1.5 bg-green-50 text-green-700 text-xs rounded-full font-medium flex items-center"
                                  >
                                    <RiShieldUserLine className="mr-1" /> {access}
                                  </motion.span>
                                ))}
                              </div>
                              
                              <h4 className="text-md font-medium text-gray-700 mb-3">Additional Access</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(accessSettings).map(([key, value]) => (
                                  <motion.div 
                                    key={key}
                                    whileHover={{ y: -2 }}
                                    className={`flex items-center p-4 rounded-xl cursor-pointer transition-all ${
                                      value ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 hover:bg-gray-100'
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      id={`access-${key}`}
                                      name={key}
                                      checked={value}
                                      onChange={handleAccessChange}
                                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                                    />
                                    <label htmlFor={`access-${key}`} className="ml-3 capitalize text-gray-700 font-medium flex items-center">
                                      {key === 'employees' && <FiUsers className="mr-2" />}
                                      {key === 'attendance' && <FiClock className="mr-2" />}
                                      {key === 'payroll' && <FiDollarSign className="mr-2" />}
                                      {key === 'hiring' && <FiBriefcase className="mr-2" />}
                                      {key}
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
                                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-md"
                              >
                                {selectedEmployee ? 'Save Employee Access' : 'Save Department Access'}
                              </motion.button>
                            </div>
                          </motion.div>

                          {/* Employees List */}
                          <motion.div 
                            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                            variants={cardVariants}
                            transition={{ delay: 0.1 }}
                          >
                            <h3 className="text-lg font-semibold text-gray-800 mb-6">
                              Employees in {selectedDepartment.name}
                            </h3>
                            
                            {departmentEmployees.length > 0 ? (
                              <div className="space-y-4">
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
                                        : 'hover:bg-gray-50 hover:shadow-sm border-gray-100'
                                    }`}
                                  >
                                    <div className="relative">
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
                                    <div className="flex-1">
                                      <p className="font-medium text-gray-800">{emp.name}</p>
                                      <p className="text-sm text-gray-500">{emp.email}</p>
                                    </div>
                                    <FiChevronRight className="text-gray-400" />
                                  </motion.div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-8">
                                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                  <FiUsers className="text-gray-400 text-3xl" />
                                </div>
                                <p className="text-gray-500">No employees in this department</p>
                              </div>
                            )}
                          </motion.div>
                        </>
                      ) : (
                        <motion.div 
                          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="mx-auto w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                            <FiBriefcase className="text-blue-500 text-5xl" />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Department Selected</h3>
                          <p className="text-gray-500 mb-6">Select a department from the list or create a new one to manage access permissions</p>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsCreatingDepartment(true)}
                            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-md"
                          >
                            Create New Department
                          </motion.button>
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