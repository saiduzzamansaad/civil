import { motion } from 'framer-motion';

const BBSResults = ({ results }) => {
  if (!results) return null;

  const calculateCuttingLength = (data) => {
    const { barShape, length, breadth, cover } = data;
    let cuttingLength = 0;
    
    switch(barShape) {
      case 'straight':
        cuttingLength = length - (2 * cover);
        break;
      case 'crank':
        cuttingLength = length - (2 * cover) + (2 * 0.42 * (breadth - (2 * cover)));
        break;
      case 'l-shape':
        cuttingLength = (length - cover) + (breadth - cover) - (1 * (breadth - (2 * cover)));
        break;
      case 'u-shape':
        cuttingLength = (2 * (length - cover)) + (breadth - (2 * cover));
        break;
      case 'spiral':
        cuttingLength = 1.2 * length;
        break;
      default:
        cuttingLength = length;
    }
    
    return cuttingLength;
  };

  const calculateWeight = (diameter, length) => {
    return (Math.pow(diameter, 2) / 162) * (length / 1000);
  };

  const cuttingLength = calculateCuttingLength(results);
  const weightPerBar = calculateWeight(results.barDiameter, cuttingLength);
  const totalWeight = weightPerBar * results.numberOfBars * (1 + results.wastage / 100);
  const totalLength = cuttingLength * results.numberOfBars * (1 + results.wastage / 100);

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
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    }
  };

  const valueVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "anticipate"
      }
    }
  };

  return (
    <motion.div 
      className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-xl border border-gray-200 mt-8 max-w-4xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2 
        className="text-2xl font-bold mb-6 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600"
        variants={itemVariants}
      >
        Bar Bending Schedule Results
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div className="mb-5" variants={itemVariants}>
          <p className="text-gray-700 mb-1 font-medium">Cutting Length per Bar:</p>
          <motion.p 
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            variants={valueVariants}
          >
            {cuttingLength.toFixed(2)} mm
          </motion.p>
          <div className="h-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mt-2"></div>
        </motion.div>
        
        <motion.div className="mb-5" variants={itemVariants}>
          <p className="text-gray-700 mb-1 font-medium">Weight per Bar:</p>
          <motion.p 
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            variants={valueVariants}
          >
            {weightPerBar.toFixed(2)} kg
          </motion.p>
          <div className="h-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mt-2"></div>
        </motion.div>
        
        <motion.div className="mb-5" variants={itemVariants}>
          <p className="text-gray-700 mb-1 font-medium">Total Length (with wastage):</p>
          <motion.p 
            className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent"
            variants={valueVariants}
          >
            {totalLength.toFixed(2)} mm
          </motion.p>
          <div className="h-1 bg-gradient-to-r from-green-100 to-teal-100 rounded-full mt-2"></div>
        </motion.div>
        
        <motion.div className="mb-5" variants={itemVariants}>
          <p className="text-gray-700 mb-1 font-medium">Total Weight (with wastage):</p>
          <motion.p 
            className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
            variants={valueVariants}
          >
            {totalWeight.toFixed(2)} kg
          </motion.p>
          <div className="h-1 bg-gradient-to-r from-orange-100 to-red-100 rounded-full mt-2"></div>
        </motion.div>
      </div>

      <motion.div 
        className="mt-6 pt-6 border-t border-gray-200"
        variants={itemVariants}
      >
        <p className="text-gray-600 text-sm">
          <span className="font-medium">Note:</span> Calculations include {results.wastage}% wastage allowance.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default BBSResults;