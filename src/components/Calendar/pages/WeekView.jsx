// import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
// import CalendarEvent from './components/CalendarEvent';

// const WeekView = ({ currentDate, events, openEventForm, openExistingEvent }) => {
//   const hours = Array.from({ length: 24 }, (_, i) => i);
//   const weekStart = startOfWeek(currentDate);
//   const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

//   return (
//     <div className="bg-white rounded-lg shadow overflow-hidden">
//       <div className="flex">
//         <div className="w-16 border-r">
//           <div className="h-16 border-b"></div>
//           {hours.map(hour => (
//             <div 
//               key={hour} 
//               className="h-16 border-b flex items-start justify-end pr-2 pt-1 text-xs text-gray-500"
//             >
//               {format(new Date().setHours(hour, 0, 0, 0), 'h a')}
//             </div>
//           ))}
//         </div>
        
//         {days.map(day => {
//           const dayEvents = events.filter(event => isSameDay(event.start, day));
          
//           return (
//             <div key={day} className="flex-1 border-r last:border-r-0">
//               <div className={`h-16 border-b flex flex-col items-center justify-center ${
//                 isSameDay(day, new Date()) ? 'bg-blue-100 text-blue-600' : ''
//               }`}>
//                 <div className="font-medium">{format(day, 'EEE')}</div>
//                 <div className="text-sm">{format(day, 'd')}</div>
//               </div>
              
//               <div className="relative">
//                 {hours.map(hour => (
//                   <div 
//                     key={hour} 
//                     className="h-16 border-b relative"
//                     onClick={() => openEventForm(day, `${hour}:00`)}
//                   >
//                     <div className="absolute inset-0 hover:bg-gray-100 cursor-pointer"></div>
//                   </div>
//                 ))}
                
//                 {dayEvents.map(event => (
//                   <div
//                     key={event.id}
//                     className="absolute left-0 right-0 px-1"
//                     style={{
//                       top: `${(event.start.getHours() + event.start.getMinutes() / 60) * 64}px`,
//                       height: `${Math.max(
//                         ((event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60)) * 64,
//                         32
//                       )}px`
//                     }}
//                   >
//                     <CalendarEvent 
//                       event={event} 
//                       onClick={openExistingEvent}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default WeekView;

//WORKS BUT LOOKS SAME AS 
// import CalendarDay from '../components/CalendarDay';

// const DayView = ({ currentDate, events, openEventForm, openExistingEvent }) => {
//   return (
//     <div className="bg-white rounded-lg shadow overflow-hidden h-full">
//       <CalendarDay 
//         currentDate={currentDate}
//         events={events}
//         onEventClick={openExistingEvent}
//         onTimeSlotClick={openEventForm}
//       />
//     </div>
//   );
// };

// export default DayView;


import CalendarWeek from '../components/CalendarWeek';

const WeekView = ({ currentDate, events, openEventForm, openExistingEvent }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden h-full">
      <CalendarWeek 
        currentDate={currentDate}
        events={events}
        onEventClick={openExistingEvent}
        onTimeSlotClick={openEventForm}
      />
    </div>
  );
};

export default WeekView;