import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DesignOfStructuresForm = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    loadType: 'point',
    loadValue: '',
    spanLength: '',
    supportType: 'simplySupported',
    material: 'concrete',
    sectionType: 'rectangular',
    width: '',
    depth: '',
    safetyFactor: 1.5,
    unitSystem: 'metric'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'loadValue' || name === 'spanLength' || 
               name === 'width' || name === 'depth' || 
               name === 'safetyFactor' ? parseFloat(value) || '' : value
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
        staggerChildren: 0.15
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
        stiffness: 100,
        damping: 10
      }
    }
  };

  const getUnit = (field) => {
    if (formData.unitSystem === 'metric') {
      switch(field) {
        case 'load': return 'kN';
        case 'length': return 'm';
        case 'dimension': return 'mm';
        default: return '';
      }
    } else {
      switch(field) {
        case 'load': return 'kips';
        case 'length': return 'ft';
        case 'dimension': return 'in';
        default: return '';
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen p-4 bg-gray-50"
    >
      <motion.form 
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 
          className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          variants={item}
        >
          Structural Design Calculator
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Unit System */}
          <motion.div variants={item} className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Unit System</label>
            <select 
              name="unitSystem" 
              value={formData.unitSystem}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="metric">Metric (kN, m, mm)</option>
              <option value="imperial">Imperial (kips, ft, in)</option>
            </select>
          </motion.div>

          {/* Load Type */}
          <motion.div variants={item} className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Load Type</label>
            <select 
              name="loadType" 
              value={formData.loadType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="point">Point Load</option>
              <option value="uniform">Uniform Load</option>
              <option value="moment">Moment</option>
            </select>
          </motion.div>

          {/* Load Value */}
          <motion.div variants={item} className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Load Value ({getUnit('load')})
            </label>
            <input 
              type="number" 
              name="loadValue" 
              value={formData.loadValue}
              onChange={handleChange}
              step="0.1"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder={`0.0 ${getUnit('load')}`}
            />
          </motion.div>

          {/* Span Length */}
          <motion.div variants={item} className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Span Length ({getUnit('length')})
            </label>
            <input 
              type="number" 
              name="spanLength" 
              value={formData.spanLength}
              onChange={handleChange}
              step="0.1"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder={`0.0 ${getUnit('length')}`}
            />
          </motion.div>

          {/* Support Type */}
          <motion.div variants={item} className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Support Type</label>
            <select 
              name="supportType" 
              value={formData.supportType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="simplySupported">Simply Supported</option>
              <option value="fixed">Fixed</option>
              <option value="cantilever">Cantilever</option>
            </select>
          </motion.div>

          {/* Material */}
          <motion.div variants={item} className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Material</label>
            <select 
              name="material" 
              value={formData.material}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="concrete">Concrete</option>
              <option value="steel">Steel</option>
              <option value="timber">Timber</option>
              <option value="composite">Composite</option>
            </select>
          </motion.div>

          {/* Section Type */}
          <motion.div variants={item} className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Section Type</label>
            <select 
              name="sectionType" 
              value={formData.sectionType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="rectangular">Rectangular</option>
              <option value="circular">Circular</option>
              <option value="iBeam">I-Beam</option>
              <option value="tBeam">T-Beam</option>
            </select>
          </motion.div>

          {/* Section Dimensions */}
          {formData.sectionType === 'rectangular' && (
            <>
              <motion.div variants={item} className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">
                  Width ({getUnit('dimension')})
                </label>
                <input 
                  type="number" 
                  name="width" 
                  value={formData.width}
                  onChange={handleChange}
                  step="1"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder={`0 ${getUnit('dimension')}`}
                />
              </motion.div>
              <motion.div variants={item} className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">
                  Depth ({getUnit('dimension')})
                </label>
                <input 
                  type="number" 
                  name="depth" 
                  value={formData.depth}
                  onChange={handleChange}
                  step="1"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder={`0 ${getUnit('dimension')}`}
                />
              </motion.div>
            </>
          )}

          {/* Safety Factor */}
          <motion.div variants={item} className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Safety Factor</label>
            <input 
              type="number" 
              name="safetyFactor" 
              value={formData.safetyFactor}
              onChange={handleChange}
              step="0.1"
              min="1"
              max="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </motion.div>
        </div>

        <motion.div 
          className="mt-8"
          variants={item}
        >
          <motion.button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl hover:opacity-90 transition-all shadow-lg font-medium text-lg"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            Analyze Structure
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default DesignOfStructuresForm;