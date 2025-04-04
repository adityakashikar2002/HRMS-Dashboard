// import { format, isSameDay } from 'date-fns';
// import CalendarEvent from './components/CalendarEvent';

// const DayView = ({ currentDate, events, openEventForm, openExistingEvent }) => {
//   const hours = Array.from({ length: 24 }, (_, i) => i);
  
//   const filteredEvents = events.filter(event => 
//     isSameDay(event.start, currentDate)
//   );

//   return (
//     <div className="bg-white rounded-lg shadow overflow-hidden">
//       <div className="flex">
//         <div className="w-16 border-r">
//           <div className="h-16 border-b flex items-center justify-center text-gray-500">
//             Time
//           </div>
//           {hours.map(hour => (
//             <div 
//               key={hour} 
//               className="h-16 border-b flex items-start justify-end pr-2 pt-1 text-xs text-gray-500"
//             >
//               {format(new Date().setHours(hour, 0, 0, 0), 'h a')}
//             </div>
//           ))}
//         </div>
        
//         <div className="flex-1">
//           <div className="h-16 border-b flex items-center justify-center font-semibold">
//             {format(currentDate, 'EEEE, MMMM d, yyyy')}
//           </div>
//           <div className="relative">
//             {hours.map(hour => (
//               <div 
//                 key={hour} 
//                 className="h-16 border-b relative"
//                 onClick={() => openEventForm(currentDate, `${hour}:00`)}
//               >
//                 <div className="absolute inset-0 hover:bg-gray-100 cursor-pointer"></div>
//               </div>
//             ))}
            
//             {filteredEvents.map(event => (
//               <div
//                 key={event.id}
//                 className="absolute left-0 right-0 px-2"
//                 style={{
//                   top: `${(event.start.getHours() + event.start.getMinutes() / 60) * 64}px`,
//                   height: `${Math.max(
//                     ((event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60)) * 64,
//                     32
//                   )}px`
//                 }}
//               >
//                 <CalendarEvent 
//                   event={event} 
//                   onClick={openExistingEvent}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DayView;

import CalendarDay from '../components/CalendarDay';

const DayView = ({ currentDate, events, openEventForm, openExistingEvent }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden h-full">
      <CalendarDay 
        currentDate={currentDate}
        events={events}
        onEventClick={openExistingEvent}
        onTimeSlotClick={openEventForm}
      />
    </div>
  );
};

export default DayView;