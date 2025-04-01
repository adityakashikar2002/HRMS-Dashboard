import React from 'react';
import './Header.css';
import { faSearch, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Header = () => {
  return (
    <div className="header p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center p-2 border border-gray-300 rounded-lg bg-gray-100">
          {/* <input className="p-2 border border-gray-300 rounded-lg" placeholder="Search..." type="text" />
           */}
          
          <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-gray-100 outline-none ml-2 flex-grow"
          />
          {/* <div className="flex items-center bg-gray-200 p-1 rounded-md ml-2">
            <span className="text-gray-500 text-xs">⌘</span>
            <span className="text-gray-500 text-xs ml-1">K</span>
          </div> */}
          {/* <button className="ml-2 p-2 bg-blue-500 text-white rounded-lg">
            <i className="fas fa-search"></i>
          </button> */}
        </div>
        <div className="flex items-center">
          <button className="mr-2 p-2 bg-gray-200 rounded-lg">
            <FontAwesomeIcon icon={faInfoCircle} className="text-gray-500" />  
          </button>
          <button className="mr-2 p-2 bg-gray-200 rounded-lg">
            <i className="fas fa-cog"></i>
          </button>
          <button className="p-2 bg-gray-200 rounded-lg">
            <i className="fas fa-bell"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

