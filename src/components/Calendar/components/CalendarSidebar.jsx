import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import { useState } from 'react';

const CalendarSidebar = ({ currentDate, selectedDate, onDateClick, events, setShowEventForm }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;
      
      const dayEvents = events.filter(event => 
        isSameDay(new Date(event.start), cloneDay)
      );
      
      days.push(
        <div
          className={`py-1 text-center cursor-pointer ${!isSameMonth(day, monthStart) ? 'text-gray-400' : ''} 
            ${isSameDay(day, selectedDate) ? 'bg-blue-100 text-blue-600 font-semibold rounded-full' : ''}
            ${isSameDay(day, new Date()) ? 'border border-blue-600 rounded-full' : ''}`}
          key={day}
          onClick={() => {
            onDateClick(cloneDay);
          }}
        >
          {formattedDate}
          {dayEvents.length > 0 && (
            <div className="flex justify-center mt-1">
              <div className="h-1 w-1 bg-blue-600 rounded-full"></div>
            </div>
          )}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="grid grid-cols-7 gap-1" key={day}>
        {days}
      </div>
    );
    days = [];
  }

  const nextMonth = () => {
    setCurrentMonth(addDays(currentMonth, 30));
  };

  const prevMonth = () => {
    setCurrentMonth(addDays(currentMonth, -30));
  };

  return (
    <div className="w-64 bg-white border-r p-4 flex flex-col">
      {/* <button 
        onClick={() => setShowEventForm(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700 transition"
      >
        New Event
      </button> */}
      
      <div className="flex items-center justify-between mb-4 mt-10">
        <h2 className="text-lg font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={prevMonth}
            className="p-1 rounded hover:bg-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button 
            onClick={nextMonth}
            className="p-1 rounded hover:bg-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="font-medium text-gray-500">{day}</div>
        ))}
      </div>
      
      {rows}

      <div className="p-5 mt-10">
        <h4 className="font-semibold text-gray-700 mb-2">Labels</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#3b82f6" }}></span>
            <span className="text-gray-800">Meeting</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#10b981" }}></span>
            <span className="text-gray-800">Client Interaction</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#f59e0b" }}></span>
            <span className="text-gray-800">Interview</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ef4444" }}></span>
            <span className="text-gray-800">Project</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CalendarSidebar;