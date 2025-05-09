// Import required React hooks and date-fns functions
import { useState, useEffect } from 'react';
import { startOfWeek, addDays, startOfMonth } from 'date-fns';

// Import all components and utilities
import CalendarHeader from './components/CalendarHeader';
import CalendarSidebar from './components/CalendarSidebar';
import DayView from './pages/DayView';
import WeekView from './pages/WeekView';
import MonthView from './pages/MonthView';
import EventForm from './components/EventForm';
import EventDetails from './components/EventDetails';
import { generateRecurringEvents, mockEvents } from './mockEvents';
import { fetchHolidays } from './utils/holidays';
import HolidaysView from './components/HolidaysView';

const CalendarMain = () => {
  // State for calendar date and view management
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('week');

  // State for event management
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(false);

  const [holidays, setHolidays] = useState([]);
  const [showHolidaysView, setShowHolidaysView] = useState(false);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    fetchHolidays(currentYear).then(holidays => {
      setHolidays(holidays);
    });
  }, []);

  // Helper function to safely parse dates from localStorage
  const parseDateSafe = (dateString) => {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? new Date() : date;
    } catch {
      return new Date();
    }
  };

  useEffect(() => {
    const loadEvents = async () => {
      try {
        // 1. Get base events
        const baseEvents = [...generateRecurringEvents(), ...mockEvents];

        // 2. Load saved events
        const savedEvents = JSON.parse(localStorage.getItem('calendarEvents') || []);
        const parsedSavedEvents = savedEvents.map(event => ({
          ...event,
          start: parseDateSafe(event.start),
          end: parseDateSafe(event.end)
        }));

        // 3. Get holidays (always fetch)
        const currentYear = new Date().getFullYear();
        const holidays = await fetchHolidays(currentYear);

        // 4. Combine with deduplication
        const allEvents = [
          ...baseEvents,
          ...parsedSavedEvents.filter(
            savedEvent => !baseEvents.some(baseEvent => baseEvent.id === savedEvent.id)
          ),
          ...holidays
        ];

        setEvents(allEvents);
      } catch (error) {
        console.error('Error loading events:', error);
        setEvents([...generateRecurringEvents(), ...mockEvents]);
      }
    };

    loadEvents();
  }, []);

  // Save events to localStorage whenever they change (excluding holidays)
  useEffect(() => {
    const saveEvents = () => {
      console.log('[DEBUG] Saving events to localStorage...');

      try {
        // 1. Filter out events that shouldn't be persisted
        const eventsToSave = events.filter(event => {
          // Don't save generated recurring events
          if (event.isRecurring &&
            (event.originalId === 'morning-scrum' ||
              event.originalId === 'evening-scrum')) {
            return false;
          }
          // Dont save holidays
          if (event.isHoliday){
            return false
          }
          return true;
        });

        // 2. Convert Date objects to ISO strings
        const serializedEvents = eventsToSave.map(event => ({
          ...event,
          start: event.start.toISOString(),
          end: event.end.toISOString()
        }));

        // 3. Save to localStorage
        localStorage.setItem('calendarEvents', JSON.stringify(serializedEvents));
        console.log('[DEBUG] Successfully saved events:', serializedEvents);
      } catch (error) {
        console.error('[ERROR] Failed to save events:', error);

        // Handle specific quota exceeded error
        if (error.name === 'QuotaExceededError') {
          console.warn('LocalStorage quota exceeded! Consider using IndexedDB.');
          alert('Your calendar storage is full. Some events may not be saved.');
        }
      }
    };

    // Only save if events array isn't empty
    if (events.length > 0) {
      saveEvents();
    }
  }, [events]);

  // Date navigation handlers (unchanged from your original)
  const nextWeek = () => setCurrentDate(addDays(currentDate, 7));
  const prevWeek = () => setCurrentDate(addDays(currentDate, -7));
  const nextMonth = () => setCurrentDate(addDays(currentDate, 30));
  const prevMonth = () => setCurrentDate(addDays(currentDate, -30));
  const nextDay = () => setCurrentDate(addDays(currentDate, 1));
  const prevDay = () => setCurrentDate(addDays(currentDate, -1));

  const handleToday = () => {
    const today = new Date();
    setSelectedDate(today);
    switch (view) {
      case 'day': setCurrentDate(today); break;
      case 'week': setCurrentDate(startOfWeek(today)); break;
      case 'month': setCurrentDate(startOfMonth(today)); break;
      default: setCurrentDate(today);
    }
  };

  // View change handler
  const handleViewChange = (newView) => {
    setView(newView);
    switch (newView) {
      case 'day': setCurrentDate(selectedDate); break;
      case 'week': setCurrentDate(startOfWeek(selectedDate)); break;
      case 'month': setCurrentDate(startOfMonth(selectedDate)); break;
      default: setCurrentDate(selectedDate);
    }
  };

  // Event CRUD operations
  const handleAddEvent = (newEvent) => {
    setEvents(prev => [...prev, newEvent]);
    setShowEventForm(false);
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEvents(prev => prev.map(event =>
      event.id === updatedEvent.id ? updatedEvent : event
    ));
    setShowEventForm(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    setShowEventDetails(false);
  };

  // Event form management
  const openEventForm = (date, time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const startDate = new Date(date);
    startDate.setHours(hours, minutes);

    const endDate = new Date(startDate);
    endDate.setMinutes(startDate.getMinutes() + 30);

    setSelectedEvent({
      title: '',
      start: startDate,
      end: endDate,
      description: '',
      color: '#3b82f6'
    });
    setShowEventForm(true);
  };

  const openExistingEvent = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const editEvent = () => {
    setShowEventDetails(false);
    setShowEventForm(true);
  };

  // Date click handler
  const onDateClick = (day) => {
    setSelectedDate(day);
    switch (view) {
      case 'day': setCurrentDate(day); break;
      case 'week': setCurrentDate(startOfWeek(day)); break;
      case 'month': setCurrentDate(startOfMonth(day)); break;
      default: setCurrentDate(day);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Component */}
      <CalendarSidebar
        currentDate={currentDate}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
        events={events}
        setShowEventForm={setShowEventForm}
        setShowHolidaysView={setShowHolidaysView} // Add this line
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Calendar Header */}
        <CalendarHeader
          currentDate={currentDate}
          view={view}
          setView={handleViewChange}
          handleToday={handleToday}
          nextWeek={nextWeek}
          prevWeek={prevWeek}
          nextMonth={nextMonth}
          prevMonth={prevMonth}
          nextDay={nextDay}
          prevDay={prevDay}
          setShowEventForm={setShowEventForm}
        />

        {/* Calendar Views */}
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
              setShowHolidaysView={setShowHolidaysView} // Add this line
            />
          )}
        </div>
      </div>

      {/* Event Form Modal */}
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

      {/* Event Details Modal */}
      {showEventDetails && selectedEvent && (
        <EventDetails
          event={selectedEvent}
          onEdit={editEvent}
          onDelete={handleDeleteEvent}
          onClose={() => setShowEventDetails(false)}
        />
      )}
      {showHolidaysView && (
        <HolidaysView
          holidays={holidays}
          onClose={() => setShowHolidaysView(false)}
        />
      )}
    </div>
  );
};

export default CalendarMain;