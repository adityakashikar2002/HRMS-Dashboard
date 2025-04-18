// import React, { useState } from 'react';

// const InfoAlert = () => {
//   const [isVisible, setIsVisible] = useState(true);

//   if (!isVisible) return null;

//   return (
//     <div className="flex items-center justify-between bg-green-50 border border-green-200 text-green-800 text-sm rounded-md px-4 py-2 mb-4">
//       <div className="flex items-center space-x-2">
//         <i className="fas fa-info-circle"></i>
//         <p className="leading-tight">
//           Payroll submission for the current pay period is due in 2 days. Review and finalize all employee payroll details.
//         </p>
//       </div>
//       <button 
//         className="uppercase text-xs font-semibold hover:underline text-green-700" 
//         type="button"
//         onClick={() => {}}
//       >
//         MORE DETAILS
//       </button>
//       <button 
//         className="text-green-700 hover:text-green-900 ml-2" 
//         type="button"
//         onClick={() => setIsVisible(false)}
//       >
//         <i className="fas fa-times"></i>
//       </button>
//     </div>
//   );
// };

// export default InfoAlert;





// src/components/InfoAlert.jsx
import React, { useState } from 'react';

const InfoAlert = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="flex items-center justify-between bg-green-50 border border-green-200 text-green-800 text-sm rounded-md px-4 py-2 mb-4">
      <div className="flex items-center space-x-2">
        <i className="fas fa-info-circle"></i>
        <p className="leading-tight">
          Payroll submission for the current month is due in 2 days. Ensure all PF, ESIC, and TDS deductions are calculated correctly before finalizing.
        </p>
      </div>
      <button 
        className="uppercase text-xs font-semibold hover:underline text-green-700" 
        type="button"
        onClick={() => {}}
      >
        MORE DETAILS
      </button>
      <button 
        className="text-green-700 hover:text-green-900 ml-2" 
        type="button"
        onClick={() => setIsVisible(false)}
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default InfoAlert;