import { useState } from 'react';
import { motion } from 'framer-motion';

const BBSForm = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    elementType: 'beam',
    barShape: 'straight',
    barDiameter: 12,
    length: 0,
    breadth: 0,
    cover: 25,
    bendAngle: 90,
    numberOfBars: 1,
    wastage: 5,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'barDiameter' || name === 'length' || name === 'breadth' || 
               name === 'cover' || name === 'bendAngle' || name === 'numberOfBars' || 
               name === 'wastage' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(formData);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    tap: { scale: 0.98 }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl shadow-xl border border-gray-200 max-w-4xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2 
        className="text-2xl font-bold mb-6 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
        variants={itemVariants}
      >
        Bar Bending Schedule Calculator
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div className="mb-5" variants={itemVariants}>
          <label className="block text-gray-700 mb-2 font-medium">Element Type</label>
          <select 
            name="elementType" 
            value={formData.elementType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
          >
            <option value="beam">Beam</option>
            <option value="column">Column</option>
            <option value="slab">Slab</option>
            <option value="footing">Footing</option>
          </select>
        </motion.div>

        <motion.div className="mb-5" variants={itemVariants}>
          <label className="block text-gray-700 mb-2 font-medium">Bar Shape</label>
          <select 
            name="barShape" 
            value={formData.barShape}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
          >
            <option value="straight">Straight</option>
            <option value="crank">Crank</option>
            <option value="l-shape">L-Shape</option>
            <option value="u-shape">U-Shape</option>
            <option value="spiral">Spiral</option>
            <option value="custom">Custom</option>
          </select>
        </motion.div>

        <motion.div className="mb-5" variants={itemVariants}>
          <label className="block text-gray-700 mb-2 font-medium">Bar Diameter (mm)</label>
          <select 
            name="barDiameter" 
            value={formData.barDiameter}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
          >
            <option value="8">8mm</option>
            <option value="10">10mm</option>
            <option value="12">12mm</option>
            <option value="16">16mm</option>
            <option value="20">20mm</option>
            <option value="25">25mm</option>
            <option value="32">32mm</option>
          </select>
        </motion.div>

        <motion.div className="mb-5" variants={itemVariants}>
          <label className="block text-gray-700 mb-2 font-medium">Length (mm)</label>
          <input 
            type="number" 
            name="length" 
            value={formData.length}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
          />
        </motion.div>

        <motion.div className="mb-5" variants={itemVariants}>
          <label className="block text-gray-700 mb-2 font-medium">Breadth (mm)</label>
          <input 
            type="number" 
            name="breadth" 
            value={formData.breadth}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
          />
        </motion.div>

        <motion.div className="mb-5" variants={itemVariants}>
          <label className="block text-gray-700 mb-2 font-medium">Cover (mm)</label>
          <input 
            type="number" 
            name="cover" 
            value={formData.cover}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
          />
        </motion.div>

        <motion.div className="mb-5" variants={itemVariants}>
          <label className="block text-gray-700 mb-2 font-medium">Bend Angle (degrees)</label>
          <input 
            type="number" 
            name="bendAngle" 
            value={formData.bendAngle}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
          />
        </motion.div>

        <motion.div className="mb-5" variants={itemVariants}>
          <label className="block text-gray-700 mb-2 font-medium">Number of Bars</label>
          <input 
            type="number" 
            name="numberOfBars" 
            value={formData.numberOfBars}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
          />
        </motion.div>

        <motion.div className="mb-5" variants={itemVariants}>
          <label className="block text-gray-700 mb-2 font-medium">Wastage (%)</label>
          <input 
            type="number" 
            name="wastage" 
            value={formData.wastage}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
          />
        </motion.div>
      </div>

      <motion.div className="mt-8 text-center" variants={itemVariants}>
        <motion.button 
          type="submit" 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          initial="rest"
        >
          Calculate BBS
        </motion.button>
      </motion.div>
    </motion.form>
  );
};

export default BBSForm;