import { motion } from 'framer-motion';

const StrengthOfMaterialsResults = ({ results }) => {
  if (!results) return null;

  const calculateResults = (data) => {
    let force = data.force;
    let area = data.area;
    let originalLength = data.originalLength;
    let changeInLength = data.changeInLength;
    let modulus = data.modulus;
    let momentOfInertia = data.momentOfInertia;
    let distance = data.distance;

    // Convert units if necessary
    if (data.unitSystem === 'imperial') {
      force = force * 4.44822; // lb to N
      area = area * 645.16; // in² to mm²
      originalLength = originalLength * 25.4; // in to mm
      changeInLength = changeInLength * 25.4; // in to mm
      modulus = modulus * 0.00689476; // psi to GPa
      momentOfInertia = momentOfInertia * 416231.426; // in⁴ to mm⁴
      distance = distance * 25.4; // in to mm
    }

    let calculatedValue;
    let unit;
    let label;
    
    switch(data.calculationType) {
      case 'stress':
        calculatedValue = force / area; // MPa (N/mm²)
        label = 'Stress (σ)';
        unit = 'MPa';
        break;
      
      case 'strain':
        calculatedValue = changeInLength / originalLength;
        label = 'Strain (ε)';
        unit = '';
        break;
      
      case 'modulus': {
        const stress = force / area;
        const strain = changeInLength / originalLength;
        calculatedValue = stress / strain;
        label = 'Modulus of Elasticity (E)';
        unit = 'GPa';
        break;
      }
      
      case 'bending':
        calculatedValue = (force * distance) / momentOfInertia;
        label = 'Bending Stress (σ)';
        unit = 'MPa';
        break;
      
      default:
        return null;
    }

    return {
      value: calculatedValue,
      unit,
      label,
      inputParams: {
        force: data.force,
        area: data.area,
        originalLength: data.originalLength,
        changeInLength: data.changeInLength,
        momentOfInertia: data.momentOfInertia,
        distance: data.distance,
        unitSystem: data.unitSystem
      }
    };
  };

  const resultData = calculateResults(results);

  if (!resultData) return null;

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    }
  };

  const highlightItem = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
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
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-xl border border-gray-200 mt-8 w-full max-w-3xl mx-auto"
    >
      <motion.h2 
        className="text-2xl font-bold text-gray-800 mb-2 text-center"
        variants={item}
      >
        Strength of Materials Results
      </motion.h2>
      <motion.p 
        className="text-gray-600 mb-8 text-center"
        variants={item}
      >
        {resultData.label} Calculation
      </motion.p>

      <motion.div 
        className="grid grid-cols-1 gap-6"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Main Result Card */}
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-md border border-blue-100"
          variants={highlightItem}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex flex-col items-center">
            <p className="text-gray-600 mb-2">{resultData.label}</p>
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              {resultData.value.toFixed(6)} <span className="text-2xl">{resultData.unit}</span>
            </p>
          </div>
        </motion.div>

        {/* Input Parameters */}
        <motion.div 
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-200"
          variants={item}
        >
          <h3 className="font-medium text-gray-700 mb-3">Input Parameters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.calculationType === 'stress' && (
              <>
                <div>
                  <p className="text-sm text-gray-500">Force</p>
                  <p className="font-medium">
                    {resultData.inputParams.force} {resultData.inputParams.unitSystem === 'metric' ? 'N' : 'lb'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Area</p>
                  <p className="font-medium">
                    {resultData.inputParams.area} {resultData.inputParams.unitSystem === 'metric' ? 'mm²' : 'in²'}
                  </p>
                </div>
              </>
            )}

            {results.calculationType === 'strain' && (
              <>
                <div>
                  <p className="text-sm text-gray-500">Original Length</p>
                  <p className="font-medium">
                    {resultData.inputParams.originalLength} {resultData.inputParams.unitSystem === 'metric' ? 'mm' : 'in'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Change in Length</p>
                  <p className="font-medium">
                    {resultData.inputParams.changeInLength} {resultData.inputParams.unitSystem === 'metric' ? 'mm' : 'in'}
                  </p>
                </div>
              </>
            )}

            {/* Add other calculation type parameters similarly */}
          </div>
        </motion.div>

        {/* Unit System */}
        <motion.div 
          className="bg-white p-4 rounded-lg border border-gray-200"
          variants={item}
        >
          <p className="text-sm text-gray-500">Unit System</p>
          <p className="font-medium">
            {resultData.inputParams.unitSystem === 'metric' ? 'Metric (mm, N, MPa)' : 'Imperial (in, lb, psi)'}
          </p>
        </motion.div>
      </motion.div>

      {/* Decorative animated element */}
      <motion.div 
        className="h-1 mt-8 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: 0.6, duration: 1.5, ease: "easeOut" }}
      />
    </motion.div>
  );
};

export default StrengthOfMaterialsResults;