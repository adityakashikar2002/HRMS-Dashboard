import { format } from 'date-fns';

const CalendarHeader = ({
  currentDate,
  view,
  setView,
  handleToday,
  nextWeek,
  prevWeek,
  nextMonth,
  prevMonth,
  nextDay,
  prevDay,
  setShowEventForm
}) => {
  const dateFormat = "MMMM yyyy";
  
  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleNavigation = () => {
    if (view === 'day') return prevDay();
    if (view === 'week') return prevWeek();
    if (view === 'month') return prevMonth();
  };

  const handleForwardNavigation = () => {
    if (view === 'day') return nextDay();
    if (view === 'week') return nextWeek();
    if (view === 'month') return nextMonth();
  };

  return (
    <div className="bg-white border-b p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button 
          onClick={handleToday}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Today
        </button>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleNavigation}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <span className="text-lg font-semibold">
            {format(currentDate, dateFormat)}
          </span>
          <button 
            onClick={handleForwardNavigation}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleViewChange('day')}
          className={`px-4 py-2 rounded ${view === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          Day
        </button>
        <button
          onClick={() => handleViewChange('week')}
          className={`px-4 py-2 rounded ${view === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          Week
        </button>
        <button
          onClick={() => handleViewChange('month')}
          className={`px-4 py-2 rounded ${view === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          Month
        </button>
        
        <button
          onClick={() => setShowEventForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>New Event</span>
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;