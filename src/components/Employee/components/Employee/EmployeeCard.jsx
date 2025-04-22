const EmployeeCard = ({ employee, onClick }) => {
    return (
      <div 
        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-start space-x-4">
          {/* <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-xl font-semibold text-blue-600">
                {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
              </span>
            </div>
          </div> */}
          <div className="flex-shrink-0">
            {employee.photo ? (
              <img 
                src={employee.photo} 
                alt="Profile" 
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-xl font-semibold text-blue-600">
                  {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">
              {employee.firstName} {employee.lastName}
            </h3>
            <p className="text-sm text-gray-600">{employee.position}</p>
            <p className="text-sm text-gray-500 mt-1">{employee.department}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {employee.skills?.slice(0, 3).map(skill => (
                <span key={skill} className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
                  {skill}
                </span>
              ))}
              {employee.skills?.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
                  +{employee.skills.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default EmployeeCard;