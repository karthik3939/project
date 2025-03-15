import React, { useState } from 'react';

function LeaveForm({ applyLeave }) {
  const [type, setType] = useState('casual');
  const [days, setDays] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    applyLeave({ type, days });
    setDays(1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Leave Type:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="casual">Casual</option>
          <option value="medical">Medical</option>
        </select>
      </label>
      <label>
        Number of Days:
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(parseInt(e.target.value, 10))}
          min="1"
        />
      </label>
      <button type="submit">Apply Leave</button>
    </form>
  );
}

export default LeaveForm;
