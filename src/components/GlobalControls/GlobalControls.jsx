import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  faMoon, 
  faSun, 
  faLanguage, 
  faArrowUp 
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from '../../styles/theme';
import { useLanguage } from '../../styles/LanguageContext';
import './GlobalControls.css';

const GlobalControls = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showLabels, setShowLabels] = useState({ theme: false, language: false });
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    // Show/hide based on scroll
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      // Show back to top button when scrolled down 300px
      setShowBackToTop(currentScrollPos > 300);
      
      // Hide top controls when scrolling down (except back to top button)
      if (currentScrollPos > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const showThemeLabel = () => setShowLabels(prev => ({ ...prev, theme: true }));
  const hideThemeLabel = () => setShowLabels(prev => ({ ...prev, theme: false }));
  const showLanguageLabel = () => setShowLabels(prev => ({ ...prev, language: true }));
  const hideLanguageLabel = () => setShowLabels(prev => ({ ...prev, language: false }));

  const handleTouchStart = (type) => {
    if (type === 'theme') showThemeLabel();
    if (type === 'language') showLanguageLabel();
    setTimeout(() => {
      if (type === 'theme') hideThemeLabel();
      if (type === 'language') hideLanguageLabel();
    }, 2000);
  };

  return (
    <>
      {/* Top Right Controls - Desktop only */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isVisible && !isMobile ? 1 : 0,
          y: isVisible && !isMobile ? 0 : -20 
        }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="global-controls top-controls"
        style={{ 
          pointerEvents: isVisible && !isMobile ? 'auto' : 'none',
          display: isMobile ? 'none' : 'flex'
        }}
      >
        <motion.button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          className="control-button theme-control"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={showThemeLabel}
          onMouseLeave={hideThemeLabel}
          onTouchStart={() => handleTouchStart('theme')}
        >
          <FontAwesomeIcon 
            icon={theme === 'light' ? faMoon : faSun} 
            className="control-icon"
          />
          <AnimatePresence>
            {showLabels.theme && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="control-label"
              >
                {theme === 'light' ? 'Dark' : 'Light'}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <motion.button
          onClick={toggleLanguage}
          aria-label={`Switch to ${language === 'en' ? 'French' : 'English'}`}
          className="control-button language-control"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={showLanguageLabel}
          onMouseLeave={hideLanguageLabel}
          onTouchStart={() => handleTouchStart('language')}
        >
          <FontAwesomeIcon 
            icon={faLanguage} 
            className="control-icon"
          />
          <AnimatePresence>
            {showLabels.language && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="control-label"
              >
                {language === 'en' ? 'FR' : 'EN'}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Back to Top Button - Appears when scrolling down */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="back-to-top-control"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon 
              icon={faArrowUp} 
              className="control-icon"
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bottom Center Controls (Mobile only) */}
      <AnimatePresence>
        {isMobile && isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="global-controls bottom-controls"
          >
            <motion.button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="control-button mobile-control"
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon 
                icon={theme === 'light' ? faMoon : faSun} 
                className="control-icon"
              />
              <span className="mobile-label">{theme === 'light' ? 'Dark' : 'Light'}</span>
            </motion.button>

            <motion.button
              onClick={toggleLanguage}
              aria-label={`Switch to ${language === 'en' ? 'French' : 'English'}`}
              className="control-button mobile-control"
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon 
                icon={faLanguage} 
                className="control-icon"
              />
              <span className="mobile-label">{language === 'en' ? 'FR' : 'EN'}</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalControls;