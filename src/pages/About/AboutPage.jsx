// src/components/AboutPage.jsx
import { motion } from 'framer-motion';
import { useTheme } from '../../styles/theme';
import { useLanguage } from '../../styles/LanguageContext';
import profileImage from '../../assets/profile.jpg';
import './AboutPage.css';

const AboutPage = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();

  const skills = [
    'React', 'JavaScript', 'TypeScript', 'Node.js', 
    'Express', 'MongoDB', 'HTML/CSS', 'Tailwind CSS',
    'UI/UX Design', 'Responsive Design', 'REST APIs', 'GraphQL',
    'Git', 'Docker', 'AWS', 'Firebase'
  ];

  const translations = {
    aboutMe: {
      en: "About Me",
      fr: "À propos"
    },
    description1: {
      en: "I'm RASLEN11, a passionate Full Stack Developer with 5+ years of experience building modern web applications. I specialize in the MERN stack and have a strong focus on creating efficient, scalable solutions with intuitive user interfaces.",
      fr: "Je suis RASLEN11, un développeur Full Stack passionné avec plus de 5 ans d'expérience dans la création d'applications web modernes. Je me spécialise dans la stack MERN et me concentre sur la création de solutions efficaces et évolutives avec des interfaces utilisateur intuitives."
    },
    description2: {
      en: "My journey began with Computer Science studies, evolving through various roles where I've delivered high-quality solutions for startups and enterprises alike. I'm committed to continuous learning and staying at the forefront of web technologies.",
      fr: "Mon parcours a commencé par des études en informatique, évoluant à travers divers rôles où j'ai fourni des solutions de haute qualité pour des startups et des entreprises. Je m'engage à apprendre continuellement et à rester à la pointe des technologies web."
    },
    skillsTitle: {
      en: "Skills & Technologies",
      fr: "Compétences & Technologies"
    },
    experienceTitle: {
      en: "Professional Experience",
      fr: "Expérience Professionnelle"
    }
  };

  const experiences = [
    {
      title: {
        en: "Senior Full Stack Developer",
        fr: "Développeur Full Stack Senior"
      },
      company: "Tech Solutions Inc.",
      period: {
        en: "2020 - Present",
        fr: "2020 - Présent"
      },
      description: {
        en: "Leading development of enterprise web applications using React and Node.js. Implemented CI/CD pipelines and optimized application performance by 40%.",
        fr: "Direction du développement d'applications web d'entreprise utilisant React et Node.js. Mise en œuvre de pipelines CI/CD et optimisation des performances des applications de 40%."
      }
    },
    {
      title: {
        en: "Frontend Developer",
        fr: "Développeur Frontend"
      },
      company: "Digital Creations",
      period: {
        en: "2018 - 2020",
        fr: "2018 - 2020"
      },
      description: {
        en: "Built responsive user interfaces and implemented design systems. Collaborated with UX designers to create accessible and performant components.",
        fr: "Développement d'interfaces utilisateur réactives et mise en œuvre de systèmes de conception. Collaboration avec les designers UX pour créer des composants accessibles et performants."
      }
    }
  ];

  return (
    <section className={`about-section ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`} id="about">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="about"
      >
        <div className="about-header">
          <motion.div 
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "0px" }}
            whileHover={{ scale: 1.05 }}
            className="profile-image-wrapper"
          >
            <div className="profile-image-inner">
              <div className="profile-image-placeholder">
                <img 
                  src={profileImage} 
                  alt="RASLEN11" 
                  className="profile-image"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "0px" }}
            className="about-title"
          >
            {translations.aboutMe[language]}
          </motion.h2>
        </div>
        
        <div className="about-content">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, margin: "0px" }}
            className="about-text"
          >
            {translations.description1[language]}
          </motion.p>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, margin: "0px" }}
            className="about-text"
          >
            {translations.description2[language]}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true, margin: "0px" }}
            className="skills-section"
          >
            <h3 className="skills-title">{translations.skillsTitle[language]}</h3>
            <div className="skills-list">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true, margin: "-20px" }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="skill-item"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true, margin: "0px" }}
            className="experience-section"
          >
            <h3 className="skills-title">{translations.experienceTitle[language]}</h3>
            <div className="experience-list">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  viewport={{ once: true, margin: "0px" }}
                  className="experience-item"
                >
                  <h4 className="experience-title">{exp.title[language]}</h4>
                  <div className="experience-meta">
                    <span className="experience-company">{exp.company}</span>
                    <span className="experience-period">{exp.period[language]}</span>
                  </div>
                  <p className="experience-description">{exp.description[language]}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutPage;