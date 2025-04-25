import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import TasksPage from './components/Tasks/pages/TasksPage';
import Inbox_Main from './components/Inbox/Inbox_Main';
import CalenderMain from './components/Calendar/CalendarMain';
import Projects from './components/Projects/Projects';
import EmployeePage from './components/Employee/pages/EmployeePage';
import Attendance from './components/Attendance-3/Attendance';
import Hiring from './components/Hiring-2/Hiring';
import PayrollDashboard from './components/Payroll-2/pages/PayrollDashboard';
// import ManageAccess from './components/ManageAccess/ManageAccess';
import AccessManagement from './components/ManageAccess/AccessManagement';
import Login from './auth/Login';
import Register from './auth/Register';
import { AuthProvider, useAuth } from './auth/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <div className="app bg-gray--100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          } />
        </Routes>
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
    </AuthProvider>
  );
}

const MainLayout = () => {
  const { user } = useAuth();
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={
            <ProtectedRoute requiredAccess="tasks">
              <TasksPage />
            </ProtectedRoute>
          } />
          <Route path="/inbox/*" element={
            <ProtectedRoute requiredAccess="inbox">
              <Inbox_Main />
            </ProtectedRoute>
          } />
          <Route path="/calendar/*" element={
            <ProtectedRoute requiredAccess="calendar">
              <CalenderMain />
            </ProtectedRoute>
          } />
          <Route path="/projects/*" element={
            <ProtectedRoute requiredAccess="projects">
              <Projects />
            </ProtectedRoute>
          } />
          <Route path="/employees/*" element={
            <ProtectedRoute requiredAccess="employees">
              <EmployeePage />
            </ProtectedRoute>
          } />
          <Route path="/attendance/*" element={
            <ProtectedRoute requiredAccess="attendance">
              <Attendance />
            </ProtectedRoute>
          } />
          <Route path="/hiring/*" element={
            <ProtectedRoute requiredAccess="hiring">
              <Hiring />
            </ProtectedRoute>
          } />
          <Route path="/payroll/*" element={
            <ProtectedRoute requiredAccess="payroll">
              <PayrollDashboard />
            </ProtectedRoute>
          } />
          {/* <Route path="/access" element={
            <ProtectedRoute requiredAccess="access">
              <ManageAccess />
            </ProtectedRoute>
          } /> */}
          <Route path="/access" element={
            <ProtectedRoute requiredAccess="access">
              {user?.role === 'admin' ? (
                <AccessManagement />
              ) : (
                <Navigate to="/" replace />
              )}
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </div>
  );
};

export default App;