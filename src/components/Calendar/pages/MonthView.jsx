// import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, parseISO } from 'date-fns';
// import CalendarEvent from './components/CalendarEvent';

// const MonthView = ({ currentDate, selectedDate, events, onDateClick, openEventForm, openExistingEvent }) => {
//   const monthStart = startOfMonth(currentDate);
//   const monthEnd = endOfMonth(monthStart);
//   const startDate = startOfWeek(monthStart);
//   const endDate = endOfWeek(monthEnd);

//   const dateFormat = "d";
//   const rows = [];
//   let days = [];
//   let day = startDate;
//   let formattedDate = "";

//   while (day <= endDate) {
//     for (let i = 0; i < 7; i++) {
//       formattedDate = format(day, dateFormat);
//       const cloneDay = day;
      
//       const dayEvents = events.filter(event => 
//         isSameDay(parseISO(new Date(event.start).toISOString()), cloneDay)
//       );
      
//       days.push(
//         <div
//           className={`min-h-24 p-1 border ${!isSameMonth(day, monthStart) ? 'bg-gray-50' : ''}`}
//           key={day}
//         >
//           <div 
//             className={`text-right p-1 cursor-pointer rounded-full w-6 h-6 flex items-center justify-center ml-auto ${
//               isSameDay(day, selectedDate) ? 'bg-blue-600 text-white' : ''
//             } ${
//               isSameDay(day, new Date()) ? 'border border-blue-600' : ''
//             }`}
//             onClick={() => {
//               onDateClick(cloneDay);
//             }}
//           >
//             {formattedDate}
//           </div>
          
//           <div className="mt-1 space-y-1">
//             {dayEvents.slice(0, 2).map(event => (
//               <CalendarEvent 
//                 key={event.id} 
//                 event={event} 
//                 onClick={openExistingEvent}
//               />
//             ))}
//             {dayEvents.length > 2 && (
//               <div className="text-xs text-gray-500 pl-2">
//                 +{dayEvents.length - 2} more
//               </div>
//             )}
//           </div>
//         </div>
//       );
//       day = addDays(day, 1);
//     }
//     rows.push(
//       <div className="grid grid-cols-7" key={day}>
//         {days}
//       </div>
//     );
//     days = [];
//   }

//   return (
//     <div className="bg-white rounded-lg shadow overflow-hidden">
//       <div className="grid grid-cols-7 bg-gray-50">
//         {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//           <div key={day} className="p-2 text-center font-medium text-gray-500">
//             {day}
//           </div>
//         ))}
//       </div>
//       {rows}
//     </div>
//   );
// };

// export default MonthView;

import CalendarMonth from '../components/CalendarMonth';

const MonthView = ({ currentDate, selectedDate, events, onDateClick, openExistingEvent }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden h-full">
      <CalendarMonth 
        currentDate={currentDate}
        selectedDate={selectedDate}
        events={events}
        onDateClick={onDateClick}
        onEventClick={openExistingEvent}
      />
    </div>
  );
};

export default MonthView;