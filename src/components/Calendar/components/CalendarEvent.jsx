import { format } from 'date-fns';

const CalendarEvent = ({ event, onClick, compact = false }) => {
  const timeText = event.allDay 
    ? 'All day' 
    : `${format(event.start, 'h:mm a')} - ${format(event.end, 'h:mm a')}`;

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
      className={`p-2 mb-1 text-xs rounded cursor-pointer ${
        event.isHoliday ? 'bg-purple-100 border-l-3 border-purple-600' : ''
      }`}
      style={{ 
        backgroundColor: event.isHoliday ? '' : `${event.color}20`,
        borderLeft: event.isHoliday ? '' : `3px solid ${event.color}`
      }}
    >
      <div className="font-medium" style={{ color: event.isHoliday ? '#7c3aed' : event.color }}>
        {timeText} - {event.title}
      </div>
      {event.description && (
        <div className="text-gray-600 truncate">{event.description}</div>
      )}
      {event.isHoliday && (
        <div className="text-purple-500 text-xs mt-1">Public Holiday</div>
      )}
    </div>
  );
};

export default CalendarEvent;