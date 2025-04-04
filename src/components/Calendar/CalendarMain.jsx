// import { useState, useEffect } from 'react';
// import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay } from 'date-fns';
// import CalendarHeader from './components/CalendarHeader';
// import CalendarSidebar from './components/CalendarSidebar';
// import DayView from './pages/DayView';
// import WeekView from './pages/WeekView';
// import MonthView from './pages/MonthView';
// import EventForm from './components/EventForm';
// import EventDetails from './components/EventDetails';
// import { generateRecurringEvents, mockEvents } from './mockEvents';

// const CalendarMain = () => {
//   // State for calendar date and view management
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [view, setView] = useState('week');
  
//   // State for event management
//   const [events, setEvents] = useState([]);
//   const [showEventForm, setShowEventForm] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [showEventDetails, setShowEventDetails] = useState(false);


//   useEffect(() => {
//     const loadEvents = () => {
//       const savedEvents = localStorage.getItem('calendarEvents');
//       const recurringEvents = generateRecurringEvents();
      
//       if (savedEvents) {
//         try {
//           const parsedEvents = JSON.parse(savedEvents).map(event => ({
//             ...event,
//             start: new Date(event.start),
//             end: new Date(event.end)
//           }));
          
//           // Combine all three event sources:
//           // 1. Recurring events (scrums)
//           // 2. Saved user events from localStorage
//           // 3. Mock events (filtering out duplicates)
//           const filteredSavedEvents = parsedEvents.filter(
//             event => !event.originalId || 
//                     (event.originalId !== 'morning-scrum' && 
//                      event.originalId !== 'evening-scrum')
//           );
          
//           const filteredMockEvents = mockEvents.filter(
//             mockEvent => !parsedEvents.some(savedEvent => 
//               savedEvent.id === mockEvent.id ||
//               (savedEvent.originalId && savedEvent.originalId === mockEvent.originalId)
//           ));
          
//           setEvents([...recurringEvents, ...filteredSavedEvents, ...filteredMockEvents]);
//         } catch (e) {
//           console.error("Failed to parse saved events:", e);
//           setEvents([...recurringEvents, ...mockEvents]);
//         }
//       } else {
//         setEvents([...recurringEvents, ...mockEvents]);
//       }
//     };
  
//     loadEvents();
//   }, []);

//   // Save events to localStorage whenever they change
//   useEffect(() => {
//     const saveEvents = () => {
//       const eventsWithoutRecurring = events.filter(
//         event => !event.isRecurring || 
//                 (event.originalId !== 'morning-scrum' && 
//                  event.originalId !== 'evening-scrum')
//       );
      
//       localStorage.setItem(
//         'calendarEvents', 
//         JSON.stringify(eventsWithoutRecurring)
//       );
//     };

//     saveEvents();
//   }, [events]);

//   // Date navigation handlers
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

//   // Event CRUD operations
//   const handleAddEvent = (newEvent) => {
//     const updatedEvents = [...events, newEvent];
//     setEvents(updatedEvents);
//     setShowEventForm(false);
//   };

//   const handleUpdateEvent = (updatedEvent) => {
//     if (updatedEvent.isRecurring) {
//       // For recurring events, update all future instances
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
//     const updatedEvents = events.filter(event => event.id !== eventId);
//     setEvents(updatedEvents);
//     setShowEventDetails(false);
//   };

//   // Event form management
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

//   const openExistingEvent = (event) => {
//     // For recurring events, edit just this instance but keep the connection
//     const editableEvent = event.isRecurring 
//       ? { ...event, id: `edited-${Date.now()}` } 
//       : event;
//     setSelectedEvent(editableEvent);
//     setShowEventDetails(true);
//   };

//   const editEvent = () => {
//     setShowEventDetails(false);
//     setShowEventForm(true);
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar Component */}
//       <CalendarSidebar 
//         currentDate={currentDate}
//         selectedDate={selectedDate}
//         onDateClick={onDateClick}
//         events={events}
//         setShowEventForm={setShowEventForm}
//       />
      
//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Calendar Header */}
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
        
//         {/* Calendar Views */}
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

//       {/* Event Form Modal */}
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

//       {/* Event Details Modal */}
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


// import { useState, useEffect } from 'react';
// import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay } from 'date-fns';
// import CalendarHeader from './components/CalendarHeader';
// import CalendarSidebar from './components/CalendarSidebar';
// import DayView from './pages/DayView';
// import WeekView from './pages/WeekView';
// import MonthView from './pages/MonthView';
// import EventForm from './components/EventForm';
// import EventDetails from './components/EventDetails';
// import { generateRecurringEvents, mockEvents } from './mockEvents';

// const CalendarMain = () => {
//   // State for calendar date and view management
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [view, setView] = useState('week');
  
