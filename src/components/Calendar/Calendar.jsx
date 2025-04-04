import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addDays, subDays, startOfWeek, endOfWeek, parseISO } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faChevronUp, faChevronDown, faPlus, faLink, faFileAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [view, setView] = useState('month'); // 'day', 'week', 'month'
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    description: '',
    location: '',
  });

  // Sample events for demonstration
  useEffect(() => {
    const sampleEvents = [
      {
        id: 1,
        title: 'Intern Morning Scrum Call',
        start: new Date(2025, 3, 1, 9, 30),
        end: new Date(2025, 3, 1, 10, 0),
        description: 'Daily standup meeting with interns',
        location: 'Microsoft Teams Meeting',
        participants: ['Snehal Baraskar'],
      },
      {
        id: 2,
        title: 'Intern Evening Scrum',
        start: new Date(2025, 3, 1, 18, 30),
        end: new Date(2025, 3, 1, 19, 0),
        description: 'Evening sync with interns',
        location: 'Microsoft Teams Meeting',
        participants: ['Snehal Baraskar'],
      },
      // Add more sample events for different days
      {
        id: 3,
        title: 'Team Meeting',
        start: new Date(2025, 3, 2, 11, 0),
        end: new Date(2025, 3, 2, 12, 0),
        description: 'Weekly team sync',
        location: 'Conference Room A',
      },
      {
        id: 4,
        title: 'Client Call',
        start: new Date(2025, 3, 3, 14, 0),
        end: new Date(2025, 3, 3, 15, 0),
        description: 'Discussion with client about project requirements',
        location: 'Zoom Meeting',
      },
    ];
    setEvents(sampleEvents);
  }, []);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextWeek = () => setCurrentDate(addDays(currentDate, 7));
  const prevWeek = () => setCurrentDate(subDays(currentDate, 7));
  const nextDay = () => setCurrentDate(addDays(currentDate, 1));
  const prevDay = () => setCurrentDate(subDays(currentDate, 1));

  const goToToday = () => setCurrentDate(new Date());

  const handleDateClick = (day) => {
    setCurrentDate(day);
    if (view === 'month') setView('day');
  };

  const handleEventClick = (event, e) => {
    e.stopPropagation();
    setSelectedEvent(event);
  };

  const handleEventHover = (event, e) => {
    e.stopPropagation();
    setHoveredEvent(event);
  };

  const handleEventHoverEnd = () => {
    setHoveredEvent(null);
  };

  const handleAddEvent = () => {
    const startDate = new Date(currentDate);
    startDate.setHours(9, 0, 0, 0);
    
    const endDate = new Date(startDate);
    endDate.setHours(10, 0, 0, 0);
    
    setNewEvent({
      title: '',
      start: format(startDate, "yyyy-MM-dd'T'HH:mm"),
      end: format(endDate, "yyyy-MM-dd'T'HH:mm"),
      description: '',
      location: '',
    });
    setShowEventForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const event = {
      id: events.length + 1,
      title: newEvent.title,
      start: parseISO(newEvent.start),
      end: parseISO(newEvent.end),
      description: newEvent.description,
      location: newEvent.location,
    };
    setEvents([...events, event]);
    setShowEventForm(false);
    setNewEvent({
      title: '',
      start: '',
      end: '',
      description: '',
      location: '',
    });
  };

  const closeEventForm = () => {
    setShowEventForm(false);
    setSelectedEvent(null);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
    setSelectedEvent(null);
  };

  const renderHeader = () => {
    let dateFormat, nextFn, prevFn;
    
    switch (view) {
      case 'day':
        dateFormat = 'EEEE, MMMM d, yyyy';
        nextFn = nextDay;
        prevFn = prevDay;
        break;
      case 'week':
        dateFormat = 'MMMM d, yyyy';
        nextFn = nextWeek;
        prevFn = prevWeek;
        break;
      case 'month':
        dateFormat = 'MMMM yyyy';
        nextFn = nextMonth;
        prevFn = prevMonth;
        break;
      default:
        dateFormat = 'MMMM yyyy';
    }

    return (
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={goToToday}
          >
            Today
          </button>
          <h2 className="text-lg font-semibold">
            {format(currentDate, dateFormat)}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            className="text-gray-600 p-2"
            onClick={prevFn}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button 
            className="text-gray-600 p-2"
            onClick={nextFn}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = 'EEE';
    const startDate = startOfWeek(currentDate);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-center py-2 font-medium" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="grid grid-cols-7">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = 'd';
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const dayEvents = events.filter(event => isSameDay(event.start, cloneDay));
        
        days.push(
          <div
            className={`min-h-24 p-1 border border-gray-200 ${
              !isSameMonth(day, monthStart) ? 'text-gray-400' : ''
            } ${
              isSameDay(day, new Date()) ? 'bg-blue-50' : ''
            }`}
            key={day}
            onClick={() => handleDateClick(cloneDay)}
          >
            <div className="flex justify-between">
              <span className={`text-sm ${
                isSameDay(day, new Date()) ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''
              }`}>
                {formattedDate}
              </span>
              {isSameMonth(day, monthStart) && (
                <button 
                  className="text-gray-400 hover:text-blue-600 text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    const startDate = new Date(cloneDay);
                    startDate.setHours(9, 0, 0, 0);
                    const endDate = new Date(startDate);
                    endDate.setHours(10, 0, 0, 0);
                    
                    setNewEvent({
                      title: '',
                      start: format(startDate, "yyyy-MM-dd'T'HH:mm"),
                      end: format(endDate, "yyyy-MM-dd'T'HH:mm"),
                      description: '',
                      location: '',
                    });
                    setShowEventForm(true);
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} size="xs" />
                </button>
              )}
            </div>
            <div className="mt-1 space-y-1">
              {dayEvents.map(event => (
                <div
                  key={event.id}
                  className="bg-blue-100 text-blue-800 text-xs p-1 rounded truncate cursor-pointer"
                  onClick={(e) => handleEventClick(event, e)}
                  onMouseEnter={(e) => handleEventHover(event, e)}
                  onMouseLeave={handleEventHoverEnd}
                >
                  {format(event.start, 'h:mm a')} {event.title}
                </div>
              ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="mb-4">{rows}</div>;
  };

  const renderDayView = () => {
    const hours = [];
    const dayEvents = events.filter(event => isSameDay(event.start, currentDate));
    
    for (let i = 0; i < 24; i++) {
      const hourEvents = dayEvents.filter(event => event.start.getHours() === i);
      
      hours.push(
        <div key={i} className="grid grid-cols-12 border-b border-gray-200 min-h-16">
          <div className="col-span-1 p-2 text-sm text-gray-500">
            {i === 0 ? '12 AM' : i < 12 ? `${i} AM` : i === 12 ? '12 PM' : `${i - 12} PM`}
          </div>
          <div className="col-span-11 p-2 relative">
            {hourEvents.map(event => (
              <div
                key={event.id}
                className="bg-blue-100 border border-blue-200 text-blue-800 p-2 rounded mb-1 cursor-pointer"
                onClick={(e) => handleEventClick(event, e)}
                onMouseEnter={(e) => handleEventHover(event, e)}
                onMouseLeave={handleEventHoverEnd}
              >
                <div className="font-medium">{event.title}</div>
                <div className="text-xs">
                  {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
                </div>
              </div>
            ))}
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-blue-600"
              onClick={() => {
                const startDate = new Date(currentDate);
                startDate.setHours(i, 0, 0, 0);
                const endDate = new Date(startDate);
                endDate.setHours(i + 1, 0, 0, 0);
                
                setNewEvent({
                  title: '',
                  start: format(startDate, "yyyy-MM-dd'T'HH:mm"),
                  end: format(endDate, "yyyy-MM-dd'T'HH:mm"),
                  description: '',
                  location: '',
                });
                setShowEventForm(true);
              }}
            >
              <FontAwesomeIcon icon={faPlus} size="xs" />
            </button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200">
          <div className="col-span-1 p-2 font-medium">Time</div>
          <div className="col-span-11 p-2 font-medium">
            {format(currentDate, 'EEEE, MMMM d, yyyy')}
          </div>
        </div>
        <div>{hours}</div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate);
    const days = eachDayOfInterval({
      start: weekStart,
      end: addDays(weekStart, 6),
    });
    
    const hours = [];
    
    for (let i = 0; i < 24; i++) {
      const row = [];
      
      // Time column
      row.push(
        <div key="time" className="p-2 text-sm text-gray-500 border-b border-gray-200">
          {i === 0 ? '12 AM' : i < 12 ? `${i} AM` : i === 12 ? '12 PM' : `${i - 12} PM`}
        </div>
      );
      
      // Day columns
      days.forEach(day => {
        const dayEvents = events.filter(event => 
          isSameDay(event.start, day) && event.start.getHours() === i
        );
        
        row.push(
          <div key={day} className="border-b border-gray-200 relative min-h-16">
            {dayEvents.map(event => (
              <div
                key={event.id}
                className="bg-blue-100 border border-blue-200 text-blue-800 p-1 rounded mb-1 mx-1 cursor-pointer text-xs"
                onClick={(e) => handleEventClick(event, e)}
                onMouseEnter={(e) => handleEventHover(event, e)}
                onMouseLeave={handleEventHoverEnd}
              >
                <div className="font-medium truncate">{event.title}</div>
                <div className="truncate">
                  {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
                </div>
              </div>
            ))}
            <button
              className="absolute top-1 right-1 text-gray-400 hover:text-blue-600 text-xs"
              onClick={() => {
                const startDate = new Date(day);
                startDate.setHours(i, 0, 0, 0);
                const endDate = new Date(startDate);
                endDate.setHours(i + 1, 0, 0, 0);
                
                setNewEvent({
                  title: '',
                  start: format(startDate, "yyyy-MM-dd'T'HH:mm"),
                  end: format(endDate, "yyyy-MM-dd'T'HH:mm"),
                  description: '',
                  location: '',
                });
                setShowEventForm(true);
              }}
            >
              <FontAwesomeIcon icon={faPlus} size="xs" />
            </button>
          </div>
        );
      });
      
      hours.push(
        <div key={i} className="grid grid-cols-8">
          {row}
        </div>
      );
    }
    
    return (
      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-8 bg-gray-50 border-b border-gray-200">
          <div className="p-2 font-medium">Time</div>
          {days.map(day => (
            <div key={day} className="p-2 font-medium text-center">
              <div>{format(day, 'EEE')}</div>
              <div className={`${
                isSameDay(day, new Date()) ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto' : ''
              }`}>
                {format(day, 'd')}
              </div>
            </div>
          ))}
        </div>
        <div>{hours}</div>
      </div>
    );
  };

  const renderMonthView = () => {
    return (
      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 font-medium text-center">
              {day}
            </div>
          ))}
        </div>
        {renderCells()}
      </div>
    );
  };

  const renderView = () => {
    switch (view) {
      case 'day':
        return renderDayView();
      case 'week':
        return renderWeekView();
      case 'month':
        return renderMonthView();
      default:
        return renderMonthView();
    }
  };

  const renderMiniCalendar = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = 'd';
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        
        days.push(
          <td
            className={`text-center py-1 text-sm ${
              !isSameMonth(day, monthStart) ? 'text-gray-400' : ''
            } ${
              isSameDay(day, currentDate) ? 'bg-blue-100 text-blue-600 rounded-full' : ''
            } ${
              isSameDay(day, new Date()) ? 'font-bold' : ''
            }`}
            key={day}
            onClick={() => setCurrentDate(cloneDay)}
          >
            {formattedDate}
          </td>
        );
        day = addDays(day, 1);
      }
      rows.push(<tr key={day}>{days}</tr>);
      days = [];
    }

    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold">{format(currentDate, 'MMMM yyyy')}</h2>
          <div className="flex space-x-1">
            <button 
              className="text-gray-600 p-1"
              onClick={prevMonth}
            >
              <FontAwesomeIcon icon={faChevronUp} />
            </button>
            <button 
              className="text-gray-600 p-1"
              onClick={nextMonth}
            >
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                <th key={day} className="text-xs font-medium text-center py-1">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-4">
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            onClick={handleAddEvent}
          >
            New event
          </button>
        </div>
        
        {renderMiniCalendar()}
        
        <div className="p-4 border-t">
          <button className="text-blue-600 flex items-center space-x-2">
            <FontAwesomeIcon icon={faPlus} />
            <span>Add calendar</span>
          </button>
          <button className="text-blue-600 flex items-center space-x-2 mt-2">
            <FontAwesomeIcon icon={faLink} />
            <span>Go to my booking page</span>
          </button>
        </div>
        
        <div className="p-4 border-t">
          <h3 className="font-semibold">My calendars</h3>
          <div className="mt-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked className="form-checkbox text-blue-600" />
              <span>Calendar</span>
            </label>
          </div>
          <button className="text-blue-600 mt-2">Show all</button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 bg-white border-b">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <button 
                className={`px-4 py-2 rounded ${view === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                onClick={() => setView('day')}
              >
                Day
              </button>
              <button 
                className={`px-4 py-2 rounded ${view === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                onClick={() => setView('week')}
              >
                Week
              </button>
              <button 
                className={`px-4 py-2 rounded ${view === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                onClick={() => setView('month')}
              >
                Month
              </button>
              <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded">
                Split view
              </button>
            </div>
            <div className="flex space-x-2">
              <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded">
                Filter
              </button>
              <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded">
                Share
              </button>
              <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded">
                Print
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-4">
          {renderHeader()}
          {renderView()}
        </div>
      </div>
      
      {/* Event Details Sidebar */}
      {selectedEvent && (
        <div className="w-64 bg-white border-l p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {format(selectedEvent.start, 'EEE, MMM d')}
            </h3>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedEvent(null)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          <div className="mb-6">
            <h4 className="text-xl font-bold mb-2">{selectedEvent.title}</h4>
            <div className="text-gray-600 mb-1">
              {format(selectedEvent.start, 'h:mm a')} - {format(selectedEvent.end, 'h:mm a')}
            </div>
            {selectedEvent.location && (
              <div className="text-gray-600 mb-4">{selectedEvent.location}</div>
            )}
            {selectedEvent.description && (
              <div className="mb-4">
                <h5 className="font-semibold mb-1">Description</h5>
                <p className="text-gray-600">{selectedEvent.description}</p>
              </div>
            )}
            {selectedEvent.participants && selectedEvent.participants.length > 0 && (
              <div className="mb-4">
                <h5 className="font-semibold mb-1">Participants</h5>
                <div className="space-y-2">
                  {selectedEvent.participants.map((participant, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                      <span>{participant}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
              Chat with participants
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button 
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded flex-1"
              onClick={() => {
                setNewEvent({
                  title: selectedEvent.title,
                  start: format(selectedEvent.start, "yyyy-MM-dd'T'HH:mm"),
                  end: format(selectedEvent.end, "yyyy-MM-dd'T'HH:mm"),
                  description: selectedEvent.description,
                  location: selectedEvent.location,
                });
                setShowEventForm(true);
              }}
            >
              Edit
            </button>
            <button 
              className="bg-red-100 text-red-600 px-4 py-2 rounded flex-1"
              onClick={() => deleteEvent(selectedEvent.id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
      
      {/* Event Form Modal */}
      {showEventForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">New Event</h3>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={closeEventForm}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-1">Start</label>
                  <input
                    type="datetime-local"
                    name="start"
                    value={newEvent.start}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">End</label>
                  <input
                    type="datetime-local"
                    name="end"
                    value={newEvent.end}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={newEvent.location}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={newEvent.description}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  rows="3"
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                  onClick={closeEventForm}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Event Hover Card */}
      {hoveredEvent && (
        <div 
          className="fixed bg-white shadow-lg rounded-lg p-4 border border-gray-200 z-50 max-w-xs"
          style={{
            top: `${hoveredEvent.clientY}px`,
            left: `${hoveredEvent.clientX}px`,
          }}
          onMouseLeave={handleEventHoverEnd}
        >
          <h4 className="font-bold mb-1">{hoveredEvent.title}</h4>
          <div className="text-gray-600 text-sm mb-2">
            {format(hoveredEvent.start, 'EEE, MMM d, h:mm a')} - {format(hoveredEvent.end, 'h:mm a')}
          </div>
          {hoveredEvent.location && (
            <div className="text-gray-600 text-sm mb-2">{hoveredEvent.location}</div>
          )}
          {hoveredEvent.description && (
            <p className="text-gray-600 text-sm">{hoveredEvent.description}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar;