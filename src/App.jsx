import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import DarkModeToggle from './components/DarkModeToggle';
import AIChatBot from './components/AIChatBot';

function App() {
  const location = useLocation();

  return (
    <>
      <DarkModeToggle />
      <AIChatBot />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-study/:id" element={<CaseStudy />} />
      </Routes>
    </>
  );
}

export default App;
