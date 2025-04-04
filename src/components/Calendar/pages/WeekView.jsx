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