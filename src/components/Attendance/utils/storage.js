export const loadData = (key) => {
  try {
    const serializedData = localStorage.getItem(key);
    if (!serializedData) return null;
    
    const data = JSON.parse(serializedData);
    // Add timestamp check for data freshness (e.g., refresh daily)
    const storedTime = new Date(data.timestamp);
    const currentTime = new Date();
    
    if ((currentTime - storedTime) > (24 * 60 * 60 * 1000)) {
      localStorage.removeItem(key);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Error loading data:", error);
    return null;
  }
};

export const saveData = (key, data) => {
  try {
    const dataToStore = {
      ...data,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(key, JSON.stringify(dataToStore));
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

export const clearData = (key) => {
  localStorage.removeItem(key);
};

export const exportToCSV = (data, fileName) => {
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','),
    ...data.map(row => 
      headers.map(fieldName => 
        `"${String(row[fieldName]).replace(/"/g, '""')}"`
      ).join(',')
    )
  ];
  
  const csvData = csvRows.join('\n');
  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};