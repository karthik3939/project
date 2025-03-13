import React, { useState, useEffect } from "react";
import axios from "axios";

const userId = 1; // Example user ID

const LeaveManagement = () => {
  const [leaveType, setLeaveType] = useState("casual");
  const [leaveDays, setLeaveDays] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [availableLeaves, setAvailableLeaves] = useState({ casual: 0, medical: 0 });
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/leaves/${userId}`)
      .then(res => setAvailableLeaves({
        casual: res.data.casual_leave,
        medical: res.data.medical_leave
      }))
      .catch(err => console.error(err));
  }, []);

  const applyLeave = () => {
    axios.post("http://localhost:5000/apply-leave", { userId, leaveType, leaveDays, startDate, endDate })

      .then(res => {
        setMessage(res.data.message);
        setAvailableLeaves(prev => ({
          ...prev,
          [leaveType]: prev[leaveType] - leaveDays,
        }));
      })
      .catch(err => setMessage(err.response?.data?.message || "Error applying leave"));
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Leave Management</h2>
      <p>Available Casual Leaves: {availableLeaves.casual}</p>
      <p>Available Medical Leaves: {availableLeaves.medical}</p>
      <select onChange={(e) => setLeaveType(e.target.value)} value={leaveType}>
        <option value="casual">Casual Leave</option>
        <option value="medical">Medical Leave</option>
      </select>
      <input type="number" value={leaveDays} onChange={(e) => setLeaveDays(Number(e.target.value))} placeholder="Number of days" />
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

      <button onClick={applyLeave}>Apply Leave</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LeaveManagement;
