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