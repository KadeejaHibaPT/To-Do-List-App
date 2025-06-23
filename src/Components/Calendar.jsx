import React from 'react';
import './Cal.css';
// Optional: if you want separate styling

// Utility to get current month days
const getCurrentMonthDays = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(year, month, i);
    days.push({
      day: i,
      isToday: i === now.getDate(),
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
    });
  }

  return { month: now.toLocaleString('default', { month: 'long' }), days };
};

// Calendar Component
const Calendar = () => {
  const { month, days } = getCurrentMonthDays();

  return (
    <div className="calendar">
      <h4>{month}</h4>
      <div className="calendar-grid">
        {days.map((d, i) => (
          <div
            key={i}
            className={`calendar-day ${d.isToday ? 'today' : ''}`}
          >
            <p>{d.weekday}</p>
            <span>{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
