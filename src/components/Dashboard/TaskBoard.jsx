import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faEllipsisH, faFilter, faPlus, faThLarge, faTable, faList } from '@fortawesome/free-solid-svg-icons';

const TaskBoard = () => {
  const tasks = {
    'New Request': {
      count: 3,
      color: 'text-blue-500',
      items: [
        {
          id: 1,
          title: 'Employee Onboarding Approval',
          tags: [
            { text: 'Recruitment', color: 'bg-blue-500' },
            { text: 'Compliance', color: 'bg-green-500' }
          ],
          description: 'A new onboarding request has been submitted for Jane Smith (Marketing Department). HR needs to verify the required documents, approve the onboarding process, and schedule an introduction meeting with the team.'
        }
      ]
    },
    'In Progress': {
      count: 6,
      color: 'text-yellow-500',
      items: [
        {
          id: 2,
          title: 'Payroll Processing',
          tags: [
            { text: 'Finance', color: 'bg-pink-500' },
            { text: 'Compensation', color: 'bg-orange-500' }
          ],
          description: 'HR and the finance team are calculating salaries, bonuses, tax deductions, and overtime pay. Any discrepancies need to be resolved before the final payroll submission on March 10.'
        }
      ]
    },
    'Complete': {
      count: 12,
      color: 'text-green-500',
      items: [
        {
          id: 3,
          title: 'Employee Satisfaction Survey',
          tags: [
            { text: 'Feedback', color: 'bg-purple-500' },
            { text: 'Engagement', color: 'bg-blue-500' }
          ],
          description: 'The HR team has gathered feedback from all departments and is now analyzing the results to identify key areas for improvement.'
        }
      ]
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="max-w-12xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold">Task</h1>
            <FontAwesomeIcon icon={faInfoCircle} className="text-gray-500" />
          </div>
          <div className="flex items-center space-x-4">
            <input type="date" className="px-4 py-2 border rounded-full" defaultValue="2025-03-01" />
            <button className="px-4 py-2 bg-gray-200 rounded-full flex items-center space-x-2">
              <FontAwesomeIcon icon={faFilter} />
              <span>Filter</span>
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <button className="px-4 py-2 bg-gray-200 rounded-full flex items-center space-x-2">
            <FontAwesomeIcon icon={faThLarge} />
            <span>Kanban</span>
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-full flex items-center space-x-2">
            <FontAwesomeIcon icon={faTable} />
            <span>Table</span>
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-full flex items-center space-x-2">
            <FontAwesomeIcon icon={faList} />
            <span>List View</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(tasks).map(([status, { count, color, items }]) => (
            <div key={status} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <span className={`${color} text-2xl`}>•</span>
                  <h2 className="text-lg font-semibold">{status}</h2>
                  <span className="text-gray-500">{count}</span>
                </div>
                <FontAwesomeIcon icon={faEllipsisH} className="text-gray-500" />
              </div>
              <div className="bg-gray-100 rounded-lg p-4 mb-4 text-center">
                <button className="text-gray-500">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow p-4 mb-4">
                  <div className="flex space-x-2 mb-2">
                    {item.tags.map((tag, index) => (
                      <span key={index} className={`${tag.color} text-white px-2 py-1 rounded-full text-xs`}>
                        {tag.text}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;