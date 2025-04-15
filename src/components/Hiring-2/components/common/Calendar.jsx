import React from 'react';
import './Calendar.css';

const Calendar = () => {
  const days = ['19 Mon', '20 Tue', '21 Wed', '22 Thu', '23 Fri'];
  const times = ['10:00', '11:00', '12:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00'];

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h3>Calendar</h3>
        <div className="month-navigation">
          <span>December 2023</span>
          <div className="nav-arrows">
            <button>&lt;</button>
            <button>&gt;</button>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            {days.map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time, timeIndex) => (
            <tr key={timeIndex}>
              {days.map((day, dayIndex) => (
                <td key={dayIndex}>
                  {dayIndex === 0 && timeIndex === 0 ? (
                    <div className="calendar-event">10:00</div>
                  ) : (
                    ''
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;