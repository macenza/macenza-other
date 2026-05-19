import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import About from './pages/About';
import Solutions from './pages/Solutions';
import Technology from './pages/Technology';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Terms from './pages/Terms';
import Admin from './pages/Admin';

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="relative">
      <SmoothScroll />
      {!isAdmin && <Navbar />}
      {!isAdmin && <ChatWidget />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Policy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
