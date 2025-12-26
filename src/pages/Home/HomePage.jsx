import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { useTheme } from '../../styles/theme';
import { useLanguage } from '../../styles/LanguageContext';
import profileImage from '../../assets/profile.jpg';
import { FaArrowRight, FaEnvelope } from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [titleComplete, setTitleComplete] = useState(false);
  const { theme } = useTheme();
  const { language } = useLanguage();

  // Use useMemo to prevent unnecessary recalculations and fix ESLint warnings
  const translations = useMemo(() => ({
    titles: {
      en: "Hi, I'm RASLEN11",
      fr: "Bonjour, je suis RASLEN11"
    },
    subtitles: {
      en: [
        "Full Stack Developer",
        "Front-End Specialist",
        "Back-End Engineer",
        "Desktop App Developer",
        "Tech Enthusiast",
        "Gamer"
      ],
      fr: [
        "Développeur Full Stack",
        "Spécialiste Front-End",
        "Ingénieur Back-End",
        "Développeur d'Applications Desktop",
        "Passionné de Technologie",
        "Joueur"
      ]
    },
    description: {
      en: "I build exceptional digital experiences with modern technologies, focusing on performance, accessibility, and clean code.",
      fr: "Je crée des expériences numériques exceptionnelles avec des technologies modernes, en me concentrant sur les performances, l'accessibilité et un code propre."
    },
    bio: {
      en: "Passionate about web development with 5+ years of experience creating innovative and high-performance applications. Constantly learning and staying updated with the latest technologies.",
      fr: "Passionné par le développement web avec plus de 5 ans d'expérience dans la création d'applications innovantes et performantes. Toujours en apprentissage des dernières technologies."
    },
    buttons: {
      viewWork: {
        en: "View My Work",
        fr: "Voir mes projets"
      },
      contactMe: {
        en: "Contact Me",
        fr: "Me contacter"
      }
    }
  }), []); // Empty dependency array since translations don't change

  // Typing animation for main title
  useEffect(() => {
    const fullTitle = translations.titles[language];
    let i = 0;
    setCurrentTitle('');
    setTitleComplete(false);

    const typingInterval = setInterval(() => {
      if (i < fullTitle.length) {
        setCurrentTitle(fullTitle.substring(0, i + 1));
        i++;
      } else {
        setTitleComplete(true);
        clearInterval(typingInterval);
      }
    }, 100);

    return () => {
      clearInterval(typingInterval);
    };
  }, [language, translations.titles]); // Added translations.titles to dependencies

  // Rotating subtitles animation - Only starts after title is complete
  useEffect(() => {
    if (!titleComplete) return;

    const interval = setInterval(() => {
      setSubtitleIndex(prev => (prev + 1) % translations.subtitles[language].length);
    }, 3000);

    return () => clearInterval(interval);
  }, [titleComplete, language, translations.subtitles]); // Added translations.subtitles to dependencies

  // Typing effect for current subtitle
  useEffect(() => {
    if (!titleComplete) return;

    setCurrentSubtitle('');
    let i = 0;
    const currentSub = translations.subtitles[language][subtitleIndex];

    const typingInterval = setInterval(() => {
      if (i < currentSub.length) {
        setCurrentSubtitle(currentSub.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => {
      clearInterval(typingInterval);
    };
  }, [subtitleIndex, language, titleComplete, translations.subtitles]); // Added translations.subtitles to dependencies

  const renderTitle = () => {
    const name = "RASLEN11";
    const titleText = currentTitle;
    const nameIndex = titleText.indexOf(name);
    
    if (nameIndex === -1) return <>{titleText}</>;

    return (
      <>
        {titleText.substring(0, nameIndex)}
        <span className="home-name-gradient">{name}</span>
        {titleText.substring(nameIndex + name.length)}
      </>
    );
  };

  return (
    <section className={`home-section theme-${theme}`}>
      <div className="home-container">
        <div className="home-content-wrapper">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="home-text-content"
          >
            {/* Main Title with typing effect */}
            <motion.h1 
              className="home-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {renderTitle()}
            </motion.h1>

            {/* Subtitle with rotating text */}
            <motion.h2 
              className="home-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="subtitle-text">{currentSubtitle}</span>
              <span className="cursor">|</span>
            </motion.h2>
            
            {/* Description */}
            <motion.p 
              className="home-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {translations.description[language]}
            </motion.p>

            {/* Bio */}
            <motion.p 
              className="home-bio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {translations.bio[language]}
            </motion.p>
            
            {/* Action Buttons */}
            <div className="home-buttons-container">
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Link 
                  to="/projects" 
                  className="home-primary-button"
                  aria-label={translations.buttons.viewWork[language]}
                >
                  {translations.buttons.viewWork[language]}
                  <FaArrowRight className="button-icon" />
                </Link>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Link 
                  to="/contact" 
                  className="home-secondary-button"
                  aria-label={translations.buttons.contactMe[language]}
                >
                  {translations.buttons.contactMe[language]}
                  <FaEnvelope className="button-icon" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className="home-image-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="home-image-wrapper">
              <motion.div 
                className="home-image-glow"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.15, 0.25, 0.15]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="home-image-circle"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img 
                  src={profileImage} 
                  alt="Portrait of RASLEN11 - Full Stack Developer" 
                  className="home-image"
                  loading="eager"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;