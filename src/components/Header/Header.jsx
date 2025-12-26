import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../../styles/LanguageContext';
import logo from './Logo_R.png';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { language } = useLanguage();  // Only for navigation text

  // Check screen size and update isMobile state
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      // Close mobile menu when resizing to desktop
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isMobile]);

  const navLinks = [
    { name: language === 'en' ? 'Home' : 'Accueil', path: '/' },
    { name: language === 'en' ? 'About' : 'À propos', path: '/about' },
    { name: language === 'en' ? 'Projects' : 'Projets', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: language === 'en' ? 'Contact' : 'Contact', path: '/contact' },
  ];

  const handleMobileMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="header"
    >
      <div className="header-container">
        <div className="header-content">
          {/* Logo/Brand - Far Left */}
          <div className="header-left">
            <Link to="/" className="header-logo-link" aria-label="Home">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="header-logo"
              >
                <img 
                  src={logo} 
                  alt="Developer Logo"
                  className="header-logo-icon"
                />
                <span className="logo-text">RASLEN11</span>
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <nav className="header-desktop-links" aria-label="Main navigation">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={link.path}
                  className={`header-link ${
                    location.pathname === link.path
                      ? 'header-link-active'
                      : 'header-link-inactive'
                  }`}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="header-mobile-button">
            <motion.button
              onClick={handleMobileMenuToggle}
              className="header-toggle"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? 'close' : 'open'}
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? (
                    <FaTimes className="header-toggle-icon" />
                  ) : (
                    <FaBars className="header-toggle-icon" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="header-mobile-menu"
          >
            <nav className="header-mobile-links" aria-label="Mobile navigation">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`header-mobile-link ${
                      location.pathname === link.path
                        ? 'header-mobile-link-active'
                        : 'header-mobile-link-inactive'
                    }`}
                    aria-current={location.pathname === link.path ? 'page' : undefined}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;