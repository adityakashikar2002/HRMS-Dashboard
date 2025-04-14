import { format} from 'date-fns';
export const formatTime = (minutes) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs}h ${mins}m`;
};

export const parseTimeString = (timeStr) => {
  const match = timeStr.match(/(\d+)h (\d+)m/);
  return match ? parseInt(match[1]) * 60 + parseInt(match[2]) : 0;
};

export const generateRandomData = (baseData, timeRange) => {
  const rangeFactor = timeRange === 'Day' ? 1 : timeRange === 'Week' ? 7 : 30;
  
  return {
    ...baseData,
    stats: {
      ...baseData.stats,
      averageWorkingHour: `${Math.floor(8 * rangeFactor)}:${rangeFactor > 1 ? '00' : '30'}`,
      workStatus: {
        atWork: formatTime(Math.floor(200 + Math.random() * 200 * rangeFactor)),
        idle: formatTime(Math.floor(30 + Math.random() * 90 * rangeFactor)),
        offline: formatTime(Math.floor(Math.random() * 60 * rangeFactor))
      },
      punctuality: {
        onTime: Math.floor(70 + Math.random() * 20),
        late: Math.floor(Math.random() * 30)
      }
    },
    statusCounts: Object.fromEntries(
      Object.entries(baseData.statusCounts).map(([key]) => [
        key,
        Math.floor(Math.random() * 100 * rangeFactor)
      ])
    )
  };
};

export const getCurrentMonthYear = () => {
  const today = new Date();
  return format(today, 'MMMM yyyy');
};