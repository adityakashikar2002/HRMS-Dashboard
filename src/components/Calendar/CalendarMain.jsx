// import { useState, useEffect } from 'react';
// import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay } from 'date-fns';
// import CalendarHeader from './components/CalendarHeader';
// import CalendarSidebar from './components/CalendarSidebar';
// import DayView from './pages/DayView';
// import WeekView from './pages/WeekView';
// import MonthView from './pages/MonthView';
// import EventForm from './components/EventForm';
// import EventDetails from './components/EventDetails';
// import { mockEvents } from './mockEvents';

// const CalendarMain = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   // const [events, setEvents] = useState(mockEvents);
//   const [view, setView] = useState('week');
//   const [showEventForm, setShowEventForm] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [showEventDetails, setShowEventDetails] = useState(false);

//   const onDateClick = (day) => {
//     setSelectedDate(day);
//   };

//   const nextWeek = () => {
//     setCurrentDate(addDays(currentDate, 7));
//   };

//   const prevWeek = () => {
//     setCurrentDate(addDays(currentDate, -7));
//   };

//   const nextMonth = () => {
//     setCurrentDate(addDays(currentDate, 30));
//   };

//   const prevMonth = () => {
//     setCurrentDate(addDays(currentDate, -30));
//   };

//   const nextDay = () => {
//     setCurrentDate(addDays(currentDate, 1));
//   };

//   const prevDay = () => {
//     setCurrentDate(addDays(currentDate, -1));
//   };

//   const handleToday = () => {
//     setCurrentDate(new Date());
//     setSelectedDate(new Date());
//   };

//   const handleAddEvent = (newEvent) => {
//     setEvents([...events, newEvent]);
//     setShowEventForm(false);
//   };

//   // const handleUpdateEvent = (updatedEvent) => {
//   //   setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
//   //   setShowEventForm(false);
//   //   setSelectedEvent(null);
//   // };
//   const handleUpdateEvent = (updatedEvent) => {
//     if (updatedEvent.isRecurring) {
//       // For recurring events, we'll update all future instances
//       setEvents(events.map(event => 
//         event.originalId === updatedEvent.originalId && 
//         new Date(event.start) >= new Date(updatedEvent.start)
//           ? updatedEvent
//           : event
//       ));
//     } else {
//       // Regular event update
//       setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
//     }
//     setShowEventForm(false);
//     setSelectedEvent(null);
//   };

//   const handleDeleteEvent = (eventId) => {
//     setEvents(events.filter(event => event.id !== eventId));
//     setShowEventDetails(false);
//   };

//   const openEventForm = (date, time) => {
//     const newEvent = {
//       title: '',
//       start: new Date(date.setHours(time.split(':')[0], time.split(':')[1])),
//       end: new Date(date.setHours(time.split(':')[0], parseInt(time.split(':')[1]) + 30)),
//       description: '',
//       color: '#3b82f6'
//     };
//     setSelectedEvent(newEvent);
//     setShowEventForm(true);
//   };

//   // const openExistingEvent = (event) => {
//   //   setSelectedEvent(event);
//   //   setShowEventDetails(true);
//   // };
//   // Update the EventForm opening logic
// const openExistingEvent = (event) => {
//   // For recurring events, we'll edit just this instance but keep the connection
//   const editableEvent = event.isRecurring 
//     ? { ...event, id: `edited-${Date.now()}` } 
//     : event;
//   setSelectedEvent(editableEvent);
//   setShowEventDetails(true);
// };

//   const editEvent = () => {
//     setShowEventDetails(false);
//     setShowEventForm(true);
//   };


//   return (
//     <div className="flex h-screen bg-gray-100">
//       <CalendarSidebar 
//         currentDate={currentDate}
//         selectedDate={selectedDate}
//         onDateClick={onDateClick}
//         events={events}
//         setShowEventForm={setShowEventForm}
//       />
      
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <CalendarHeader 
//           currentDate={currentDate}
//           view={view}
//           setView={setView}
//           handleToday={handleToday}
//           nextWeek={nextWeek}
//           prevWeek={prevWeek}
//           nextMonth={nextMonth}
//           prevMonth={prevMonth}
//           nextDay={nextDay}
//           prevDay={prevDay}
//           setShowEventForm={setShowEventForm}
//         />
        
//         <div className="flex-1 overflow-auto p-4">
//           {view === 'day' && (
//             <DayView 
//               currentDate={currentDate}
//               selectedDate={selectedDate}
//               events={events}
//               openEventForm={openEventForm}
//               openExistingEvent={openExistingEvent}
//             />
//           )}
//           {view === 'week' && (
//             <WeekView 
//               currentDate={currentDate}
//               selectedDate={selectedDate}
//               events={events}
//               openEventForm={openEventForm}
//               openExistingEvent={openExistingEvent}
//             />
//           )}
//           {view === 'month' && (
//             <MonthView 
//               currentDate={currentDate}
//               selectedDate={selectedDate}
//               events={events}
//               onDateClick={onDateClick}
//               openEventForm={openEventForm}
//               openExistingEvent={openExistingEvent}
//             />
//           )}
//         </div>
//       </div>

