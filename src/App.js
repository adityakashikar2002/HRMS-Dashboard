// import React from 'react';
// import './App.css';
// import Sidebar from './components/Sidebar/Sidebar';
// import Header from './components/Header/Header';
// import Dashboard from './components/Dashboard/Dashboard';

// function App() {
//   return (
//     <div className="app bg-gray--100">
//       <div className="flex h-screen">
//         <Sidebar />
//         <div className="flex-1 overflow-auto">
//           <Header />
//           <Dashboard />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
// import Sidebar from './components/Sidebar/Sidebar';
// import Header from './components/Header/Header';
// import Dashboard from './components/Dashboard/Dashboard';
// import TasksPage from './components/Dashboard/TasksPage';
// import Inbox_Main from './components/Inbox/Inbox_Main';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function App() {
//   return (
//     <Router>
//       <div className="app bg-gray--100">
//         <div className="flex h-screen">
//           <Sidebar />
//           <div className="flex-1 overflow-auto">
//             <Header />
//             <Routes>
//               <Route path="/" element={<Dashboard />} />
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/tasks" element={<TasksPage />} />
//               <Route path="/inbox" element={<Inbox_Main />} />
//             </Routes>
//           </div>
//         </div>
//         <ToastContainer 
//           position="top-right"
//           autoClose={3000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//         />
//       </div>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
// import TasksPage from './components/Tasks/pages/TasksPage';
// import Inbox_Main from './components/Inbox/Inbox_Main';
// import CalenderMain from './components/Calendar/CalendarMain';
// import Projects from './components/Projects/Projects';
// import EmployeePage from './components/Employee/pages/EmployeePage';
// import Attendance from './components/Attendance-3/Attendance';
import Hiring from './components/Hiring-2/Hiring'
// import Payroll from './components/Payroll/pages/Payroll';
import PayrollDashboard from './components/Payroll-2/pages/PayrollDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="app bg-gray--100">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/tasks" element={<TasksPage />} />
            <Route path="/inbox/*" element={<Inbox_Main />} />
            <Route path="/calendar/*" element={<CalenderMain/>} />
            <Route path="/projects/*" element={<Projects/>} />
            <Route path="/employees/*" element={<EmployeePage/>} />
            <Route path="/attendance/*" element={<Attendance/>} /> */}
            <Route path="/hiring/*" element={<Hiring />} />
            {/* <Route path="/payroll/*" element={<Payroll/>}/> */}
            <Route path="/payroll/*" element={<PayrollDashboard/>}/>
          </Routes>
        </div>
      </div>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;