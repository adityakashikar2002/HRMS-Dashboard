import { format, isSameDay } from 'date-fns';
import CalendarEvent from './CalendarEvent';

const CalendarDay = ({ currentDate, events, onEventClick, onTimeSlotClick }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const filteredEvents = events.filter(event => 
    isSameDay(event.start, currentDate)
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <div className="flex">
          <div className="w-16 flex-shrink-0">
            <div className="h-16 border-b border-r flex items-center justify-center text-gray-500 text-sm">
              Time
            </div>
            {hours.map(hour => (
              <div 
                key={hour} 
                className="h-16 border-b border-r flex items-start justify-end pr-2 pt-1 text-xs text-gray-500"
              >
                {format(new Date().setHours(hour, 0, 0, 0), 'h a')}
              </div>
            ))}
          </div>
          
          <div className="flex-1 relative">
            <div className="h-16 border-b flex items-center justify-center font-semibold text-sm">
              {format(currentDate, 'EEEE, MMMM d, yyyy')}
            </div>
            
            {hours.map(hour => (
              <div 
                key={hour} 
                className="h-16 border-b relative"
                onClick={() => onTimeSlotClick(currentDate, `${hour}:00`)}
              >
                <div className="absolute inset-0 hover:bg-gray-50 cursor-pointer"></div>
              </div>
            ))}
            
            {filteredEvents.map(event => (
              <div
                key={event.id}
                className="absolute left-0 right-0 px-2"
                style={{
                  top: `${(event.start.getHours() + event.start.getMinutes() / 60) * 64}px`,
                  height: `${Math.max(
                    ((event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60)) * 64,
                    32
                  )}px`
                }}
              >
                <CalendarEvent 
                  event={event} 
                  onClick={() => onEventClick(event)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarDay;