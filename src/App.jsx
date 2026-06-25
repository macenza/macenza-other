import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Home from './pages/Home';

// Lazy load all pages
const ChatWidget = lazy(() => import('./components/ChatWidget'));
const About = lazy(() => import('./pages/About'));
const Solutions = lazy(() => import('./pages/Solutions'));
const Technology = lazy(() => import('./pages/Technology'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const Policy = lazy(() => import('./pages/Policy'));
const Terms = lazy(() => import('./pages/Terms'));
const Admin = lazy(() => import('./pages/Admin'));
const CertificateVerification = lazy(() => import('./pages/CertificateVerification'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    //  pre-fetching
    const preloadPages = () => {
      import('./pages/About').catch(() => { });
      import('./pages/Solutions').catch(() => { });
      import('./pages/Technology').catch(() => { });
      import('./pages/Careers').catch(() => { });
      import('./pages/Contact').catch(() => { });
    };

    if (window.requestIdleCallback) {
      window.requestIdleCallback(preloadPages);
    } else {
      setTimeout(preloadPages, 2000);
    }
  }, []);

  return (
    <div className="relative">
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar theme="colored" />
      {!isAdmin && <SmoothScroll />}
      {!isAdmin && <Navbar />}
      {!isAdmin && (
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
        <Route path="/solutions" element={<Suspense fallback={<PageLoader />}><Solutions /></Suspense>} />
        <Route path="/technology" element={<Suspense fallback={<PageLoader />}><Technology /></Suspense>} />
        <Route path="/careers" element={<Suspense fallback={<PageLoader />}><Careers /></Suspense>} />
        <Route path="/contact" element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>} />
        <Route path="/privacy" element={<Suspense fallback={<PageLoader />}><Policy /></Suspense>} />
        <Route path="/terms" element={<Suspense fallback={<PageLoader />}><Terms /></Suspense>} />
        <Route path="/admin" element={<Suspense fallback={<PageLoader />}><Admin /></Suspense>} />
        <Route path="/certificateverification" element={<Suspense fallback={<PageLoader />}><CertificateVerification /></Suspense>} />
      </Routes>
    </div>
  );
}

export default App;
