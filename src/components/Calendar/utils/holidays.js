// utils/holidays.js
const API_KEY = process.env.REACT_APP_HOLIDAY_API_KEY; // Get from https://calendarific.com/
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