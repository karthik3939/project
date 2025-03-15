import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Use Routes instead of Switch
import LeaveForm from './LeaveForm';
import LeaveDashboard from './LeaveDashboard';
import Login from './Login';
import Register from './Register';
import './App.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const [leaveBalance, setLeaveBalance] = useState({ casual: 10, medical: 5 });

  const applyLeave = (leave) => {
    const remainingDays = { ...leaveBalance };
    if (remainingDays[leave.type] >= leave.days) {
      remainingDays[leave.type] -= leave.days;
      setLeaves([...leaves, leave]);
      setLeaveBalance(remainingDays);
    } else {
      alert('Insufficient leave balance!');
    }
  };

  return (
    <Router>
      <div>
        <h1>Leave Management System</h1>
        <nav>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </nav>
        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/register" element={<Register onRegister={() => setIsLoggedIn(true)} />} />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <>
                  <LeaveForm applyLeave={applyLeave} />
                  <LeaveDashboard leaves={leaves} leaveBalance={leaveBalance} />
                </>
              ) : (
                <p>Please log in to access the system.</p>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
