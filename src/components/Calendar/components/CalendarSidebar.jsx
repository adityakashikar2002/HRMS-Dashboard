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
      <button 
        onClick={() => setShowEventForm(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700 transition"
      >
        New Event
      </button>
      
      <div className="flex items-center justify-between mb-4">
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
      
      {/* <div className="mt-6">
        <button className="text-blue-600 hover:text-blue-800 flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>Add calendar</span>
        </button>
        <button className="text-blue-600 hover:text-blue-800 mt-2 flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
          </svg>
          <span>Go to my booking page</span>
        </button>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold">My calendars</h3>
        <div className="mt-2 flex items-center">
          <input 
            type="checkbox" 
            defaultChecked 
            className="h-4 w-4 text-blue-600 rounded"
          />
          <span className="ml-2">Calendar</span>
        </div>
        <button className="text-blue-600 hover:text-blue-800 mt-2">
          Show all
        </button>
      </div> */}
    </div>
  );
};

export default CalendarSidebar;