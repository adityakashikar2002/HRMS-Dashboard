import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faReply, faPrint, faStar } from '@fortawesome/free-solid-svg-icons';

const EmailPage = () => {
  return (
    <div className="bg-white text-gray-800">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">TokenWiz~NewPage</h1>
          <div className="flex space-x-2">
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm">Team</span>
            <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-sm">Mail</span>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <img 
            alt="Profile picture of Laura Mathews" 
            className="w-12 h-12 rounded-full" 
            height="50" 
            src="https://storage.googleapis.com/a1aa/image/qOEMKtx2eHCC1xqiG-quHjDrMo0PA5IiJFgOb1TnLyc.jpg" 
            width="50" 
          />
          
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold">Laura Mathews</h2>
                <p className="text-gray-500">
                  to Larry Hughes
                  <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
                </p>
              </div>
              <div className="text-gray-500 text-sm">
                <FontAwesomeIcon icon={faReply} className="mr-1" />
                <span>14 Jan, 2020</span>
              </div>
            </div>
            
            <div className="mt-4">
              <p>Hello team</p>
              <p className="mt-2">
                I am facing problem with the creation of a new page. Can you guys let me know what I am doing wrong? Please check attached files.
              </p>
              <p className="mt-2">Thank you</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end items-center mt-4 space-x-4">
          <FontAwesomeIcon icon={faPrint} className="text-gray-500" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
        </div>
      </div>
    </div>
  );
};

export default EmailPage;