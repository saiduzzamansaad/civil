import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Facebook, Linkedin, Mail, Github, Hammer, Ruler, Box, Zap, Home, ClipboardCheck, HardHat } from 'lucide-react';

const Footer = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [gradientAngle, setGradientAngle] = useState(135);
  const [currentYear] = useState(new Date().getFullYear());

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

  const tools = [
    { name: 'BBS Calculator', icon: <Ruler size={20} />, path: '/bbs-calculator' },
    { name: 'Brick Calculator', icon: <Box size={20} />, path: '/brick-calculator' },
    { name: 'Unit Converter', icon: <ClipboardCheck size={20} />, path: '/unit-converter' },
    { name: 'Load Calculator', icon: <Zap size={20} />, path: '/load-calculator' },
  ];

  const socials = [
    { name: 'Email', icon: <Mail size={20} />, path: 'mailto:contact@civil-tools.com', color: 'text-blue-300 hover:text-blue-100' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, path: '#', color: 'text-blue-400 hover:text-blue-200' },
    { name: 'Facebook', icon: <Facebook size={20} />, path: '#', color: 'text-blue-500 hover:text-blue-300' },
    { name: 'GitHub', icon: <Github size={20} />, path: '#', color: 'text-gray-300 hover:text-white' },
  ];

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
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Branding */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center mb-4">
                <HardHat size={32} className="text-yellow-400 mr-3" />
                <h1 className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">
                  CivilTools Pro
                </h1>
              </div>
              <p className="text-gray-400 text-sm text-center md:text-left mb-4">
                Precision engineering tools for modern construction professionals.
              </p>
              <div className="flex space-x-4">
                {socials.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.path}
                    className={`${social.color} transition-colors duration-300`}
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
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
              <Hammer className="mr-2 text-yellow-400" size={20} />
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
                    {hoveredItem === tool.name && (
                      <motion.span 
                        className="ml-auto h-0.5 bg-yellow-400"
                        initial={{ width: 0 }}
                        animate={{ width: '1rem' }}
                        exit={{ width: 0 }}
                      />
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
              <ClipboardCheck className="mr-2 text-blue-400" size={20} />
              Resources
            </motion.h2>
            <ul className="space-y-3">
              {[
                { name: 'Documentation', path: '#' },
                { name: 'Tutorials', path: '#' },
                { name: 'API Reference', path: '#' },
                { name: 'Community Forum', path: '#' },
              ].map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <a
                    href={item.path}
                    className="text-gray-400 hover:text-blue-300 text-sm flex items-center transition-colors duration-300"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    {item.name}
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
              <Mail className="mr-2 text-pink-400" size={20} />
              Stay Updated
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full text-sm"
              />
              <motion.button
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-2 rounded-r-lg text-sm font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div 
          className="border-t border-gray-800 my-8"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.6, duration: 0.8 }}
        />

        {/* Bottom Note */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="mb-4 md:mb-0">
            © {currentYear} CivilTools Pro. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Cookies</a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
