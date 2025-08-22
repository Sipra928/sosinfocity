import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import './styles.scss';

const Navbar = () => {
  const location = useLocation();
  const navRef = useRef(null);
  const pillRef = useRef(null);
  const linksRef = useRef([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const addToRefs = (el) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };

  useEffect(() => {
    const updatePillPosition = (element, instant = false) => {
      if (!element || !pillRef.current) return;
      
      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = element.getBoundingClientRect();
      
      const targetProps = {
        width: linkRect.width,
        height: linkRect.height,
        left: linkRect.left - navRect.left,
        top: linkRect.top - navRect.top,
        opacity: 1
      };

      if (instant || !isInitialized) {
        // Set position instantly for initial load
        gsap.set(pillRef.current, targetProps);
        setIsInitialized(true);
      } else {
        // Animate smoothly for transitions
        gsap.to(pillRef.current, {
          ...targetProps,
          duration: 0.5,
          ease: "power2.out",
          overwrite: true
        });
      }
    };

    // Initialize pill position
    const activeLink = linksRef.current.find(link => 
      link.getAttribute('href') === location.pathname
    );
    
    if (activeLink) {
      updatePillPosition(activeLink, true);
    }

    // Event listeners
    const handleHover = (e) => {
      if (e.target.getAttribute('href') !== location.pathname) {
        updatePillPosition(e.target);
      }
    };
    

    const handleLeave = () => {
      const activeLink = linksRef.current.find(link => 
        link.getAttribute('href') === location.pathname
      );
      if (activeLink) updatePillPosition(activeLink);
    };

    linksRef.current.forEach(link => {
      link.addEventListener('mouseenter', handleHover);
      link.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      linksRef.current.forEach(link => {
        link.removeEventListener('mouseenter', handleHover);
        link.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, [location.pathname, isInitialized]);

  const handleClick = (e) => {
    const linkRect = e.target.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    
    gsap.to(pillRef.current, {
      width: linkRect.width,
      height: linkRect.height,
      left: linkRect.left - navRect.left,
      top: linkRect.top - navRect.top,
      duration: 0.4,
      ease: "back.out(1.4)"
    });
  };

  return (
    <nav className="pill-navbar" ref={navRef}>
      <div className="nav-brand">SOS</div>
      <ul className="nav-links">
        <li>
          <Link 
            to="/" 
            ref={addToRefs}
            className={location.pathname === '/' ? 'active' : ''}
            onClick={handleClick}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/about" 
            ref={addToRefs}
            className={location.pathname === '/about' ? 'active' : ''}
            onClick={handleClick}
          >
            About Us
          </Link>
        </li>
        <li>
          <Link 
            to="/service" 
            ref={addToRefs}
            className={location.pathname === '/service' ? 'active' : ''}
            onClick={handleClick}
          >
            Services
          </Link>
        </li>
        <li>
          <Link 
            to="/client" 
            ref={addToRefs}
            className={location.pathname === '/client' ? 'active' : ''}
            onClick={handleClick}
          >
            Clients
          </Link>
        </li>
        <li>
          <Link 
            to="/contact" 
            ref={addToRefs}
            className={location.pathname === '/contact' ? 'active' : ''}
            onClick={handleClick}
          >
            Contact Us
          </Link>
        </li>
      </ul>
      <div className="nav-pill" ref={pillRef}></div>
    </nav>
  );
};

export default Navbar;