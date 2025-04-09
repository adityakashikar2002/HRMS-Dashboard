import Button from '../UI/Button';

const EmployeeDetails = ({ employee, onClose }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {employee.firstName} {employee.lastName}
        </h2>
        <Button variant="text" onClick={onClose}>
          <i className="fas fa-times"></i>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <span className="text-4xl font-semibold text-blue-600">
                {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-center">
              {employee.position}
            </h3>
            <p className="text-gray-600 text-center">{employee.department}</p>
          </div>

          <div className="mt-8 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Employee ID</h4>
              <p className="text-gray-800">{employee.id}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Employment Type</h4>
              <p className="text-gray-800 capitalize">{employee.employmentType}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Hire Date</h4>
              <p className="text-gray-800">{new Date(employee.hireDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Email</h4>
              <p className="text-gray-800">{employee.email}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Phone</h4>
              <p className="text-gray-800">{employee.phone}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Address</h4>
              <p className="text-gray-800">{employee.address}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Salary</h4>
              <p className="text-gray-800">
                {employee.salaryType === 'hourly' ? '$' + employee.salary + '/hr' : '$' + employee.salary + '/yr'}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-4">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {employee.skills?.map(skill => (
                <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {employee.hasBonus && (
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-2">Signing Bonus</h4>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="text-yellow-500">$</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-yellow-700 font-medium">
                      ${employee.bonusAmount}
                    </p>
                    {employee.bonusDescription && (
                      <p className="text-yellow-600 text-sm mt-1">
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

      <div className="mt-8 flex justify-end space-x-4">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary">
          Edit Details
        </Button>
      </div>
    </div>
  );
};

export default EmployeeDetails;