import { useState } from 'react';
import { motion } from 'framer-motion';

const BrickForm = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    wallLength: '',
    wallHeight: '',
    wallThickness: 0.23, // Default to 9 inches in meters
    mortarRatio: '1:6',
    brickSize: 'standard',
    wastage: 5,
    unitSystem: 'metric',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'wallLength' || name === 'wallHeight' || name === 'wallThickness' || 
               name === 'wastage' ? parseFloat(value) || '' : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(formData);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen p-4"
    >
      <motion.form 
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 
          className="text-2xl font-bold text-gray-800 mb-6 text-center"
          variants={item}
        >
          Brick & Mortar Calculator
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={item} className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Unit System</label>
            <motion.select 
              name="unitSystem" 
              value={formData.unitSystem}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              whileFocus={{ scale: 1.02 }}
            >
              <option value="metric">Metric (meters)</option>
              <option value="imperial">Imperial (feet)</option>
            </motion.select>
          </motion.div>

          <motion.div variants={item} className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Wall Length ({formData.unitSystem === 'metric' ? 'meters' : 'feet'})
            </label>
            <motion.input 
              type="number" 
              name="wallLength" 
              value={formData.wallLength}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder={`0.00 ${formData.unitSystem === 'metric' ? 'm' : 'ft'}`}
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>

          <motion.div variants={item} className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Wall Height ({formData.unitSystem === 'metric' ? 'meters' : 'feet'})
            </label>
            <motion.input 
              type="number" 
              name="wallHeight" 
              value={formData.wallHeight}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder={`0.00 ${formData.unitSystem === 'metric' ? 'm' : 'ft'}`}
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>

          <motion.div variants={item} className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Wall Thickness ({formData.unitSystem === 'metric' ? 'meters' : 'feet'})
            </label>
            <motion.input 
              type="number" 
              name="wallThickness" 
              value={formData.wallThickness}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder={`0.00 ${formData.unitSystem === 'metric' ? 'm' : 'ft'}`}
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>

          <motion.div variants={item} className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Mortar Ratio</label>
            <motion.select 
              name="mortarRatio" 
              value={formData.mortarRatio}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              whileFocus={{ scale: 1.02 }}
            >
              <option value="1:3">1:3 (Strongest)</option>
              <option value="1:4">1:4</option>
              <option value="1:5">1:5</option>
              <option value="1:6">1:6 (Standard)</option>
            </motion.select>
          </motion.div>

          <motion.div variants={item} className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Brick Size</label>
            <motion.select 
              name="brickSize" 
              value={formData.brickSize}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              whileFocus={{ scale: 1.02 }}
            >
              <option value="standard">Standard (190×90×90 mm)</option>
              <option value="modular">Modular (190×90×90 mm)</option>
              <option value="custom">Custom Size</option>
            </motion.select>
          </motion.div>

          <motion.div variants={item} className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Wastage (%)</label>
            <div className="relative">
              <motion.input 
                type="number" 
                name="wastage" 
                value={formData.wastage}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pr-12"
                whileFocus={{ scale: 1.02 }}
              />
              <span className="absolute right-4 top-3 text-gray-500">%</span>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-8"
          variants={item}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.button 
            type="submit" 
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg font-medium text-lg"
            whileHover={{ 
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
            }}
          >
            Calculate Requirements
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default BrickForm;