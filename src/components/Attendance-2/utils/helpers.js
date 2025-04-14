export const formatTime = (minutes) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs}h ${mins}m`;
};

export const parseTimeString = (timeStr) => {
  const match = timeStr.match(/(\d+)h (\d+)m/);
  return match ? parseInt(match[1]) * 60 + parseInt(match[2]) : 0;
};

export const generateRandomData = (baseData) => {
  return {
    ...baseData,
    stats: {
      ...baseData.stats,
      workStatus: {
        atWork: formatTime(Math.floor(Math.random() * 400) + 200), // 3h-10h
        idle: formatTime(Math.floor(Math.random() * 120) + 30), // 0.5h-2.5h
        offline: formatTime(Math.floor(Math.random() * 60)) // 0-1h
      },
      punctuality: {
        onTime: Math.floor(Math.random() * 30) + 70, // 70-100%
        late: Math.floor(Math.random() * 30) // 0-30%
      }
    },
    statusCounts: Object.fromEntries(
      Object.entries(baseData.statusCounts).map(([key]) => [
        key,
        Math.floor(Math.random() * 2000)
      ])
    )
  };
};