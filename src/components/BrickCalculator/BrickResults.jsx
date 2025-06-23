import { motion } from 'framer-motion';

const BrickResults = ({ results }) => {
  if (!results) return null;

  const calculateMaterials = (data) => {
    // Convert to metric if imperial
    let length = data.wallLength;
    let height = data.wallHeight;
    let thickness = data.wallThickness;
    
    if (data.unitSystem === 'imperial') {
      length = length * 0.3048; // feet to meters
      height = height * 0.3048;
      thickness = thickness * 0.3048;
    }

    // Wall volume in cubic meters
    const wallVolume = length * height * thickness;
    
    // Brick calculations
    const brickSize = data.brickSize === 'standard' ? 
      { length: 0.19, width: 0.09, height: 0.09 } : 
      { length: 0.23, width: 0.11, height: 0.075 }; // example custom size
    
    // Brick volume with 10mm mortar
    const brickVolumeWithMortar = 
      (brickSize.length + 0.01) * (brickSize.width + 0.01) * (brickSize.height + 0.01);
    
    const numberOfBricks = Math.ceil(wallVolume / brickVolumeWithMortar * (1 + data.wastage / 100));
    
    // Mortar calculations
    const [cementPart, sandPart] = data.mortarRatio.split(':').map(Number);
    const totalParts = cementPart + sandPart;
    
    // Assume 30% of wall volume is mortar
    const mortarVolume = wallVolume * 0.3;
    
    // Cement in cubic meters (1 cubic meter of cement = 1440 kg)
    const cementVolume = mortarVolume * (cementPart / totalParts);
    const cementKg = cementVolume * 1440;
    const cementBags = Math.ceil(cementKg / 50); // 50kg per bag
    
    // Sand in cubic meters
    const sandVolume = mortarVolume * (sandPart / totalParts);
    
    return {
      numberOfBricks,
      cementKg,
      cementBags,
      sandVolume,
      wallVolume,
      unitSystem: data.unitSystem
    };
  };

  const materials = calculateMaterials(results);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl border border-gray-100 mt-8 w-full max-w-3xl mx-auto"
    >
      <motion.h2 
        className="text-2xl font-bold text-gray-800 mb-6 text-center"
        variants={item}
      >
        Construction Materials Calculation
      </motion.h2>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-200"
          variants={item}
          whileHover={{ y: -5, boxShadow: "0 10px 20px -5px rgba(0,0,0,0.1)" }}
        >
          <p className="text-gray-600 mb-1">Number of Bricks</p>
          <p className="text-2xl font-bold text-blue-600">
            {materials.numberOfBricks.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">including {results.wastage}% wastage</p>
        </motion.div>
        
        <motion.div 
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-200"
          variants={item}
          whileHover={{ y: -5, boxShadow: "0 10px 20px -5px rgba(0,0,0,0.1)" }}
        >
          <p className="text-gray-600 mb-1">Cement Required</p>
          <p className="text-2xl font-bold text-blue-600">
            {materials.cementKg.toFixed(0)} kg
          </p>
          <p className="text-sm text-gray-500 mt-1">{materials.cementBags} standard bags (50kg each)</p>
        </motion.div>
        
        <motion.div 
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-200"
          variants={item}
          whileHover={{ y: -5, boxShadow: "0 10px 20px -5px rgba(0,0,0,0.1)" }}
        >
          <p className="text-gray-600 mb-1">Sand Required</p>
          <p className="text-2xl font-bold text-blue-600">
            {materials.sandVolume.toFixed(2)} m³
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {(materials.sandVolume * 35.3147).toFixed(1)} ft³
          </p>
        </motion.div>
        
        <motion.div 
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-200"
          variants={item}
          whileHover={{ y: -5, boxShadow: "0 10px 20px -5px rgba(0,0,0,0.1)" }}
        >
          <p className="text-gray-600 mb-1">Wall Volume</p>
          <p className="text-2xl font-bold text-blue-600">
            {materials.wallVolume.toFixed(2)} m³
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {(materials.wallVolume * 35.3147).toFixed(1)} ft³
          </p>
        </motion.div>
      </motion.div>

      <motion.div 
        className="mt-8 pt-6 border-t border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-sm text-gray-500 text-center">
          Calculations based on {results.mortarRatio} mortar ratio and {results.brickSize} bricks
        </p>
      </motion.div>
    </motion.div>
  );
};

export default BrickResults;