export const useCsvExport = () => {
    const exportToCsv = (data, filter) => {
      let csvContent = "data:text/csv;charset=utf-8,";
      
      // Create headers based on data type
      let headers = [];
      let rows = [];
      
      if (filter === 'attendance') {
        headers = ["ID", "Name", "Department", "Status", "Check In", "Check Out", "Work Hours"];
        rows = data.attendanceOverview.map(emp => [
          emp.id, emp.name, emp.department, emp.status, 
          emp.checkIn, emp.checkOut, emp.workHours
        ]);
      } else if (filter === 'leaves') {
        headers = ["Date", "Name", "Department", "Type", "Status"];
        rows = data.leaveRequests.map(leave => [
          leave.date, leave.name, leave.department, leave.type, leave.status
        ]);
      }
      
      // Combine headers and rows
      csvContent += headers.join(",") + "\n";
      csvContent += rows.map(row => row.join(",")).join("\n");
      
      // Trigger download
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${filter}_data_${new Date().toISOString()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    
    return { exportToCsv };
  };