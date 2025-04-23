import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Hammer, Ruler, Box, Zap, Home } from 'lucide-react';

const navLinks = [
  { name: 'BBS Calculator', path: '/bbs-calculator', icon: <Ruler size={20} /> },
  { name: 'Brick Calculator', path: '/brick-calculator', icon: <Box size={20} /> },
  { name: 'Unit Converter', path: '/unit-converter', icon: <Hammer size={20} /> },
  { name: 'Load Calculator', path: '/load-calculator', icon: <Zap size={20} /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [gradientAngle, setGradientAngle] = useState(90);

  // Dynamic gradient angle based on mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setGradientAngle(Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI) + 90);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  return (
    <motion.nav
      className={`fixed w-full z-50 ${scrolled ? 'backdrop-blur-lg bg-opacity-90' : 'backdrop-blur-md bg-opacity-80'}`}
      style={{
        background: `linear-gradient(${gradientAngle}deg, rgba(30, 58, 138, 0.9), rgba(79, 70, 229, 0.9), rgba(124, 58, 237, 0.9))`,
        boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.2)' : 'none',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2"
        >
          <Link 
            to="/" 
            className="text-2xl font-extrabold tracking-tight flex items-center gap-2"
          >
            <Hammer size={28} className="text-yellow-300" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-white">
              CivilTools Pro
            </span>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-2 items-center">
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Link
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${location.pathname === link.path ? 'bg-white text-blue-700 shadow-lg' : 'hover:bg-white/20 hover:text-yellow-200'}`}
              >
                {link.icon}
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Toggle */}
        <motion.div 
          className="md:hidden z-50"
          whileTap={{ scale: 0.9 }}
        >
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`p-2 rounded-full ${isOpen ? 'bg-white/20' : 'hover:bg-white/10'}`}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={28} className="text-white" />
            ) : (
              <Menu size={28} className="text-white" />
            )}
          </button>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-gradient-to-b from-blue-900/95 to-indigo-900/95 backdrop-blur-xl pt-24 px-6"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col space-y-6">
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-2xl font-medium text-white hover:text-yellow-300"
                  >
                    <Home size={24} />
                    Home
                  </Link>
                </motion.div>
                
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 text-xl py-3 ${location.pathname === link.path ? 'text-yellow-300' : 'text-white hover:text-yellow-200'}`}
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="absolute bottom-10 left-0 right-0 text-center text-white/50 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                CivilTools Pro © 2025
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
