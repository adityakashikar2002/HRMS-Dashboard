// import { format } from 'date-fns';

// const CalendarEvent = ({ event, onClick }) => {
//   return (
//     <div 
//       onClick={() => onClick(event)}
//       className={`p-2 mb-1 text-xs rounded cursor-pointer truncate`}
//       style={{ 
//         backgroundColor: `${event.color}20`,
//         borderLeft: `3px solid ${event.color}`
//       }}
//     >
//       <div className="font-medium" style={{ color: event.color }}>
//         {format(event.start, 'h:mm a')} - {event.title}
//       </div>
//     </div>
//   );
// };

// export default CalendarEvent;




import { format } from 'date-fns';

const CalendarEvent = ({ event, onClick, compact = false }) => {
  if (compact) {
    return (
      <div 
        onClick={() => onClick(event)}
        className={`p-1 mb-1 text-xs rounded cursor-pointer truncate`}
        style={{ 
          backgroundColor: `${event.color}20`,
          borderLeft: `2px solid ${event.color}`
        }}
      >
        <div className="truncate" style={{ color: event.color }}>
          {format(event.start, 'h:mm a')} - {event.title}
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => onClick(event)}
      className={`p-2 mb-1 text-xs rounded cursor-pointer`}
      style={{ 
        backgroundColor: `${event.color}20`,
        borderLeft: `3px solid ${event.color}`
      }}
    >
      <div className="font-medium" style={{ color: event.color }}>
        {format(event.start, 'h:mm a')} - {event.title}
      </div>
      {event.description && (
        <div className="text-gray-600 truncate">{event.description}</div>
      )}
      
    </div>
  );
};

export default CalendarEvent;