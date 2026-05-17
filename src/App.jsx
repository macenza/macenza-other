import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import Home from './pages/Home';
import About from './pages/About';
import Solutions from './pages/Solutions';
import Technology from './pages/Technology';
import Careers from './pages/Careers';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="relative">
      <SmoothScroll />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
