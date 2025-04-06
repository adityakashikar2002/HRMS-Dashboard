// components/HolidaysView.jsx
import { format, startOfYear, endOfYear, eachMonthOfInterval, isSameMonth } from 'date-fns';

const HolidaysView = ({ holidays, onClose }) => {
  const currentYear = new Date().getFullYear();
  const yearStart = startOfYear(new Date());
  const yearEnd = endOfYear(new Date());
  const months = eachMonthOfInterval({ start: yearStart, end: yearEnd });

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Public Holidays {currentYear}</h1>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {months.map(month => {
            const monthHolidays = holidays.filter(holiday => 
              isSameMonth(new Date(holiday.start), month)
            );
            
            return (
              <div key={month} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-purple-600 p-4">
                  <h2 className="text-xl font-semibold text-white">
                    {format(month, 'MMMM')}
                  </h2>
                </div>
                
                <div className="p-4">
                  {monthHolidays.length > 0 ? (
                    <ul className="space-y-3">
                      {monthHolidays.map(holiday => (
                        <li key={holiday.id} className="border-b pb-3 last:border-0">
                          <div className="flex items-start">
                            <div 
                              className="w-3 h-3 rounded-full mt-1 mr-2 flex-shrink-0" 
                              style={{ backgroundColor: holiday.color }}
                            ></div>
                            <div>
                              <h3 className="font-medium">{holiday.title}</h3>
                              <p className="text-sm text-gray-600">
                                {format(holiday.start, 'MMMM do')}
                              </p>
                              {holiday.type && (
                                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full mt-1">
                                  {holiday.type}
                                </span>
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No holidays this month</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HolidaysView;