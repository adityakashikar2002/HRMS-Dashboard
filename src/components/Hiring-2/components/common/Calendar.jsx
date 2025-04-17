// import React from 'react';
// import { format, parseISO, isSameDay } from 'date-fns';
// import './Calendar.css';

// const Calendar = ({ interviews = [] }) => {
//   // Get current week dates
//   const now = new Date();
//   const currentWeek = [];
  
//   // Start from Monday of current week
//   const startOfWeek = new Date(now);
//   startOfWeek.setDate(now.getDate() - now.getDay() + 1);
  
//   for (let i = 0; i < 5; i++) {
//     const date = new Date(startOfWeek);
//     date.setDate(startOfWeek.getDate() + i);
//     currentWeek.push(date);
//   }

//   // Time slots
//   const times = [];
//   for (let hour = 10; hour <= 18; hour++) {
//     times.push(`${hour}:00`);
//   }

//   // Group interviews by day and time
//   const getInterviewsForDay = (day) => {
//     return interviews.filter(interview => {
//       const interviewDate = parseISO(interview.scheduledDate);
//       return isSameDay(interviewDate, day);
//     });
//   };

//   const getInterviewAtTime = (day, time) => {
//     const dayInterviews = getInterviewsForDay(day);
//     return dayInterviews.find(interview => {
//       const interviewTime = format(parseISO(interview.scheduledDate), 'HH:mm');
//       return interviewTime.startsWith(time.split(':')[0]);
//     });
//   };

//   return (
//     <div className="calendar">
//       <div className="calendar-header">
//         <h3>Calendar</h3>
//         <div className="month-navigation">
//           <span>{format(now, 'MMMM yyyy')}</span>
//           <div className="nav-arrows">
//             <button>&lt;</button>
//             <button>&gt;</button>
//           </div>
//         </div>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             {currentWeek.map((day, index) => (
//               <th key={index}>{format(day, 'dd EEE')}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {times.map((time, timeIndex) => (
//             <tr key={timeIndex}>
//               {currentWeek.map((day, dayIndex) => {
//                 const interview = getInterviewAtTime(day, time);
//                 return (
//                   <td key={dayIndex}>
//                     {interview && (
//                       <div className="calendar-event">
//                         <div className="event-title">{interview.candidateName}</div>
//                         <div className="event-time">{format(parseISO(interview.scheduledDate), 'HH:mm')}</div>
//                         <div className="event-type">{interview.interviewType}</div>
//                       </div>
//                     )}
//                   </td>
//                 );
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Calendar;


// Calendar.jsx
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

  // Time slots - every hour from 9 AM to 6 PM
  const times = [];
  // for (let hour = 9; hour <= 18; hour++) {
  //   const timeString = `${hour}:00`;
  //   times.push(timeString);
  // }
  for (let hour = 9; hour <= 18; hour++) {
    const paddedHour = hour.toString().padStart(2, '0'); // ensure "09", "10", etc.
    const timeString = `${paddedHour}:00`; // now "09:00"
    times.push(timeString);
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
      // Compare with the start time (24-hour format)
      const [displayHour] = time.split(':');
      const [interviewHour] = interview.startTime.split(':');
      return parseInt(interviewHour, 10) === parseInt(displayHour, 10);
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
        {/* <tbody>
          {times.map((time, timeIndex) => (
            <tr key={timeIndex} style={{ height: '80px' }}> 
              <td className="time-cell">{format(new Date(`2000-01-01 ${time}`), 'h:mm a')}</td>
              {currentWeek.map((day, dayIndex) => {
                const interview = getInterviewAtTime(day, time);
                return (
                  <td key={dayIndex} style={{ padding: '5px' }}>
                    {interview && (
                      <div className="calendar-event">
                        <div className="event-title">{interview.candidateName}</div>
                        <div className="event-time">{interview.timeSlot}</div>
                        <div className="event-type">{interview.interviewType}</div>
                        <div className="event-interviewer">{interview.interviewer}</div>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody> */}
        <tbody>
          {times.map((time, timeIndex) => (
            <tr key={timeIndex} style={{ height: '80px' }}>
              <td className="time-cell">{format(new Date(`2000-01-01T${time}`), 'h:mm a')}</td>
              {currentWeek.map((day, dayIndex) => {
                const interview = getInterviewAtTime(day, time);
                return (
                  <td key={dayIndex} style={{ padding: '5px' }}>
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