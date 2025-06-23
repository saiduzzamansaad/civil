import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StrengthOfMaterialsForm = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    force: 0,
    area: 0,
    originalLength: 0,
    changeInLength: 0,
    modulus: 0,
    momentOfInertia: 0,
    distance: 0,
    calculationType: 'stress',
    unitSystem: 'metric'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'force' || name === 'area' || name === 'originalLength' || 
              name === 'changeInLength' || name === 'modulus' || name === 'momentOfInertia' || 
              name === 'distance' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(formData);
  };

  const getUnit = (quantity) => {
    if (formData.unitSystem === 'metric') {
      switch(quantity) {
        case 'force': return 'N';
        case 'area': return 'mm²';
        case 'length': return 'mm';
        case 'stress': return 'MPa';
        case 'modulus': return 'GPa';
        case 'moment': return 'mm⁴';
        default: return '';
      }
    } else {
      switch(quantity) {
        case 'force': return 'lb';
        case 'area': return 'in²';
        case 'length': return 'in';
        case 'stress': return 'psi';
        case 'modulus': return 'psi';
        case 'moment': return 'in⁴';
        default: return '';
      }
    }
  };

  // Animation variants
  const inputVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        Strength of Materials Calculator
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3 }}
        >
          <label className="block text-gray-700 mb-2 font-medium">Unit System</label>
          <select 
            name="unitSystem" 
            value={formData.unitSystem}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            <option value="metric">Metric (mm, N, MPa)</option>
            <option value="imperial">Imperial (in, lb, psi)</option>
          </select>
        </motion.div>

        <motion.div
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <label className="block text-gray-700 mb-2 font-medium">Calculation Type</label>
          <select 
            name="calculationType" 
            value={formData.calculationType}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            <option value="stress">Stress (σ = F/A)</option>
            <option value="strain">Strain (ε = ΔL/L)</option>
            <option value="modulus">Modulus of Elasticity (E = σ/ε)</option>
            <option value="bending">Bending Stress (σ = My/I)</option>
          </select>
        </motion.div>

        <AnimatePresence>
          {(formData.calculationType === 'stress' || formData.calculationType === 'modulus' || formData.calculationType === 'bending') && (
            <motion.div
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mb-4"
            >
              <label className="block text-gray-700 mb-2 font-medium">
                Force ({getUnit('force')})
              </label>
              <input 
                type="number" 
                name="force" 
                value={formData.force}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Other input fields with similar motion.div wrappers */}
        {/* Each with increasing delay for staggered animation */}
        
        {formData.calculationType === 'stress' || formData.calculationType === 'modulus' || formData.calculationType === 'bending' ? (
          <motion.div
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: 0.3 }}
            className="mb-4"
          >
            <label className="block text-gray-700 mb-2 font-medium">
              Cross-sectional Area ({getUnit('area')})
            </label>
            <input 
              type="number" 
              name="area" 
              value={formData.area}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </motion.div>
        ) : null}

        {/* Continue with other conditional fields... */}

      </div>

      <motion.button 
        type="submit" 
        className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Calculate
      </motion.button>

      {/* Decorative animated element */}
      <motion.div 
        className="h-1 mt-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: 0.5, duration: 1 }}
      />
    </motion.form>
  );
};

export default StrengthOfMaterialsForm;