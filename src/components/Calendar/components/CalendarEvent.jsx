import { format } from 'date-fns';

const CalendarEvent = ({ event, onClick, compact = false }) => {
  // if (compact) {
  //   return (
  //     <div 
  //       onClick={() => onClick(event)}
  //       className={`p-1 mb-1 text-xs rounded cursor-pointer truncate`}
  //       style={{ 
  //         backgroundColor: `${event.color}20`,
  //         borderLeft: `2px solid ${event.color}`
  //       }}
  //     >
  //       <div className="truncate" style={{ color: event.color }}>
  //         {format(event.start, 'h:mm a')} - {event.title}
  //       </div>
  //     </div>
  //   );
  // }
  if (compact) {
    return (
      <div 
        onClick={() => onClick(event)}
        className={`p-1 mb-1 text-xs rounded cursor-pointer truncate ${
          event.isHoliday ? 'bg-purple-100 border-l-2 border-purple-600' : ''
        }`}
        style={{ 
          backgroundColor: event.isHoliday ? '' : `${event.color}20`,
          borderLeft: event.isHoliday ? '' : `2px solid ${event.color}`
        }}
      >
        <div className="truncate" style={{ color: event.isHoliday ? '#7c3aed' : event.color }}>
          {event.isHoliday ? '🎉 ' : ''}{event.title}
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