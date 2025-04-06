//WORKS 99
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