// import React from 'react';
// import './Calendar.css';

// const Calendar = () => {
//   const days = ['19 Mon', '20 Tue', '21 Wed', '22 Thu', '23 Fri'];
//   const times = ['10:00', '11:00', '12:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00'];

//   return (
//     <div className="calendar">
//       <div className="calendar-header">
//         <h3>Calendar</h3>
//         <div className="month-navigation">
//           <span>December 2023</span>
//           <div className="nav-arrows">
//             <button>&lt;</button>
//             <button>&gt;</button>
//           </div>
//         </div>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             {days.map((day, index) => (
//               <th key={index}>{day}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {times.map((time, timeIndex) => (
//             <tr key={timeIndex}>
//               {days.map((day, dayIndex) => (
//                 <td key={dayIndex}>
//                   {dayIndex === 0 && timeIndex === 0 ? (
//                     <div className="calendar-event">10:00</div>
//                   ) : (
//                     ''
//                   )}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Calendar;

import React from 'react';
import { format, parseISO, isSameDay } from 'date-fns';
import './Calendar.css';

const Calendar = ({ interviews = [] }) => {
  // Get current week dates
  const now = new Date();
  const currentWeek = [];
  
  // Start from Monday of current week
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1);
  
  for (let i = 0; i < 5; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    currentWeek.push(date);
  }

  // Time slots
  const times = [];
  for (let hour = 10; hour <= 18; hour++) {
    times.push(`${hour}:00`);
  }

  // Group interviews by day and time
  const getInterviewsForDay = (day) => {
    return interviews.filter(interview => {
      const interviewDate = parseISO(interview.scheduledDate);
      return isSameDay(interviewDate, day);
    });
  };

  const getInterviewAtTime = (day, time) => {
    const dayInterviews = getInterviewsForDay(day);
    return dayInterviews.find(interview => {
      const interviewTime = format(parseISO(interview.scheduledDate), 'HH:mm');
      return interviewTime.startsWith(time.split(':')[0]);
    });
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h3>Calendar</h3>
        <div className="month-navigation">
          <span>{format(now, 'MMMM yyyy')}</span>
          <div className="nav-arrows">
            <button>&lt;</button>
            <button>&gt;</button>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            {currentWeek.map((day, index) => (
              <th key={index}>{format(day, 'dd EEE')}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time, timeIndex) => (
            <tr key={timeIndex}>
              {currentWeek.map((day, dayIndex) => {
                const interview = getInterviewAtTime(day, time);
                return (
                  <td key={dayIndex}>
                    {interview && (
                      <div className="calendar-event">
                        <div className="event-title">{interview.candidateName}</div>
                        <div className="event-time">{format(parseISO(interview.scheduledDate), 'HH:mm')}</div>
                        <div className="event-type">{interview.interviewType}</div>
                      </div>
                    )}
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