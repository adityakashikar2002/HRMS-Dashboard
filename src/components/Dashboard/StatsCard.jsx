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