//       {showEventForm && (
//         <EventForm 
//           event={selectedEvent}
//           onSave={selectedEvent?.id ? handleUpdateEvent : handleAddEvent}
//           onClose={() => {
//             setShowEventForm(false);
//             setSelectedEvent(null);
//           }}
//         />
//       )}

//       {showEventDetails && selectedEvent && (
//         <EventDetails 
//           event={selectedEvent}
//           onEdit={editEvent}
//           onDelete={handleDeleteEvent}
//           onClose={() => setShowEventDetails(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default CalendarMain;

import { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay } from 'date-fns';
import CalendarHeader from './components/CalendarHeader';
import CalendarSidebar from './components/CalendarSidebar';
import DayView from './pages/DayView';
import WeekView from './pages/WeekView';
import MonthView from './pages/MonthView';
import EventForm from './components/EventForm';
import EventDetails from './components/EventDetails';
import { generateRecurringEvents, mockEvents } from './mockEvents';

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

  // Load events from localStorage on initial render
  // useEffect(() => {
  //   const loadEvents = () => {
  //     const savedEvents = localStorage.getItem('calendarEvents');
  //     const recurringEvents = generateRecurringEvents();
      
  //     if (savedEvents) {
  //       try {
  //         const parsedEvents = JSON.parse(savedEvents).map(event => ({
  //           ...event,
  //           start: new Date(event.start),
  //           end: new Date(event.end)
  //         }));
          
  //         const filteredEvents = parsedEvents.filter(
  //           event => !event.originalId || 
  //                   (event.originalId !== 'morning-scrum' && 
  //                    event.originalId !== 'evening-scrum')
  //         );
          
  //         setEvents([...recurringEvents, ...filteredEvents]);
  //       } catch (e) {
  //         setEvents(recurringEvents);
  //       }
  //     } else {
  //       setEvents(recurringEvents);
  //     }
  //   };

  //   loadEvents();
  // }, []);

  useEffect(() => {
    const loadEvents = () => {
      const savedEvents = localStorage.getItem('calendarEvents');
      const recurringEvents = generateRecurringEvents();
      
      if (savedEvents) {
        try {
          const parsedEvents = JSON.parse(savedEvents).map(event => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end)
          }));
          
          // Combine all three event sources:
          // 1. Recurring events (scrums)
          // 2. Saved user events from localStorage
          // 3. Mock events (filtering out duplicates)
          const filteredSavedEvents = parsedEvents.filter(
            event => !event.originalId || 
                    (event.originalId !== 'morning-scrum' && 
                     event.originalId !== 'evening-scrum')
          );
          
          const filteredMockEvents = mockEvents.filter(
            mockEvent => !parsedEvents.some(savedEvent => 
              savedEvent.id === mockEvent.id ||
              (savedEvent.originalId && savedEvent.originalId === mockEvent.originalId)
          ));
          
          setEvents([...recurringEvents, ...filteredSavedEvents, ...filteredMockEvents]);
        } catch (e) {
          console.error("Failed to parse saved events:", e);
          setEvents([...recurringEvents, ...mockEvents]);
        }
      } else {
        setEvents([...recurringEvents, ...mockEvents]);
      }
    };
  
    loadEvents();
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    const saveEvents = () => {
      const eventsWithoutRecurring = events.filter(
        event => !event.isRecurring || 
                (event.originalId !== 'morning-scrum' && 
                 event.originalId !== 'evening-scrum')
      );
      
      localStorage.setItem(
        'calendarEvents', 
        JSON.stringify(eventsWithoutRecurring)
      );
    };

    saveEvents();
  }, [events]);

  // Date navigation handlers
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

  // Event CRUD operations
  const handleAddEvent = (newEvent) => {
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    setShowEventForm(false);
  };

  const handleUpdateEvent = (updatedEvent) => {
    if (updatedEvent.isRecurring) {
      // For recurring events, update all future instances
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
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    setShowEventDetails(false);
  };

  // Event form management
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

  const openExistingEvent = (event) => {
    // For recurring events, edit just this instance but keep the connection
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
      {/* Sidebar Component */}
      <CalendarSidebar 
        currentDate={currentDate}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
        events={events}
        setShowEventForm={setShowEventForm}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Calendar Header */}
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
    </div>
  );
};

export default CalendarMain;