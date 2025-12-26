import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTheme } from '../../styles/theme';
import { useLanguage } from '../../styles/LanguageContext';
import emailjs from '@emailjs/browser';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaPaperPlane 
} from 'react-icons/fa';
import './ContactPage.css';

const ContactPage = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const { theme } = useTheme();
  const { language } = useLanguage();

  const translations = {
    title: {
      en: "Let's Work Together",
      fr: "Travaillons Ensemble"
    },
    subtitle: {
      en: "Ready to bring your ideas to life? Get in touch and let's create something amazing.",
      fr: "Prêt à donner vie à vos idées ? Contactez-moi et créons quelque chose d'extraordinaire."
    },
    contactTitle: {
      en: "Get In Touch",
      fr: "Me Contacter"
    },
    formTitle: {
      en: "Send a Message",
      fr: "Envoyer un Message"
    },
    methods: {
      email: {
        en: "Email",
        fr: "Email"
      },
      phone: {
        en: "Phone",
        fr: "Téléphone"
      },
      location: {
        en: "Location",
        fr: "Localisation"
      }
    },
    methodValues: {
      email: "contact@raslen11.dev",
      phone: "+1 (555) 123-4567",
      location: {
        en: "Tunis, Tunisia",
        fr: "Tunis, Tunisie"
      }
    },
    socialTitle: {
      en: "Follow Me",
      fr: "Suivez-moi"
    },
    formLabels: {
      name: {
        en: "Full Name",
        fr: "Nom Complet"
      },
      email: {
        en: "Email Address",
        fr: "Adresse Email"
      },
      message: {
        en: "Your Message",
        fr: "Votre Message"
      }
    },
    placeholders: {
      name: {
        en: "Enter your full name",
        fr: "Entrez votre nom complet"
      },
      email: {
        en: "Enter your email address",
        fr: "Entrez votre adresse email"
      },
      message: {
        en: "Tell me about your project...",
        fr: "Parlez-moi de votre projet..."
      }
    },
    submitButton: {
      sending: {
        en: "Sending...",
        fr: "Envoi en cours..."
      },
      default: {
        en: "Send Message",
        fr: "Envoyer le Message"
      }
    },
    messages: {
      success: {
        en: "Message sent successfully! I'll get back to you soon.",
        fr: "Message envoyé avec succès ! Je vous répondrai bientôt."
      },
      error: {
        en: "Failed to send message. Please try again.",
        fr: "Échec de l'envoi du message. Veuillez réessayer."
      }
    }
  };

  const contactMethods = [
    {
      icon: <FaEnvelope />,
      title: translations.methods.email[language],
      value: translations.methodValues.email,
      link: "mailto:contact@raslen11.dev"
    },
    {
      icon: <FaPhone />,
      title: translations.methods.phone[language],
      value: translations.methodValues.phone,
      link: "tel:+15551234567"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: translations.methods.location[language],
      value: translations.methodValues.location[language],
      link: "#"
    }
  ];

  const socialLinks = [
    { 
      icon: <FaGithub />, 
      name: 'GitHub', 
      url: 'https://github.com/raslen11' 
    },
    { 
      icon: <FaLinkedin />, 
      name: 'LinkedIn', 
      url: 'https://linkedin.com/in/raslen11' 
    },
    { 
      icon: <FaTwitter />, 
      name: 'Twitter', 
      url: 'https://twitter.com/raslen11' 
    },
    { 
      icon: <FaEnvelope />, 
      name: 'Email', 
      url: 'mailto:contact@raslen11.dev' 
    },
  ];

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      form.current,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    )
    .then((result) => {
      setMessage({ 
        text: translations.messages.success[language], 
        type: 'success' 
      });
      form.current.reset();
    }, (error) => {
      setMessage({ 
        text: translations.messages.error[language], 
        type: 'error' 
      });
    })
    .finally(() => {
      setIsSubmitting(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    });
  };

  return (
    <section className={`contact-section ${theme}`} id="contact">
      <div className="contact-container">
        {/* Header */}
        <motion.div 
          className="contact-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="contact-title">
            {translations.title[language]}
          </h1>
          <p className="contact-subtitle">
            {translations.subtitle[language]}
          </p>
        </motion.div>

        {/* Content */}
        <div className="contact-content">
          {/* Contact Information */}
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="contact-title">
              {translations.contactTitle[language]}
            </h2>
            
            <div className="contact-methods">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.link}
                  className="contact-method"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="method-icon">
                    {method.icon}
                  </div>
                  <div className="method-content">
                    <div className="method-title">
                      {method.title}
                    </div>
                    <div className="method-value">
                      {method.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div className="contact-social">
              <h3 className="social-title">
                {translations.socialTitle[language]}
              </h3>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={social.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="contact-form-section"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="form-title">
              {translations.formTitle[language]}
            </h2>
            
            <form ref={form} onSubmit={sendEmail} className="contact-form">
              {message.text && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`message ${message.type}`}
                >
                  {message.text}
                </motion.div>
              )}
              
              <div className="form-group">
                <label className="form-label">
                  {translations.formLabels.name[language]}
                </label>
                <input
                  type="text"
                  name="user_name"
                  required
                  className="form-input"
                  placeholder={translations.placeholders.name[language]}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  {translations.formLabels.email[language]}
                </label>
                <input
                  type="email"
                  name="user_email"
                  required
                  className="form-input"
                  placeholder={translations.placeholders.email[language]}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  {translations.formLabels.message[language]}
                </label>
                <textarea
                  name="message"
                  required
                  className="form-textarea"
                  placeholder={translations.placeholders.message[language]}
                ></textarea>
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="loading-spinner"></div>
                    {translations.submitButton.sending[language]}
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    {translations.submitButton.default[language]}
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;