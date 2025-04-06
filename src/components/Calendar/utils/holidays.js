// utils/holidays.js
const API_KEY = '0rs021LOTslXIhKf2s1TkTtwRhl9OHtg'; // Get from https://calendarific.com/

// //WORKS 99
// export const fetchHolidays = async (year, country = 'IN') => {
//   try {
//     const response = await fetch(
//       `https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=${country}&year=${year}`
//     );
//     const data = await response.json();
    
//     if (data.meta.code === 200) {
//       return data.response.holidays.map(holiday => ({
//         id: `holiday-${holiday.date.iso}-${holiday.name}`,
//         title: holiday.name,
//         start: new Date(holiday.date.iso),
//         end: new Date(holiday.date.iso),
//         allDay: true,
//         isHoliday: true,
//         color: '#8b5cf6', // Purple color for holidays
//         description: holiday.description || '',
//         type: holiday.type.join(', '),
//         isRecurring: false
//       }));
//     }
//     return [];
//   } catch (error) {
//     console.error('Error fetching holidays:', error);
//     return [];
//   }
// };

// export const fetchHolidays = async (year, country = 'IN') => {
//   try {
//     const response = await fetch(
//       `https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=${country}&year=${year}`
//     );
//     const data = await response.json();
    
//     if (data.meta.code === 200) {
//       return data.response.holidays.map(holiday => {
//         // Create date object and set to 00:00 in local time
//         const date = new Date(holiday.date.iso);
//         date.setHours(0, 0, 0, 0);
        
//         return {
//           id: `holiday-${holiday.date.iso}-${holiday.name}`,
//           title: holiday.name,
//           start: date,
//           end: new Date(date), // Same date for end
//           allDay: true,       // Mark as all-day event
//           isHoliday: true,
//           color: '#8b5cf6',
//           description: holiday.description || '',
//           type: holiday.type.join(', ')
//         };
//       });
//     }
//     return [];
//   } catch (error) {
//     console.error('Error fetching holidays:', error);
//     return [];
//   }
// };





export const fetchHolidays = async (year, country = 'IN') => {
  try {
    const response = await fetch(`https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=${country}&year=${year}`);
    const data = await response.json();
    
    if (data.meta.code === 200) {
      // Use Set to remove duplicates by name and date
      const uniqueHolidays = Array.from(new Set(
        data.response.holidays.map(h => `${h.date.iso}-${h.name}`)
      )).map(unique => {
        const holiday = data.response.holidays.find(
          h => `${h.date.iso}-${h.name}` === unique
        );
        return {
          id: `holiday-${holiday.date.iso}-${holiday.name}`,
          title: holiday.name,
          start: new Date(holiday.date.iso),
          end: new Date(holiday.date.iso),
          allDay: true,
          isHoliday: true,
          color: '#8b5cf6'
        };
      });
      
      return uniqueHolidays;
    }
    return [];
  } catch (error) {
    console.error('Error fetching holidays:', error);
    return [];
  }
};