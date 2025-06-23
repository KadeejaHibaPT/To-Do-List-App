import React from 'react';

import './App.css';
import Start from './Components/Start.jsx';
import Home from '../src/Components/Home.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;