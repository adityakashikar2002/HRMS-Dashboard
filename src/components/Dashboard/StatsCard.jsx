// import React from 'react';

// const StatsCard = ({ title, value, change, description, trend }) => {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow">
//       <div className="flex justify-between items-center mb-2">
//         <p className="text-gray-500">{title}</p>
//         <i className="fas fa-ellipsis-h text-gray-500"></i>
//       </div>
//       <p className="text-2xl font-semibold">{value}</p>
//       <p className={`${trend === 'up' ? 'text-green-500' : 'text-red-500'} text-sm`}>
//         {change}
//       </p>
//       <p className="text-gray-500 text-sm">{description}</p>
//       <button className="mt-2 p-2 bg-gray-200 text-gray-700 rounded-lg">
//         Details
//       </button>
//     </div>
//   );
// };

// export default StatsCard;
// import React from 'react';

// const StatsCard = ({ title, value, change, description, trend }) => {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md h-full">
//       <div className="flex justify-between items-center">
//         <h2 className="text-gray-600">{title}</h2>
//         <i className="fas fa-ellipsis-h text-gray-400"></i>
//       </div>
//       <div className="mt-4 flex items-center">
//         <h1 className="text-3xl font-bold">{value}</h1>
//         <div className={`ml-2 ${trend === 'up' ? 'text-green-500 bg-green-100' : 'text-red-500 bg-red-100'} rounded-full px-2 py-1 text-sm`}>
//           {change}
//         </div>
//       </div>
//       <p className="text-gray-500 mt-2">{description}</p>
//       <button className="mt-4 bg-blue-100 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors">
//         Details <i className="fas fa-arrow-right ml-1"></i>
//       </button>
//     </div>
//   );
// };

// export default StatsCard;
import React from 'react';

const StatsCard = ({ title, value, change, description, trend }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-700 font-semibold">
          {title} 
          <i className="fas fa-info-circle text-gray-400 ml-1"></i>
        </h2>
        <i className="fas fa-ellipsis-h text-gray-400"></i>
      </div>
      
      <div className="flex items-center mb-10">
        <span className="text-3xl font-bold text-gray-800">{value}</span>
        <span className={`ml-2 text-sm ${trend === 'up' ? 'text-green-500 bg-green-100' : 'text-red-500 bg-red-100'} px-2 py-1 rounded-full flex items-center`}>
          <span className={`border ${trend === 'up' ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'} rounded-full p-1 mr-1`}>
            <i className={`fas fa-arrow-${trend === 'up' ? 'up' : 'down'}`}></i>
          </span>
          {change}
        </span>
      </div>
      
      <div className="flex justify-between items-center text-gray-500 text-sm bg-gray-100 p-2 rounded-lg">
        <p>{description}</p>
        <div className="flex items-center border border-gray-300 rounded-lg px-2 py-1 hover:bg-gray-50 cursor-pointer transition-colors">
          <button className="text-blue-500 text-sm font-semibold">Details</button>
          <i className="fas fa-arrow-right text-blue-500 ml-1"></i>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;