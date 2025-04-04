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

//   // Load events from localStorage on initial render
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

//   // return (
//   //   <div className="flex h-screen bg-gray-100">
//   //     {/* Sidebar Component */}
//   //     <CalendarSidebar 
//   //       currentDate={currentDate}
//   //       selectedDate={selectedDate}
//   //       onDateClick={onDateClick}
//   //       events={events}
//   //       setShowEventForm={setShowEventForm}
//   //     />
      
//   //     {/* Main Content Area */}
//   //     <div className="flex-1 flex flex-col overflow-hidden">
//   //       {/* Calendar Header */}
//   //       <CalendarHeader 
//   //         currentDate={currentDate}
//   //         view={view}
//   //         setView={setView}
//   //         handleToday={handleToday}
//   //         nextWeek={nextWeek}
//   //         prevWeek={prevWeek}
//   //         nextMonth={nextMonth}
//   //         prevMonth={prevMonth}
//   //         nextDay={nextDay}
//   //         prevDay={prevDay}
//   //         setShowEventForm={setShowEventForm}
//   //       />
        
//   //       {/* Calendar Views */}
//   //       <div className="flex-1 overflow-auto p-4">
//   //         {view === 'day' && (
//   //           <DayView 
//   //             currentDate={currentDate}
//   //             selectedDate={selectedDate}
//   //             events={events}
//   //             openEventForm={openEventForm}
//   //             openExistingEvent={openExistingEvent}
//   //           />
//   //         )}
//   //         {view === 'week' && (
//   //           <WeekView 
//   //             currentDate={currentDate}
//   //             selectedDate={selectedDate}
//   //             events={events}
//   //             openEventForm={openEventForm}
//   //             openExistingEvent={openExistingEvent}
//   //           />
//   //         )}
//   //         {view === 'month' && (
//   //           <MonthView 
//   //             currentDate={currentDate}
//   //             selectedDate={selectedDate}
//   //             events={events}
//   //             onDateClick={onDateClick}
//   //             openEventForm={openEventForm}
//   //             openExistingEvent={openExistingEvent}
//   //           />
//   //         )}
//   //       </div>
//   //     </div>

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
          
  //         const filteredSavedEvents = parsedEvents.filter(
  //           event => !event.originalId || 
  //                   (event.originalId !== 'morning-scrum' && 
  //                    event.originalId !== 'evening-scrum')
  //         );
          
  //         const filteredMockEvents = mockEvents.filter(
  //           mockEvent => !parsedEvents.some(savedEvent => 
  //             savedEvent.id === mockEvent.id ||
  //             (savedEvent.originalId && savedEvent.originalId === mockEvent.originalId)
  //         ));
          
  //         setEvents([...recurringEvents, ...filteredSavedEvents, ...filteredMockEvents]);
  //       } catch (e) {
  //         console.error("Failed to parse saved events:", e);
  //         setEvents([...recurringEvents, ...mockEvents]);
  //       }
  //     } else {
  //       setEvents([...recurringEvents, ...mockEvents]);
  //     }
  //   };

  //   loadEvents();
  // }, []);

  // Update the save effect
useEffect(() => {
  // Save only user-created events (not recurring, not mock)
  const eventsToSave = events.filter(event => {
    const isRecurring = event.isRecurring || 
                       ['morning-scrum', 'evening-scrum'].includes(event.originalId);
    const isMock = mockEvents.some(mock => mock.id === event.id);
    
    return !isRecurring && !isMock;
  });

  console.log('Events being saved:', eventsToSave);
  
  try {
    localStorage.setItem('calendarEvents', JSON.stringify(eventsToSave));
  } catch (error) {
    console.error('Failed to save events:', error);
  }
}, [events]);

// Update the load effect
useEffect(() => {
  const loadEvents = () => {
    try {
      // 1. Generate recurring events (fresh each time)
      const recurringEvents = generateRecurringEvents();
      
      // 2. Load saved user events
      const savedEventsJson = localStorage.getItem('calendarEvents');
      const savedEvents = savedEventsJson 
        ? JSON.parse(savedEventsJson).map(event => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end)
          }))
        : [];
      
      // 3. Load mock events (excluding duplicates)
      const filteredMockEvents = mockEvents.filter(mock => 
        !savedEvents.some(saved => saved.id === mock.id)
      );
      
      // Combine all sources
      const allEvents = [...recurringEvents, ...savedEvents, ...filteredMockEvents];
      
      // Deduplicate events by ID
      const uniqueEvents = allEvents.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        return x ? acc : [...acc, current];
      }, []);
      
      console.log('Loaded events:', uniqueEvents);
      setEvents(uniqueEvents);
    } catch (error) {
      console.error('Failed to load events:', error);
      setEvents([...generateRecurringEvents(), ...mockEvents]);
    }
  };

  loadEvents();
}, []);

// Update handleAddEvent to ensure unique IDs


  // Enhanced date click handler that respects current view
  const onDateClick = (day) => {
    setSelectedDate(day);
    
    // Update currentDate based on current view
    switch(view) {
      case 'day':
        setCurrentDate(day);
        break;
      case 'week':
        setCurrentDate(startOfWeek(day));
        break;
      case 'month':
        setCurrentDate(startOfMonth(day));
        break;
      default:
        setCurrentDate(day);
    }
  };

  // Date navigation handlers
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
    const today = new Date();
    setSelectedDate(today);
    switch(view) {
      case 'day':
        setCurrentDate(today);
        break;
      case 'week':
        setCurrentDate(startOfWeek(today));
        break;
      case 'month':
        setCurrentDate(startOfMonth(today));
        break;
      default:
        setCurrentDate(today);
    }
  };

  // View change handler that maintains proper date context
  const handleViewChange = (newView) => {
    setView(newView);
    // Adjust currentDate based on new view
    switch(newView) {
      case 'day':
        setCurrentDate(selectedDate);
        break;
      case 'week':
        setCurrentDate(startOfWeek(selectedDate));
        break;
      case 'month':
        setCurrentDate(startOfMonth(selectedDate));
        break;
      default:
        setCurrentDate(selectedDate);
    }
  };

  // Event CRUD operations
  // const handleAddEvent = (newEvent) => {
  //   const updatedEvents = [...events, newEvent];
  //   setEvents(updatedEvents);
  //   setShowEventForm(false);
  // };
  const handleAddEvent = (newEvent) => {
    // Ensure the new event has a truly unique ID
    const eventWithUniqueId = {
      ...newEvent,
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    
    const updatedEvents = [...events, eventWithUniqueId];
    setEvents(updatedEvents);
    setShowEventForm(false);
  };

  const handleUpdateEvent = (updatedEvent) => {
    const updatedEvents = events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    );
    setEvents(updatedEvents);
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
          setView={handleViewChange}  // Updated to use our enhanced handler
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