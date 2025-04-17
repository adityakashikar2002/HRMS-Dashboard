import React, { useContext } from 'react';
import { PayrollContext } from '../context/PayrollContext';

const Alert = () => {
  const { alert, setAlert } = useContext(PayrollContext);

  if (!alert.show) return null;

  return (
    <div className={`flex items-center justify-between bg-${alert.type === 'info' ? 'green' : 'red'}-50 border border-${alert.type === 'info' ? 'green' : 'red'}-200 text-${alert.type === 'info' ? 'green' : 'red'}-800 text-sm rounded-md px-4 py-2 mb-4`}>
      <div className="flex items-center space-x-2">
        <i className={`fas fa-${alert.type === 'info' ? 'info-circle' : 'exclamation-triangle'}`}></i>
        <p className="leading-tight">{alert.message}</p>
      </div>
      <div className="flex items-center">
        <button className="uppercase text-xs font-semibold hover:underline text-green-700" type="button">
          MORE DETAILS
        </button>
        <button 
          className="text-green-700 hover:text-green-900 ml-2" 
          type="button"
          onClick={() => setAlert({...alert, show: false})}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default Alert;