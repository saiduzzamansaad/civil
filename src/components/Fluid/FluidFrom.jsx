import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FluidMechanicsForm = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    density: 1000,
    velocity: 0,
    diameter: 0,
    length: 0,
    viscosity: 0.001,
    pressureDrop: 0,
    flowRate: 0,
    headLoss: 0,
    calculationType: 'reynolds',
    unitSystem: 'metric'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'density' || name === 'velocity' || name === 'diameter' || 
              name === 'length' || name === 'viscosity' || name === 'pressureDrop' || 
              name === 'flowRate' || name === 'headLoss' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(formData);
  };

  const getUnit = (quantity) => {
    if (formData.unitSystem === 'metric') {
      switch(quantity) {
        case 'density': return 'kg/m³';
        case 'velocity': return 'm/s';
        case 'length': return 'm';
        case 'viscosity': return 'Pa·s';
        case 'pressure': return 'Pa';
        case 'flowRate': return 'm³/s';
        case 'head': return 'm';
        default: return '';
      }
    } else {
      switch(quantity) {
        case 'density': return 'lb/ft³';
        case 'velocity': return 'ft/s';
        case 'length': return 'ft';
        case 'viscosity': return 'lb·s/ft²';
        case 'pressure': return 'psi';
        case 'flowRate': return 'ft³/s';
        case 'head': return 'ft';
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
        className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-600"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        Fluid Mechanics Calculator
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
            <option value="metric">Metric (SI units)</option>
            <option value="imperial">Imperial (US units)</option>
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
            <option value="reynolds">Reynolds Number</option>
            <option value="flowrate">Flow Rate</option>
            <option value="headloss">Head Loss (Darcy-Weisbach)</option>
            <option value="velocity">Flow Velocity</option>
            <option value="pressure">Pressure Drop</option>
          </select>
        </motion.div>

        <AnimatePresence>
          {formData.calculationType === 'reynolds' && (
            <>
              <motion.div
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3, delay: 0.2 }}
                className="mb-4"
              >
                <label className="block text-gray-700 mb-2 font-medium">
                  Density ({getUnit('density')})
                </label>
                <input 
                  type="number" 
                  name="density" 
                  value={formData.density}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </motion.div>

              <motion.div
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3, delay: 0.3 }}
                className="mb-4"
              >
                <label className="block text-gray-700 mb-2 font-medium">
                  Velocity ({getUnit('velocity')})
                </label>
                <input 
                  type="number" 
                  name="velocity" 
                  value={formData.velocity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </motion.div>

              <motion.div
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3, delay: 0.4 }}
                className="mb-4"
              >
                <label className="block text-gray-700 mb-2 font-medium">
                  Diameter ({getUnit('length')})
                </label>
                <input 
                  type="number" 
                  name="diameter" 
                  value={formData.diameter}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </motion.div>

              <motion.div
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3, delay: 0.5 }}
                className="mb-4"
              >
                <label className="block text-gray-700 mb-2 font-medium">
                  Viscosity ({getUnit('viscosity')})
                </label>
                <input 
                  type="number" 
                  name="viscosity" 
                  value={formData.viscosity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </motion.div>
            </>
          )}

          {formData.calculationType === 'headloss' && (
            <>
              <motion.div
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3, delay: 0.2 }}
                className="mb-4"
              >
                <label className="block text-gray-700 mb-2 font-medium">
                  Friction Factor
                </label>
                <input 
                  type="number" 
                  name="frictionFactor" 
                  value={formData.frictionFactor}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </motion.div>

              <motion.div
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3, delay: 0.3 }}
                className="mb-4"
              >
                <label className="block text-gray-700 mb-2 font-medium">
                  Pipe Length ({getUnit('length')})
                </label>
                <input 
                  type="number" 
                  name="length" 
                  value={formData.length}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </motion.div>

              <motion.div
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3, delay: 0.4 }}
                className="mb-4"
              >
                <label className="block text-gray-700 mb-2 font-medium">
                  Diameter ({getUnit('length')})
                </label>
                <input 
                  type="number" 
                  name="diameter" 
                  value={formData.diameter}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </motion.div>

              <motion.div
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3, delay: 0.5 }}
                className="mb-4"
              >
                <label className="block text-gray-700 mb-2 font-medium">
                  Velocity ({getUnit('velocity')})
                </label>
                <input 
                  type="number" 
                  name="velocity" 
                  value={formData.velocity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </motion.div>
            </>
          )}

          {formData.calculationType === 'flowrate' && (
            <>
              <motion.div
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3, delay: 0.2 }}
                className="mb-4"
              >
                <label className="block text-gray-700 mb-2 font-medium">
                  Velocity ({getUnit('velocity')})
                </label>
                <input 
                  type="number" 
                  name="velocity" 
                  value={formData.velocity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </motion.div>

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
            </>
          )}

          {formData.calculationType === 'pressure' && (
            <>
              <motion.div
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3, delay: 0.2 }}
                className="mb-4"
              >
                <label className="block text-gray-700 mb-2 font-medium">
                  Head Loss ({getUnit('head')})
                </label>
                <input 
                  type="number" 
                  name="headLoss" 
                  value={formData.headLoss}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </motion.div>

              <motion.div
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3, delay: 0.3 }}
                className="mb-4"
              >
                <label className="block text-gray-700 mb-2 font-medium">
                  Density ({getUnit('density')})
                </label>
                <input 
                  type="number" 
                  name="density" 
                  value={formData.density}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <motion.button 
        type="submit" 
        className="w-full mt-6 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Calculate
      </motion.button>

      <motion.div 
        className="h-1 mt-6 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: 0.5, duration: 1 }}
      />
    </motion.form>
  );
};

export default FluidMechanicsForm;