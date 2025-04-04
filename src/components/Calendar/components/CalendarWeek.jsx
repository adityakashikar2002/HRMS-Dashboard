import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import CalendarEvent from './CalendarEvent';

const CalendarWeek = ({ currentDate, events, onEventClick, onTimeSlotClick }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const weekStart = startOfWeek(currentDate);
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="flex flex-col h-full">
      {/* Weekday Header */}
      <div className="grid grid-cols-8 bg-gray-50 border-b">
        <div className="p-2 border-r"></div>
        {days.map(day => (
          <div 
            key={day} 
            className={`p-2 text-center font-medium text-sm ${
              isSameDay(day, new Date()) ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
            }`}
          >
            <div>{format(day, 'EEE')}</div>
            <div className={`rounded-full w-7 h-7 flex items-center justify-center mx-auto ${
              isSameDay(day, currentDate) ? 'bg-blue-600 text-white' : ''
            }`}>
              {format(day, 'd')}
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-auto">
        <div className="flex">
          {/* Time Column */}
          <div className="w-16 flex-shrink-0">
            {hours.map(hour => (
              <div 
                key={hour} 
                className="h-16 border-b border-r flex items-start justify-end pr-2 pt-1 text-xs text-gray-500"
              >
                {format(new Date().setHours(hour, 0, 0, 0), 'h a')}
              </div>
            ))}
          </div>
          
          {/* Day Columns */}
          {days.map(day => {
            const dayEvents = events.filter(event => isSameDay(event.start, day));
            
            return (
              <div key={day} className="flex-1 border-r last:border-r-0 relative">
                {/* Time slots */}
                {hours.map(hour => (
                  <div 
                    key={hour} 
                    className="h-16 border-b relative"
                    onClick={() => onTimeSlotClick(day, `${hour}:00`)}
                  >
                    <div className="absolute inset-0 hover:bg-gray-50 cursor-pointer"></div>
                  </div>
                ))}
                
                {/* Events */}
                {dayEvents.map(event => (
                  <div
                    key={event.id}
                    className="absolute left-0 right-0 px-1"
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarWeek;