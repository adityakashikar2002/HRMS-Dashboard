import { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay } from 'date-fns';
import CalendarHeader from './components/CalendarHeader';
import CalendarSidebar from './components/CalendarSidebar';
import DayView from './pages/DayView';
import WeekView from './pages/WeekView';
import MonthView from './pages/MonthView';
import EventForm from './components/EventForm';
import EventDetails from './components/EventDetails';
import { mockEvents } from './mockEvents';

const CalendarMain = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState(mockEvents);
  const [view, setView] = useState('week');
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(false);

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  const nextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const prevWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };

  const nextMonth = () => {
    setCurrentDate(addDays(currentDate, 30));
  };

  const prevMonth = () => {
    setCurrentDate(addDays(currentDate, -30));
  };

  const nextDay = () => {
    setCurrentDate(addDays(currentDate, 1));
  };

  const prevDay = () => {
    setCurrentDate(addDays(currentDate, -1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    setShowEventForm(false);
  };

  // const handleUpdateEvent = (updatedEvent) => {
  //   setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
  //   setShowEventForm(false);
  //   setSelectedEvent(null);
  // };
  const handleUpdateEvent = (updatedEvent) => {
    if (updatedEvent.isRecurring) {
      // For recurring events, we'll update all future instances
      setEvents(events.map(event => 
        event.originalId === updatedEvent.originalId && 
        new Date(event.start) >= new Date(updatedEvent.start)
          ? updatedEvent
          : event
      ));
    } else {
      // Regular event update
      setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    }
    setShowEventForm(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    setShowEventDetails(false);
  };

  const openEventForm = (date, time) => {
    const newEvent = {
      title: '',
      start: new Date(date.setHours(time.split(':')[0], time.split(':')[1])),
      end: new Date(date.setHours(time.split(':')[0], parseInt(time.split(':')[1]) + 30)),
      description: '',
      color: '#3b82f6'
    };
    setSelectedEvent(newEvent);
    setShowEventForm(true);
  };

  // const openExistingEvent = (event) => {
  //   setSelectedEvent(event);
  //   setShowEventDetails(true);
  // };
  // Update the EventForm opening logic
const openExistingEvent = (event) => {
  // For recurring events, we'll edit just this instance but keep the connection
  const editableEvent = event.isRecurring 
    ? { ...event, id: `edited-${Date.now()}` } 
    : event;
  setSelectedEvent(editableEvent);
  setShowEventDetails(true);
};

  const editEvent = () => {
    setShowEventDetails(false);
    setShowEventForm(true);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <CalendarSidebar 
        currentDate={currentDate}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
        events={events}
        setShowEventForm={setShowEventForm}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <CalendarHeader 
          currentDate={currentDate}
          view={view}
          setView={setView}
          handleToday={handleToday}
          nextWeek={nextWeek}
          prevWeek={prevWeek}
          nextMonth={nextMonth}
          prevMonth={prevMonth}
          nextDay={nextDay}
          prevDay={prevDay}
          setShowEventForm={setShowEventForm}
        />
        
        <div className="flex-1 overflow-auto p-4">
          {view === 'day' && (
            <DayView 
              currentDate={currentDate}
              selectedDate={selectedDate}
              events={events}
              openEventForm={openEventForm}
              openExistingEvent={openExistingEvent}
            />
          )}
          {view === 'week' && (
            <WeekView 
              currentDate={currentDate}
              selectedDate={selectedDate}
              events={events}
              openEventForm={openEventForm}
              openExistingEvent={openExistingEvent}
            />
          )}
          {view === 'month' && (
            <MonthView 
              currentDate={currentDate}
              selectedDate={selectedDate}
              events={events}
              onDateClick={onDateClick}
              openEventForm={openEventForm}
              openExistingEvent={openExistingEvent}
            />
          )}
        </div>
      </div>

      {showEventForm && (
        <EventForm 
          event={selectedEvent}
          onSave={selectedEvent?.id ? handleUpdateEvent : handleAddEvent}
          onClose={() => {
            setShowEventForm(false);
            setSelectedEvent(null);
          }}
        />
      )}

      {showEventDetails && selectedEvent && (
        <EventDetails 
          event={selectedEvent}
          onEdit={editEvent}
          onDelete={handleDeleteEvent}
          onClose={() => setShowEventDetails(false)}
        />
      )}
    </div>
  );
};

export default CalendarMain;