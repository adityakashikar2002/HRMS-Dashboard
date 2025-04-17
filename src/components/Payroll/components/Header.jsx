import React, { useContext } from 'react';
import { PayrollContext } from '../context/PayrollContext';

const Header = () => {
  const { searchTerm, setSearchTerm } = useContext(PayrollContext);

  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
      <h1 className="text-gray-900 text-lg font-normal mb-3 sm:mb-0">Payrolls</h1>
      <form className="flex items-center w-full sm:w-auto border border-gray-300 rounded-md px-3 py-1.5 text-gray-400 text-sm focus-within:text-gray-600 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
        <input
          className="outline-none bg-transparent w-full sm:w-48 text-sm"
          placeholder="Search anything .."
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="ml-2 text-gray-400 hover:text-gray-600" type="submit">
          <i className="fas fa-search"></i>
        </button>
      </form>
      <div className="flex items-center space-x-3 mt-3 sm:mt-0">
        <button className="p-2 rounded-md hover:bg-gray-100 text-gray-600 border border-gray-200" type="button">
          <i className="far fa-envelope"></i>
        </button>
        <button className="p-2 rounded-md hover:bg-gray-100 text-gray-600 border border-gray-200" type="button">
          <i className="fas fa-copy"></i>
        </button>
        <div className="flex -space-x-2">
          <img
            alt="Profile avatar"
            className="w-8 h-8 rounded-full border-2 border-white"
            src="https://storage.googleapis.com/a1aa/image/42901a16-a6fc-4bca-e89f-44915b71f68f.jpg"
          />
          <img
            alt="Profile avatar"
            className="w-8 h-8 rounded-full border-2 border-white"
            src="https://storage.googleapis.com/a1aa/image/3a5218ca-faf6-4cc1-084d-b21dc32264bc.jpg"
          />
          <img
            alt="Profile avatar"
            className="w-8 h-8 rounded-full border-2 border-white"
            src="https://storage.googleapis.com/a1aa/image/26cd26ca-2b97-4f41-39e8-6adefa2d5ea4.jpg"
          />
          <span className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 text-xs font-semibold text-gray-600 flex items-center justify-center">
            +10
          </span>
        </div>
        <button className="flex items-center space-x-1 border border-gray-300 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-50 btn" type="button">
          <i className="fas fa-user-plus"></i>
          <span>Invite</span>
        </button>
      </div>
    </header>
  );
};

export default Header;