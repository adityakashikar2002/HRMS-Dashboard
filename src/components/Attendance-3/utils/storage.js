export const loadData = (key) => {
  try {
    const serializedData = localStorage.getItem(key);
    return serializedData ? JSON.parse(serializedData) : null;
  } catch (error) {
    console.error("Error loading data from localStorage:", error);
    return null;
  }
};

export const saveData = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error("Error saving data to localStorage:", error);
  }
};

export const clearData = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error clearing data from localStorage:", error);
  }
};