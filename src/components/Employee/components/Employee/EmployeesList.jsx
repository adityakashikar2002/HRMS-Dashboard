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




// // src/components/Employee/EmployeesList.jsx
// import EmployeeCard from './EmployeeCard';

// const EmployeesList = ({ employees = [], onEmployeeClick }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-md p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-gray-800">
//           All Employees ({employees.length})
//         </h2>
//         <div className="flex space-x-2">
//           <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
//             <option>All Departments</option>
//             <option>Engineering</option>
//             <option>Sales</option>
//             <option>HR</option>
//           </select>
//           <input 
//             type="text" 
//             placeholder="Search employees..." 
//             className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-64"
//           />
//         </div>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {employees.map(employee => (
//           <EmployeeCard 
//             key={employee.id} 
//             employee={employee} 
//             onClick={() => onEmployeeClick(employee.id)} 
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EmployeesList;