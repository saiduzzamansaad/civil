import { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { 
  Facebook, Linkedin, Mail, Github, Hammer, Ruler, Box, Zap, 
  Home, ClipboardCheck, HardHat, ChevronRight, Sparkles, Globe, 
  Phone, MapPin, Code, Layers, Database, Cpu
} from 'lucide-react';

const Footer = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [gradientAngle, setGradientAngle] = useState(135);
  const [currentYear] = useState(new Date().getFullYear());
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const controls = useAnimation();
  const [showLink, setShowLink] = useState(false);

  // Dynamic gradient angle based on mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setGradientAngle(Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI) + 135);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    await controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.3 }
    });
    
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
    setEmail('');
  };

  const tools = [
    { name: 'BBS Calculator', icon: <Ruler size={20} />, path: '/bbs-calculator' },
    { name: 'Brick Calculator', icon: <Box size={20} />, path: '/brick-calculator' },
    { name: 'Unit Converter', icon: <ClipboardCheck size={20} />, path: '/unit-converter' },
    { name: 'Load Calculator', icon: <Zap size={20} />, path: '/load-calculator' },
    { name: 'Material Estimator', icon: <Layers size={20} />, path: '/material-estimator' },
    { name: 'Structural Analysis', icon: <Database size={20} />, path: '/structural-analysis' },
  ];

  const socials = [
    { 
      name: 'Email', 
      icon: <Mail size={20} />, 
      path: 'saiduzzaman113@gmail.com', 
      color: 'text-blue-300 hover:text-blue-100',
      hoverColor: 'bg-blue-500/20'
    },
    { 
      name: 'LinkedIn', 
      icon: <Linkedin size={20} />, 
      path: 'https://www.linkedin.com/in/saiduzzaman-saad-084837269?trk=contact-info', 
      color: 'text-blue-400 hover:text-blue-200',
      hoverColor: 'bg-blue-600/20'
    },
    { 
      name: 'Facebook', 
      icon: <Facebook size={20} />, 
      path: 'https://www.facebook.com/saiduzzaman.saad113/', 
      color: 'text-blue-500 hover:text-blue-300',
      hoverColor: 'bg-blue-700/20'
    },
    { 
      name: 'GitHub', 
      icon: <Github size={20} />, 
      path: 'https://github.com/yourusername', 
      color: 'text-gray-300 hover:text-white',
      hoverColor: 'bg-gray-700/20'
    },
  ];

  const resources = [
    { name: 'Documentation', path: '#', icon: <Code size={16} /> },
    { name: 'Video Tutorials', path: '#', icon: <Cpu size={16} /> },
    { name: 'API Reference', path: '#', icon: <Database size={16} /> },
    { name: 'Community Forum', path: '#', icon: <Globe size={16} /> },
    { name: 'Case Studies', path: '#', icon: <ClipboardCheck size={16} /> },
  ];

  const contactInfo = [
    { text: 'saiduzzaman113@gmail.com', icon: <Mail size={16} /> },
    { text: '+8801788637109', icon: <Phone size={16} /> },
    { text: 'Sylhet,Bangladesh', icon: <MapPin size={16} /> },
  ];

  // Floating particles animation
  const Particle = ({ delay }) => {
    const variants = {
      float: {
        y: [0, -15, 0],
        x: [0, Math.random() * 20 - 10, 0],
        transition: {
          duration: 5 + Math.random() * 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay
        }
      }
    };

    const size = Math.random() * 4 + 2;
    const opacity = Math.random() * 0.4 + 0.1;

    return (
      <motion.div
        className={`absolute rounded-full bg-yellow-400`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          opacity: opacity,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        variants={variants}
        animate="float"
      />
    );
  };

  return (
    <motion.footer 
      className="relative overflow-hidden pt-16 pb-8"
      style={{
        background: `linear-gradient(${gradientAngle}deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.95), rgba(44, 29, 80, 0.97))`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(20)].map((_, i) => (
          <Particle key={i} delay={i * 0.2} />
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <motion.div 
          className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"
          animate={{
            x: [-20, 10, -20],
            y: [-20, 10, -20],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -right-20 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl"
          animate={{
            x: [0, -15, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Branding */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center mb-4">
                <motion.div
                  whileHover={{ rotate: 15 }}
                  transition={{ type: 'spring' }}
                >
                  <HardHat size={32} className="text-yellow-400 mr-3" />
                </motion.div>
                <motion.h1 
                  className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 text-transparent bg-clip-text"
                  whileHover={{ scale: 1.02 }}
                >
                  CivilTools Pro
                </motion.h1>
              </div>
              <motion.p 
                className="text-gray-400 text-sm text-center md:text-left mb-4"
                whileHover={{ scale: 1.01 }}
              >
                Precision engineering tools for modern construction professionals.
              </motion.p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                {socials.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.path}
                    className={`${social.color} transition-colors duration-300 p-2 rounded-full relative overflow-hidden`}
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ scale: 1 }}
                  >
                    <span className="relative z-10">{social.icon}</span>
                    <motion.span
                      className={`absolute inset-0 rounded-full ${social.hoverColor} z-0`}
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    />
                  </motion.a>
                ))}
              </div>

              {/* Contact Info */}
              <div className="space-y-2 w-full">
                {contactInfo.map((info, i) => (
                  <motion.div 
                    key={i}
                    className="flex items-center text-gray-400 text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="mr-2 text-blue-400">{info.icon}</span>
                    <span>{info.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tools */}
          <div>
            <motion.h2 
              className="text-lg font-semibold mb-5 text-white flex items-center justify-center md:justify-start"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <motion.span 
                className="mr-2 text-yellow-400"
                whileHover={{ rotate: 15 }}
              >
                <Hammer size={20} />
              </motion.span>
              Engineering Tools
            </motion.h2>
            <ul className="space-y-3">
              {tools.map((tool, index) => (
                <motion.li
                  key={tool.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  onMouseEnter={() => setHoveredItem(tool.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <a
                    href={tool.path}
                    className={`flex items-center space-x-2 text-sm transition-all duration-300 ${hoveredItem === tool.name ? 'text-yellow-300' : 'text-gray-400 hover:text-gray-200'}`}
                  >
                    <motion.span
                      animate={{ 
                        rotate: hoveredItem === tool.name ? 5 : 0,
                        x: hoveredItem === tool.name ? 3 : 0
                      }}
                    >
                      {tool.icon}
                    </motion.span>
                    <span>{tool.name}</span>
                    {hoveredItem === tool.name ? (
                      <motion.span 
                        className="ml-auto"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <ChevronRight size={16} className="text-yellow-400" />
                      </motion.span>
                    ) : (
                      <span className="ml-auto w-4"></span>
                    )}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <motion.h2 
              className="text-lg font-semibold mb-5 text-white flex items-center justify-center md:justify-start"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.span 
                className="mr-2 text-blue-400"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 5
                }}
              >
                <ClipboardCheck size={20} />
              </motion.span>
              Resources
            </motion.h2>
            <ul className="space-y-3">
              {resources.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  whileHover={{ x: 5 }}
                >
                  <a
                    href={item.path}
                    className="text-gray-400 hover:text-blue-300 text-sm flex items-center transition-colors duration-300 group"
                  >
                    <motion.span 
                      className="mr-2 text-blue-500 group-hover:text-blue-300"
                      whileHover={{ scale: 1.2 }}
                    >
                      {item.icon}
                    </motion.span>
                    <span>{item.name}</span>
                    <motion.span 
                      className="ml-auto opacity-0 group-hover:opacity-100 text-blue-400"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ChevronRight size={14} />
                    </motion.span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-lg font-semibold mb-5 text-white flex items-center justify-center md:justify-start">
              <motion.span 
                className="mr-2 text-pink-400"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                <Mail size={20} />
              </motion.span>
              Stay Updated
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            
            <AnimatePresence>
              {isSubscribed ? (
                <motion.div
                  className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4 flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <Sparkles className="text-green-400 mr-2" size={18} />
                  <span className="text-green-300 text-sm">Thanks for subscribing!</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe}>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <motion.div className="relative flex-1" layout>
                      <input
                        type="email"
                        placeholder="Your email"
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      {email && (
                        <motion.button
                          type="button"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400"
                          onClick={() => setEmail('')}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          whileHover={{ scale: 1.2 }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </motion.button>
                      )}
                    </motion.div>
                    <motion.button
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      animate={controls}
                      type="submit"
                    >
                      <span>Subscribe</span>
                      <motion.span
                        animate={{ x: [0, 2, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <ChevronRight size={16} />
                      </motion.span>
                    </motion.button>
                  </div>
                </form>
              )}
            </AnimatePresence>

            {/* Developer Info */}
            <motion.div 
              className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-start gap-3">
                <motion.div 
                  className="bg-gradient-to-br from-purple-500 to-blue-600 p-2 rounded-lg"
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Code size={20} className="text-white" />
                </motion.div>
                <div>
  <h3 className="text-sm font-medium text-white mb-1">Developed by</h3>
  <p className="text-xs text-gray-400">MD.SAIDUZZAMAN SAAD</p>
  <p className="text-xs text-gray-400">Full-Stack Developer</p>
  <div className="mt-1">
    <motion.div
      initial={false}
      animate={{ height: showLink ? 'auto' : '1.25rem' }}
      className="overflow-hidden"
    >
      {showLink ? (
        <a 
          href="https://www.facebook.com/saiduzzaman.saad113/" 
          className="text-xs text-blue-400 hover:underline flex items-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook size={12} className="mr-1" />
          <span className="hidden sm:inline">facebook.com/saiduzzaman.saad113</span>
          <span className="sm:hidden">Facebook Profile</span>
        </a>
      ) : (
        <button 
          onClick={() => setShowLink(true)}
          className="text-xs text-blue-400 flex items-center hover:underline"
        >
          <Facebook size={12} className="mr-1" />
          Show Contact
        </button>
      )}
    </motion.div>
  </div>
</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div 
          className="relative my-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center">
            <motion.div
              className="bg-gradient-to-r from-yellow-500 to-purple-600 p-1 rounded-full"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="bg-gray-900 p-1 rounded-full">
                <HardHat size={20} className="text-yellow-400" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </motion.div>
            <span>© {currentYear} CivilTools Pro. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <motion.a 
              href="#" 
              className="hover:text-gray-300 transition-colors flex items-center"
              whileHover={{ y: -2 }}
            >
              <span>Terms</span>
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:text-gray-300 transition-colors flex items-center"
              whileHover={{ y: -2 }}
            >
              <span>Privacy</span>
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:text-gray-300 transition-colors flex items-center"
              whileHover={{ y: -2 }}
            >
              <span>Cookies</span>
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:text-gray-300 transition-colors flex items-center"
              whileHover={{ y: -2 }}
            >
              <span>License</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;