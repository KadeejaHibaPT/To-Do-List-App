import React from "react";
import './WelcomeScreen.css';
import { useNavigate } from 'react-router-dom';

function WelcomeScreen() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/home');
  };

  return (
    <div className="welcome-container">
      <h1>Task Management & To-Do List</h1>
      <p>
        This productive tool is designed to help you better manage your task project-wise conveniently!
      </p>
      <button className="start-button" onClick={handleStart}>
        Let&apos;s Start →
      </button>
    </div>
  );
}

export default WelcomeScreen;