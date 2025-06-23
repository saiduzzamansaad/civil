import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Menu, X, Hammer, Ruler, Box, Zap, Home, ChevronRight, Sparkles, Github } from 'lucide-react';

const navLinks = [
  { name: 'BBS Calculator', path: '/bbs-calculator', icon: <Ruler size={20} /> },
  { name: 'Brick Calculator', path: '/brick-calculator', icon: <Box size={20} /> },
  { name: 'Unit Converter', path: '/unit-converter', icon: <Hammer size={20} /> },
  { name: 'Load Calculator', path: '/load-calculator', icon: <Zap size={20} /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHover, setActiveHover] = useState(false);
  const location = useLocation();
  const [gradientAngle, setGradientAngle] = useState(90);
  const [hoveredLink, setHoveredLink] = useState(null);
  const navRef = useRef(null);
  const mouseX = useMotionValue(Infinity);
  const cursorSize = 30;

  // Dynamic gradient angle based on mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setGradientAngle(Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI) + 90);
      
      // Track mouse position for hover effect
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Custom cursor effect
  const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const cursorOpacity = useMotionValue(0);
    const cursorScale = useMotionValue(1);

    useEffect(() => {
      const moveCursor = (e) => {
        cursorX.set(e.clientX - cursorSize / 2);
        cursorY.set(e.clientY - cursorSize / 2);
        cursorOpacity.set(1);
        
        // Check if hovering over a link
        const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
        const isHoveringLink = hoveredElement?.closest('a') || hoveredElement?.closest('button');
        setActiveHover(!!isHoveringLink);
      };

      const handleMouseLeave = () => {
        cursorOpacity.set(0);
      };

      window.addEventListener('mousemove', moveCursor);
      window.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        window.removeEventListener('mousemove', moveCursor);
        window.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, [cursorX, cursorY, cursorOpacity]);

    return (
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: cursorOpacity,
          width: cursorSize,
          height: cursorSize,
          borderRadius: '50%',
          backgroundColor: activeHover ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)',
          scale: cursorScale,
          transition: 'background-color 0.2s ease',
        }}
        animate={{
          scale: activeHover ? 0.7 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
    );
  };

  // Floating particles animation
  const Particle = ({ delay }) => {
    const variants = {
      float: {
        y: [0, -20, 0],
        x: [0, Math.random() * 30 - 15, 0],
        transition: {
          duration: 8 + Math.random() * 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay
        }
      }
    };

    const size = Math.random() * 4 + 2;
    const opacity = Math.random() * 0.3 + 0.1;

    return (
      <motion.div
        className={`absolute rounded-full bg-yellow-300`}
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

  // Hover effect for desktop links
  const springConfig = { stiffness: 300, damping: 20 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const hoverBackground = useTransform(
    mouseXSpring,
    (val) => {
      if (!navRef.current) return '0% 50%';
      const links = Array.from(navRef.current.querySelectorAll('a'));
      const linkRects = links.map((link) => link.getBoundingClientRect());
      const linkIndex = linkRects.findIndex((rect) => val >= rect.left && val <= rect.right);
      
      if (linkIndex === -1) return '0% 50%';
      const linkRect = linkRects[linkIndex];
      return `${(linkRect.left + linkRect.right) / 2 - navRef.current.getBoundingClientRect().left}px 50%`;
    }
  );

  return (
    <>
      <CustomCursor />
      
      <motion.nav
        ref={navRef}
        className={`fixed w-full z-40 ${scrolled ? 'backdrop-blur-lg bg-opacity-90' : 'backdrop-blur-md bg-opacity-80'}`}
        style={{
          background: `linear-gradient(${gradientAngle}deg, rgba(30, 58, 138, 0.9), rgba(79, 70, 229, 0.9), rgba(124, 58, 237, 0.9))`,
          boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.2)' : 'none',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(15)].map((_, i) => (
            <Particle key={i} delay={i * 0.2} />
          ))}
        </div>

        <div className="container mx-auto px-4 py-3 flex justify-between items-center relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 z-10"
          >
            <Link 
              to="/" 
              className="text-2xl font-extrabold tracking-tight flex items-center gap-2"
            >
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Hammer size={28} className="text-yellow-300" />
              </motion.div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-white">
                CivilTools Pro
              </span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 items-center relative">
            <motion.div
              className="absolute left-0 top-0 w-full h-full pointer-events-none"
              style={{
                background: `radial-gradient(30px circle at ${hoverBackground}, rgba(255, 255, 255, 0.15) 0%, transparent 100%)`,
              }}
            />
            
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                onMouseEnter={() => setHoveredLink(link.path)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative"
              >
                <Link
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 relative z-10 ${
                    location.pathname === link.path 
                      ? 'text-white' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <motion.span
                    animate={{
                      rotate: hoveredLink === link.path ? [0, 5, -5, 0] : 0,
                      transition: { duration: 0.5 }
                    }}
                  >
                    {link.icon}
                  </motion.span>
                  <span>{link.name}</span>
                  {hoveredLink === link.path && (
                    <motion.span 
                      className="absolute bottom-0 left-1/2 w-1/2 h-0.5 bg-yellow-300 rounded-full"
                      initial={{ width: 0, x: '-50%' }}
                      animate={{ width: '80%' }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}

            {/* GitHub Link */}
            <motion.a
              href="https://github.com/yourusername/yourrepo"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 p-2 rounded-full hover:bg-white/10 transition-colors duration-300"
              whileHover={{ rotate: 360, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="View on GitHub"
            >
              <Github size={20} className="text-white" />
            </motion.a>
          </div>

          {/* Mobile Toggle */}
          <motion.div 
            className="md:hidden z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`p-2 rounded-full relative overflow-hidden ${isOpen ? 'bg-white/20' : 'hover:bg-white/10'}`}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={28} className="text-white" />
              ) : (
                <Menu size={28} className="text-white" />
              )}
              {!isOpen && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-white/5"
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: 1,
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: "easeInOut"
                  }}
                />
              )}
            </button>
          </motion.div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="fixed inset-0 bg-gradient-to-br from-blue-900/95 via-indigo-900/95 to-purple-900/95 backdrop-blur-xl pt-24 px-6"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden opacity-10">
                  <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
                  <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl"></div>
                </div>

                <div className="flex flex-col space-y-6 relative z-10">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 }}
                    whileHover={{ x: 5 }}
                    className="group"
                  >
                    <Link
                      to="/"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 text-2xl font-medium text-white hover:text-yellow-300"
                    >
                      <motion.span
                        animate={{
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 2
                        }}
                      >
                        <Home size={24} />
                      </motion.span>
                      <span>Home</span>
                      <motion.span 
                        className="ml-auto opacity-0 group-hover:opacity-100"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <ChevronRight size={20} />
                      </motion.span>
                    </Link>
                  </motion.div>
                  
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      whileHover={{ x: 5 }}
                      className="group"
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 text-xl py-3 ${
                          location.pathname === link.path 
                            ? 'text-yellow-300' 
                            : 'text-white hover:text-yellow-200'
                        }`}
                      >
                        <motion.span
                          animate={{
                            rotate: location.pathname === link.path ? [0, 5, -5, 0] : 0,
                            transition: { duration: 1 }
                          }}
                        >
                          {link.icon}
                        </motion.span>
                        <span>{link.name}</span>
                        <motion.span 
                          className="ml-auto opacity-0 group-hover:opacity-100 text-yellow-300"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          <ChevronRight size={20} />
                        </motion.span>
                      </Link>
                    </motion.div>
                  ))}

                  {/* GitHub link in mobile menu */}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ x: 5 }}
                    className="group pt-4 border-t border-white/10"
                  >
                    <a
                      href="https://github.com/yourusername/yourrepo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-xl py-3 text-white hover:text-yellow-300"
                    >
                      <motion.span
                        animate={{
                          rotate: [0, 5, -5, 0],
                          transition: { duration: 3, repeat: Infinity }
                        }}
                      >
                        <Github size={24} />
                      </motion.span>
                      <span>GitHub Repository</span>
                      <motion.span 
                        className="ml-auto opacity-0 group-hover:opacity-100 text-yellow-300"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <ChevronRight size={20} />
                      </motion.span>
                    </a>
                  </motion.div>
                </div>
                
                <motion.div 
                  className="absolute bottom-10 left-0 right-0 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div
                    className="inline-flex items-center gap-1 text-white/50 text-sm"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity
                    }}
                  >
                    <Sparkles size={16} className="text-yellow-300" />
                    <span>CivilTools Pro © {new Date().getFullYear()}</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;