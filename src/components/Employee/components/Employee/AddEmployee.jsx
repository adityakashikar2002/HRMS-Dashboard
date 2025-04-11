import { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import Modal from '../UI/Modal';
import ProgressSteps from '../UI/ProgressSteps';

const AddEmployee = ({ employees, onSave, onCancel, departments = [], positions = [] }) => {
  const [currentStep, setCurrentStep] = useState(1);
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
    const newEmployee = {
      ...employeeData,
      id: `emp-${Date.now()}`,
      fullName: `${employeeData.firstName} ${employeeData.lastName}`,
    };
    onSave(newEmployee);
  };

  const steps = [
    { number: 1, title: 'Personal Details' },
    { number: 2, title: 'Job Details' },
    { number: 3, title: 'Compensation' },
  ];

  return (
    <Modal onClose={onCancel} title="Add New Employee">
      <div className="mb-6">
        <ProgressSteps steps={steps} currentStep={currentStep} />
      </div>

      <EmployeeForm
        employeeData={employeeData}
        onChange={handleChange}
        currentStep={currentStep}
        employees={employees}
        departments={departments}
        positions={positions}
      />

      <div className="flex justify-between mt-8">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={() => setCurrentStep(currentStep - 1)}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>
        ) : (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        )}

        {currentStep < steps.length ? (
          <button
            type="button"
            onClick={() => setCurrentStep(currentStep + 1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Employee
          </button>
        )}
      </div>
    </Modal>
  );
};

export default AddEmployee;