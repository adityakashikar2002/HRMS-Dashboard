// src/utils/taskStorage.js
import { initialMockTasks, generateMockTasks } from './mockTasks';

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

export const loadTasks = () => {
  try {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    // Return initial mock data if no saved tasks exist
    return initialMockTasks;
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return initialMockTasks;
  }
};

// Function to add more mock tasks
export const addMoreMockTasks = (count = 5) => {
  const currentTasks = loadTasks();
  const newTasks = {
    todo: [...currentTasks.todo, ...generateMockTasks(count).map(t => ({ ...t, status: 'todo' }))],
    inProgress: [...currentTasks.inProgress],
    completed: [...currentTasks.completed]
  };
  saveTasks(newTasks);
  return newTasks;
};