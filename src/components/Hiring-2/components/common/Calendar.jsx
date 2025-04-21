import React, { useState, useEffect } from 'react';
import { format, isSameDay, addWeeks, subWeeks, startOfWeek, addDays } from 'date-fns';
import './Calendar.css';

const Calendar = ({ interviews = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState([]);

  const updateWeek = (date) => {
    const weekStart = startOfWeek(date, { weekStartsOn: 1 }); // Monday
    const weekDays = [];
    for (let i = 0; i < 5; i++) {
      weekDays.push(addDays(weekStart, i));
    }
    setCurrentWeek(weekDays);
  };

  useEffect(() => {
    updateWeek(currentDate);
  }, [currentDate]);

  const handlePreviousWeek = () => {
    const newDate = subWeeks(currentDate, 1);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = addWeeks(currentDate, 1);
    setCurrentDate(newDate);
  };

  // Time slots - every 30 minutes from 9 AM to 6 PM (9:00, 9:30, 10:00, etc.)
  const times = [];
  for (let hour = 9; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const paddedHour = hour.toString().padStart(2, '0');
      const paddedMinute = minute.toString().padStart(2, '0');
      const timeString = `${paddedHour}:${paddedMinute}`; // e.g., "09:00", "09:30"
      times.push(timeString);
    }
  }

  // Group interviews by day and time
  const getInterviewsForDay = (day) => {
    return interviews.filter(interview => {
      const interviewDate = new Date(interview.scheduledDate);
      return isSameDay(interviewDate, day);
    });
  };

  const getInterviewAtTime = (day, time) => {
    const dayInterviews = getInterviewsForDay(day);
    return dayInterviews.find(interview => {
      // Extract hour and minute from the time slot (e.g., "09:30" → hour=9, minute=30)
      const [displayHour, displayMinute] = time.split(':');
      const [interviewHour, interviewMinute] = interview.startTime.split(':');
      
      // Compare both hour and minute
      return (
        parseInt(interviewHour, 10) === parseInt(displayHour, 10) &&
        parseInt(interviewMinute, 10) === parseInt(displayMinute, 10)
      );
    });
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h3>Calendar</h3>
        <div className="month-navigation">
          <span>{format(currentDate, 'MMMM yyyy')}</span>
          <div className="nav-arrows">
            <button onClick={handlePreviousWeek}>&lt;</button>
            <button onClick={handleNextWeek}>&gt;</button>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th className="time-column">Time</th>
            {currentWeek.map((day, index) => (
              <th key={index} className={isSameDay(day, new Date()) ? 'today' : ''}>
                {format(day, 'EEE')}<br />
                <span>{format(day, 'd')}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time, timeIndex) => (
            <tr key={timeIndex} style={{ height: '40px' }}> {/* Reduced row height for more slots */}
              <td className="time-cell">{format(new Date(`2000-01-01T${time}`), 'h:mm a')}</td>
              {currentWeek.map((day, dayIndex) => {
                const interview = getInterviewAtTime(day, time);
                return (
                  <td key={dayIndex} style={{ padding: '2px' }}> {/* Smaller padding for tighter layout */}
                    {interview ? (
                      <div className="calendar-event">
                        <div className="event-title">{interview.candidateName}</div>
                        <div className="event-time">{interview.timeSlot}</div>
                        <div className="event-type">{interview.interviewType}</div>
                        <div className="event-interviewer">{interview.interviewer}</div>
                      </div>
                    ) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;