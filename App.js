// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [userId, setUserId] = useState(1); // Assume user ID is 1 for demo
    const [leaveDays, setLeaveDays] = useState({});
    const [leaveType, setLeaveType] = useState('casual');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchLeaveDays = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${userId}/leave-days`);
                setLeaveDays(response.data);
            } catch (error) {
                console.error('Error fetching leave days:', error);
            }
        };
        fetchLeaveDays();
    }, [userId]);

    const applyLeave = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/leave-requests', {
                user_id: userId,
                leave_type: leaveType,
                start_date: startDate,
                end_date: endDate
            });
            console.log('Leave request submitted:', response.data);
            alert('Leave request submitted successfully!');
        } catch (error) {
            console.error('Error applying for leave:', error);
            alert('Failed to submit leave request.');
        }
    };

    return (
        <div>
            <h1>Leave Management System</h1>
            <div>
                <p>Available Leave Days:</p>
                <pre>{JSON.stringify(leaveDays, null, 2)}</pre>
            </div>
            <div>
                <label>Leave Type:</label>
                <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                    <option value="casual">Casual</option>
                    <option value="sick">Sick</option>
                    <option value="earned">Earned</option>
                </select>
            </div>
            <div>
                <label>Start Date:</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div>
                <label>End Date:</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <button onClick={applyLeave}>Apply for Leave</button>
        </div>
    );
};

export default App;
