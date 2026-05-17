import { useEffect } from 'react';
import Lenis from 'lenis';

const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const navs = document.querySelectorAll('nav.fixed');
      
      // Enable CSS transition only after initial scroll to avoid entry animation conflicts
      if (currentScrollY > 50) {
        navs.forEach(nav => nav.classList.add('nav-transition'));
      } else {
        navs.forEach(nav => nav.classList.remove('nav-transition'));
      }
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navs.forEach(nav => nav.classList.add('nav-hidden'));
      } else if (currentScrollY < lastScrollY) {
        navs.forEach(nav => nav.classList.remove('nav-hidden'));
      }
      
      // Always show at the very top
      if (currentScrollY <= 10) {
        navs.forEach(nav => nav.classList.remove('nav-hidden'));
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
};

export default SmoothScroll;