//   // State for event management
//   const [events, setEvents] = useState([]);
//   const [showEventForm, setShowEventForm] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [showEventDetails, setShowEventDetails] = useState(false);

//   // // Load events from localStorage on initial render
//   // useEffect(() => {
//   //   const loadEvents = () => {
//   //     const savedEvents = localStorage.getItem('calendarEvents');
//   //     const recurringEvents = generateRecurringEvents();
      
//   //     if (savedEvents) {
//   //       try {
//   //         const parsedEvents = JSON.parse(savedEvents).map(event => ({
//   //           ...event,
//   //           start: new Date(event.start),
//   //           end: new Date(event.end)
//   //         }));
          
//   //         const filteredSavedEvents = parsedEvents.filter(
//   //           event => !event.originalId || 
//   //                   (event.originalId !== 'morning-scrum' && 
//   //                    event.originalId !== 'evening-scrum')
//   //         );
          
//   //         const filteredMockEvents = mockEvents.filter(
//   //           mockEvent => !parsedEvents.some(savedEvent => 
//   //             savedEvent.id === mockEvent.id ||
//   //             (savedEvent.originalId && savedEvent.originalId === mockEvent.originalId)
//   //         ));
          
//   //         setEvents([...recurringEvents, ...filteredSavedEvents, ...filteredMockEvents]);
//   //       } catch (e) {
//   //         console.error("Failed to parse saved events:", e);
//   //         setEvents([...recurringEvents, ...mockEvents]);
//   //       }
//   //     } else {
//   //       setEvents([...recurringEvents, ...mockEvents]);
//   //     }
//   //   };

//   //   loadEvents();
//   // }, []);

//   // // Save events to localStorage whenever they change
//   // useEffect(() => {
//   //   const saveEvents = () => {
//   //     const eventsWithoutRecurring = events.filter(
//   //       event => !event.isRecurring || 
//   //               (event.originalId !== 'morning-scrum' && 
//   //                event.originalId !== 'evening-scrum')
//   //     );
      
//   //     localStorage.setItem(
//   //       'calendarEvents', 
//   //       JSON.stringify(eventsWithoutRecurring)
//   //     );
//   //   };

//   //   saveEvents();
//   // }, [events]);

//   useEffect(() => {
//     const loadEvents = () => {
//       try {
//         const savedEvents = localStorage.getItem('calendarEvents');
//         const recurringEvents = generateRecurringEvents();
        
//         let parsedEvents = [];
        
//         if (savedEvents) {
//           parsedEvents = JSON.parse(savedEvents).map(event => ({
//             ...event,
//             start: new Date(event.start),
//             end: new Date(event.end)
//           }));
//         }

//         // Merge events more simply - don't filter out mock events if they exist in localStorage
//         setEvents([...recurringEvents, ...parsedEvents, ...mockEvents]);
//       } catch (e) {
//         console.error("Failed to load events:", e);
//         // Fallback to just recurring and mock events
//         setEvents([...generateRecurringEvents(), ...mockEvents]);
//       }
//     };

//     loadEvents();
//   }, []);

//   // Save events to localStorage whenever they change
//   useEffect(() => {
//     const saveEvents = () => {
//       try {
//         // Filter out recurring events that shouldn't be saved
//         const eventsToSave = events.filter(event => 
//           !event.isRecurring || 
//           (event.originalId !== 'morning-scrum' && 
//            event.originalId !== 'evening-scrum')
//         );
        
//         // Convert Date objects to ISO strings for storage
//         const serializedEvents = eventsToSave.map(event => ({
//           ...event,
//           start: event.start.toISOString(),
//           end: event.end.toISOString()
//         }));
        
//         localStorage.setItem('calendarEvents', JSON.stringify(serializedEvents));
//       } catch (e) {
//         console.error("Failed to save events:", e);
//       }
//     };

//     saveEvents();
//   }, [events]);

//   // Enhanced date click handler that respects current view
//   const onDateClick = (day) => {
//     setSelectedDate(day);
    
//     // Update currentDate based on current view
//     switch(view) {
//       case 'day':
//         setCurrentDate(day);
//         break;
//       case 'week':
//         setCurrentDate(startOfWeek(day));
//         break;
//       case 'month':
//         setCurrentDate(startOfMonth(day));
//         break;
//       default:
//         setCurrentDate(day);
//     }
//   };

//   // Date navigation handlers
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
//     const today = new Date();
//     setSelectedDate(today);
//     switch(view) {
//       case 'day':
//         setCurrentDate(today);
//         break;
//       case 'week':
//         setCurrentDate(startOfWeek(today));
//         break;
//       case 'month':
//         setCurrentDate(startOfMonth(today));
//         break;
//       default:
//         setCurrentDate(today);
//     }
//   };

