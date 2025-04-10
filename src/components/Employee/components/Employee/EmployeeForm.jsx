const EmployeeForm = ({ employeeData, onChange, currentStep, employees }) => {
    return (
      <form className="space-y-6">
        {currentStep === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={employeeData.firstName}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={employeeData.lastName}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
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
  
        {currentStep === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <input
                type="text"
                name="position"
                value={employeeData.position}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                name="department"
                value={employeeData.department}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Department</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="Engineering">Engineering</option>
                <option value="HR">Human Resources</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Manager</label>
              <select
                name="managerId"
                value={employeeData.managerId}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">No Manager</option>
                {employees.filter(e => e.position.toLowerCase().includes('manager')).map(manager => (
                  <option key={manager.id} value={manager.id}>
                    {manager.firstName} {manager.lastName} ({manager.position})
                  </option>
                ))}
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
                value={employeeData.skills.join(', ')}
                onChange={(e) => {
                  const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                  onChange({ target: { name: 'skills', value: skills } });
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        )}
  
        {currentStep === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary Type</label>
              <select
                name="salaryType"
                value={employeeData.salaryType || 'annual'}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="annual">Annual</option>
                <option value="hourly">Hourly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {employeeData.salaryType === 'hourly' ? 'Hourly Rate' : 'Annual Salary'}
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  $
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
                      $
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