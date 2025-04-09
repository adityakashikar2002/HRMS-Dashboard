import EmployeeCard from './EmployeeCard';

const EmployeesList = ({ employees, onEmployeeClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">All Employees ({employees.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map(employee => (
          <EmployeeCard 
            key={employee.id} 
            employee={employee} 
            onClick={() => onEmployeeClick(employee.id)} 
          />
        ))}
      </div>
    </div>
  );
};

export default EmployeesList;