//   // View change handler that maintains proper date context
//   const handleViewChange = (newView) => {
//     setView(newView);
//     // Adjust currentDate based on new view
//     switch(newView) {
//       case 'day':
//         setCurrentDate(selectedDate);
//         break;
//       case 'week':
//         setCurrentDate(startOfWeek(selectedDate));
//         break;
//       case 'month':
//         setCurrentDate(startOfMonth(selectedDate));
//         break;
//       default:
//         setCurrentDate(selectedDate);
//     }
//   };

//   // Event CRUD operations
//   const handleAddEvent = (newEvent) => {
//     const updatedEvents = [...events, newEvent];
//     setEvents(updatedEvents);
//     setShowEventForm(false);
//   };

//   const handleUpdateEvent = (updatedEvent) => {
//     if (updatedEvent.isRecurring) {
//       // For recurring events, update all future instances
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
//     const updatedEvents = events.filter(event => event.id !== eventId);
//     setEvents(updatedEvents);
//     setShowEventDetails(false);
//   };

//   // Event form management
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

//   const openExistingEvent = (event) => {
//     // For recurring events, edit just this instance but keep the connection
//     const editableEvent = event.isRecurring 
//       ? { ...event, id: `edited-${Date.now()}` } 
//       : event;
//     setSelectedEvent(editableEvent);
//     setShowEventDetails(true);
//   };

//   const editEvent = () => {
//     setShowEventDetails(false);
//     setShowEventForm(true);
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar Component */}
//       <CalendarSidebar 
//         currentDate={currentDate}
//         selectedDate={selectedDate}
//         onDateClick={onDateClick}
//         events={events}
//         setShowEventForm={setShowEventForm}
//       />
      
//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Calendar Header */}
//         <CalendarHeader 
//           currentDate={currentDate}
//           view={view}
//           setView={handleViewChange}  // Updated to use our enhanced handler
//           handleToday={handleToday}
//           nextWeek={nextWeek}
//           prevWeek={prevWeek}
//           nextMonth={nextMonth}
//           prevMonth={prevMonth}
//           nextDay={nextDay}
//           prevDay={prevDay}
//           setShowEventForm={setShowEventForm}
//         />
        
//         {/* Calendar Views */}
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
//       {/* Event Form Modal */}
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

//       {/* Event Details Modal */}
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





// Import required React hooks and date-fns functions
import { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay } from 'date-fns';

// Import all components and utilities
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

  // Helper function to safely parse dates from localStorage
  const parseDateSafe = (dateString) => {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? new Date() : date;
    } catch {
      return new Date();
    }
  };

  // Load events from localStorage on initial render
  useEffect(() => {
    const loadEvents = () => {
      console.log('[DEBUG] Loading events from localStorage...');
      
      try {
        // 1. Get recurring events (these are generated, not stored)
        const recurringEvents = generateRecurringEvents();
        
        // 2. Try to load saved events from localStorage
        const savedEventsJSON = localStorage.getItem('calendarEvents');
        let savedEvents = [];
        
        if (savedEventsJSON) {
          try {
            savedEvents = JSON.parse(savedEventsJSON).map(event => ({
              ...event,
              start: parseDateSafe(event.start),
              end: parseDateSafe(event.end)
            }));
            console.log('[DEBUG] Successfully parsed saved events:', savedEvents);
          } catch (parseError) {
            console.error('[ERROR] Failed to parse saved events:', parseError);
          }
        }
        
        // 3. Load mock events (only if they don't exist in savedEvents)
        const mockEventsToAdd = mockEvents.filter(
          mockEvent => !savedEvents.some(savedEvent => savedEvent.id === mockEvent.id)
        );
        
        // 4. Combine all events with proper deduplication
        const allEvents = [
          ...recurringEvents,
          ...savedEvents,
          ...mockEventsToAdd
        ];
        
        console.log('[DEBUG] Setting combined events:', allEvents);
        setEvents(allEvents);
      } catch (error) {
        console.error('[ERROR] Failed to load events:', error);
        // Fallback to just recurring and mock events
        setEvents([...generateRecurringEvents(), ...mockEvents]);
      }
    };

    loadEvents();
    
    // Add debug function to window for testing
    window.debugCalendarStorage = () => {
      console.log('=== Storage Debug ===');
      console.log('Current localStorage:', localStorage.getItem('calendarEvents'));
      console.log('Current events state:', events);
    };
  }, []);

  // Save events to localStorage whenever they change
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
    switch(view) {
      case 'day': setCurrentDate(today); break;
      case 'week': setCurrentDate(startOfWeek(today)); break;
      case 'month': setCurrentDate(startOfMonth(today)); break;
      default: setCurrentDate(today);
    }
  };

  // View change handler
  const handleViewChange = (newView) => {
    setView(newView);
    switch(newView) {
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
    switch(view) {
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