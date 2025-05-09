import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faEllipsisH,} from '@fortawesome/free-solid-svg-icons';

const AttendanceReport = () => {
  return (
    <div className="bg-gray-100">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-semibold">Attendance Report</h1>
            <button className="text-gray-500">
              <FontAwesomeIcon icon={faInfoCircle} />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            {/* <div className="flex items-center border rounded-lg px-3 py-1">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              <span>01 March 2025</span>
            </div> */}
            <input className="p-2 border border-gray-300 rounded-lg mr-2" type="date" />
            <button className="border rounded-lg px-3 py-1">
              <FontAwesomeIcon icon={faEllipsisH} />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mb-6">
          <div className="text-center">
            <p className="text-4xl font-bold">173</p>
            <p className="text-gray-500">Total Employees</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">128</p>
            <p className="text-gray-500">On Time</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">21</p>
            <p className="text-gray-500">Absent</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">24</p>
            <p className="text-gray-500">Late</p>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-7">
          <div className="text-right text-gray-500">200</div>
          <div className="grid grid-cols-11 gap-2 col-span-11">
            <div className="h-7 w-7 bg-blue-200"></div>
            <div className="h-7 w-7 bg-blue-300"></div>
            <div className="h-7 w-7 bg-blue-400"></div>
            <div className="h-7 w-7 bg-blue-500"></div>
            <div className="h-7 w-7 bg-blue-200"></div>
            <div className="h-7 w-7 bg-blue-300"></div>
            <div className="h-7 w-7 bg-blue-400"></div>
            <div className="h-7 w-7 bg-blue-500"></div>
            <div className="h-7 w-7 bg-blue-200"></div>
            <div className="h-7 w-7 bg-blue-300"></div>
            <div className="h-7 w-7 bg-blue-400"></div>
          </div>
          <div className="text-right text-gray-500">100</div>
          <div className="grid grid-cols-11 gap-2 col-span-11">
            <div className="h-7 w-7 bg-blue-300"></div>
            <div className="h-7 w-7 bg-blue-400"></div>
            <div className="h-7 w-7 bg-blue-500"></div>
            <div className="h-7 w-7 bg-blue-200"></div>
            <div className="h-7 w-7 bg-blue-300"></div>
            <div className="h-7 w-7 bg-blue-400"></div>
            <div className="h-7 w-7 bg-blue-500"></div>
            <div className="h-7 w-7 bg-blue-200"></div>
            <div className="h-7 w-7 bg-blue-300"></div>
            <div className="h-7 w-7 bg-blue-400"></div>
            <div className="h-7 w-7 bg-blue-500"></div>
          </div>
          <div className="text-right text-gray-500">50</div>
          <div className="grid grid-cols-11 gap-2 col-span-11">
            <div className="h-7 w-7 bg-blue-400"></div>
            <div className="h-7 w-7 bg-blue-500"></div>
            <div className="h-7 w-7 bg-blue-200"></div>
            <div className="h-7 w-7 bg-blue-300"></div>
            <div className="h-7 w-7 bg-blue-400"></div>
            <div className="h-7 w-7 bg-blue-500"></div>
            <div className="h-7 w-7 bg-blue-200"></div>
            <div className="h-7 w-7 bg-blue-300"></div>
            <div className="h-7 w-7 bg-blue-400"></div>
            <div className="h-7 w-7 bg-blue-500"></div>
            <div className="h-7 w-7 bg-blue-200"></div>
          </div>
          <div className="text-right text-gray-500">10</div>
          <div className="grid grid-cols-11 gap-2 col-span-11">
            <div className="h-7 w-7 bg-blue-500"></div>
            <div className="h-7 w-7 bg-blue-200"></div>
            <div className="h-7 w-7 bg-blue-300"></div>
            <div className="h-7 w-7 bg-blue-400"></div>
            <div className="h-7 w-7 bg-blue-500"></div>
            <div className="h-7 w-7 bg-blue-200"></div>
            <div className="h-7 w-7 bg-blue-300"></div>
            <div className="h-7 w-7 bg-blue-400"></div>
            <div className="h-7 w-7 bg-blue-500"></div>
            <div className="h-7 w-7 bg-blue-200"></div>
            <div className="h-7 w-7 bg-blue-300"></div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2 mt-2">
          <div></div>
          <div className="text-center text-gray-500 col-span-2">Jan</div>
          <div className="text-center text-gray-500 col-span-2">Feb</div>
          <div className="text-center text-gray-500 col-span-2">Mar</div>
          <div className="text-center text-gray-500 col-span-2">Apr</div>
          <div className="text-center text-gray-500 col-span-2">May</div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;

