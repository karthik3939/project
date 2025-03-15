import React from 'react';

function LeaveDashboard({ leaves, leaveBalance }) {
  return (
    <div>
      <h2>Leave Dashboard</h2>
      <ul>
        {leaves.map((leave, index) => (
          <li key={index}>
            {leave.type.toUpperCase()} Leave - {leave.days} Day(s)
          </li>
        ))}
      </ul>
      <h2>Remaining Balance</h2>
      <p>Casual: {leaveBalance.casual}</p>
      <p>Medical: {leaveBalance.medical}</p>
    </div>
  );
}

export default LeaveDashboard;
