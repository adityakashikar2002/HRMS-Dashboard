import { useState, useEffect, useCallback } from 'react';
import { generateMockData } from '../utils/dataGenerator';
import { loadData, saveData } from '../utils/storage';

export const useAttendanceData = () => {
  const [activeFilter, setActiveFilter] = useState('Day');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: new Date(),
    end: new Date()
  });

  // Load or generate data
  useEffect(() => {
    const savedData = loadData('attendanceData');
    if (savedData) {
      setData(savedData);
    } else {
      const newData = generateMockData();
      setData(newData);
      saveData('attendanceData', newData);
    }
    setLoading(false);
  }, []);

  // Filter data based on selections
  const filteredData = useCallback(() => {
    if (!data) return null;
    
    let filtered = {...data};
    
    // Filter by department
    if (selectedDepartment !== 'All Departments') {
      filtered.attendanceOverview = data.attendanceOverview.filter(
        emp => emp.department === selectedDepartment
      );
      
      // Adjust stats based on filtered employees
      const deptStats = calculateDepartmentStats(filtered.attendanceOverview);
      filtered.stats = {...data.stats, ...deptStats};
    }
    
    // Filter by time period (simplified for demo)
    if (activeFilter === 'Week') {
      // In a real app, would filter to current week
      filtered.stats.averageWorkingHour = "42:30";
    } else if (activeFilter === 'Month') {
      filtered.stats.averageWorkingHour = "180:00";
    }
    
    return filtered;
  }, [data, activeFilter, selectedDepartment]);

  // Calculate department-specific stats
  const calculateDepartmentStats = (employees) => {
    const presentCount = employees.filter(e => e.status === 'Present').length;
    const absentCount = employees.filter(e => e.status === 'Absent').length;
    
    return {
      punctuality: {
        onTime: Math.floor(Math.random() * 20) + 70,
        late: Math.floor(Math.random() * 30)
      },
      statusCounts: {
        present: presentCount,
        absent: absentCount,
        weekOff: Math.floor(employees.length * 0.1),
        paidLeave: Math.floor(employees.length * 0.15),
        holiday: 0,
        halfDay: Math.floor(employees.length * 0.05),
        unpaidLeave: Math.floor(employees.length * 0.05)
      }
    };
  };

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      const newData = generateMockData();
      setData(newData);
      saveData('attendanceData', newData);
      setLoading(false);
    }, 800);
  };

  return {
    data: filteredData(),
    loading,
    activeFilter,
    setActiveFilter,
    selectedDepartment,
    setSelectedDepartment,
    selectedYear,
    setSelectedYear,
    dateRange,
    setDateRange,
    refreshData
  };
};