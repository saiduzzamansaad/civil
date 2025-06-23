import { motion } from 'framer-motion';

const DesignOfStructuresResults = ({ results }) => {
  if (!results) return null;

  const calculateResults = (data) => {
    // Convert to metric if imperial
    let loadValue = data.loadValue;
    let spanLength = data.spanLength;
    let width = data.width;
    let depth = data.depth;
    
    if (data.unitSystem === 'imperial') {
      loadValue = loadValue * 4.44822; // kips to kN
      spanLength = spanLength * 0.3048; // ft to m
      width = width * 25.4; // in to mm
      depth = depth * 25.4; // in to mm
    }

    // Simplified structural calculations (example)
    let bendingMoment, shearForce, deflection, safetyMargin;
    
    switch(data.supportType) {
      case 'simplySupported':
        bendingMoment = (data.loadType === 'uniform' ? 
          loadValue * Math.pow(spanLength, 2) / 8 : 
          loadValue * spanLength / 4);
        break;
      case 'fixed':
        bendingMoment = (data.loadType === 'uniform' ? 
          loadValue * Math.pow(spanLength, 2) / 12 : 
          loadValue * spanLength / 8);
        break;
      case 'cantilever':
        bendingMoment = (data.loadType === 'uniform' ? 
          loadValue * Math.pow(spanLength, 2) / 2 : 
          loadValue * spanLength);
        break;
      default:
        bendingMoment = 0;
    }

    // Section modulus calculation (rectangular section)
    const sectionModulus = (width * Math.pow(depth, 2)) / 6;
    const maxStress = bendingMoment * 1000 / sectionModulus; // MPa
    
    // Material properties (simplified)
    const materialStrength = {
      concrete: 30,
      steel: 250,
      timber: 20,
      composite: 150
    }[data.material];
    
    safetyMargin = materialStrength / maxStress;

    return {
      bendingMoment: bendingMoment,
      maxStress: maxStress,
      safetyMargin: safetyMargin,
      sectionModulus: sectionModulus,
      inputParams: {
        loadValue: data.loadValue,
        spanLength: data.spanLength,
        width: data.width,
        depth: data.depth,
        unitSystem: data.unitSystem,
        loadType: data.loadType,
        supportType: data.supportType,
        material: data.material
      }
    };
  };

  const resultData = calculateResults(results);

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

  const getUnit = (field) => {
    if (results.unitSystem === 'metric') {
      switch(field) {
        case 'moment': return 'kN·m';
        case 'stress': return 'MPa';
        case 'length': return 'm';
        case 'dimension': return 'mm';
        default: return '';
      }
    } else {
      switch(field) {
        case 'moment': return 'kip·ft';
        case 'stress': return 'ksi';
        case 'length': return 'ft';
        case 'dimension': return 'in';
        default: return '';
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-xl border border-gray-200 mt-8 w-full max-w-3xl mx-auto"
    >
      <motion.h2 
        className="text-2xl font-bold text-gray-800 mb-6 text-center"
        variants={item}
      >
        Structural Analysis Results
      </motion.h2>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Main Results */}
        <motion.div 
          className="bg-white p-5 rounded-xl shadow-sm border border-blue-200 col-span-2"
          variants={highlightItem}
          whileHover={{ scale: 1.01, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-600 mb-1">Bending Moment</p>
              <p className="text-2xl font-bold text-blue-600">
                {resultData.bendingMoment.toFixed(2)} {getUnit('moment')}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Maximum Stress</p>
              <p className="text-2xl font-bold text-blue-600">
                {resultData.maxStress.toFixed(2)} {getUnit('stress')}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Safety Margin</p>
              <p className={`text-2xl font-bold ${
                resultData.safetyMargin > results.safetyFactor ? 'text-green-600' : 'text-red-600'
              }`}>
                {resultData.safetyMargin.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                (Required: {results.safetyFactor})
              </p>
            </div>
          </div>
        </motion.div>

        {/* Input Parameters */}
        <motion.div 
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-200"
          variants={item}
          whileHover={{ y: -3 }}
        >
          <h3 className="font-medium text-gray-700 mb-3">Load Parameters</h3>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-500">Load Type</p>
              <p className="font-medium capitalize">{results.loadType} Load</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Load Value</p>
              <p className="font-medium">
                {results.loadValue} {getUnit('moment').split('·')[0]}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Span Length</p>
              <p className="font-medium">
                {results.spanLength} {getUnit('length')}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-200"
          variants={item}
          whileHover={{ y: -3 }}
        >
          <h3 className="font-medium text-gray-700 mb-3">Section Properties</h3>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-500">Material</p>
              <p className="font-medium capitalize">{results.material}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Section Type</p>
              <p className="font-medium capitalize">{results.sectionType}</p>
            </div>
            {results.sectionType === 'rectangular' && (
              <>
                <div>
                  <p className="text-sm text-gray-500">Width</p>
                  <p className="font-medium">
                    {results.width} {getUnit('dimension')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Depth</p>
                  <p className="font-medium">
                    {results.depth} {getUnit('dimension')}
                  </p>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Additional Calculations */}
        <motion.div 
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 md:col-span-2"
          variants={item}
          whileHover={{ y: -3 }}
        >
          <h3 className="font-medium text-gray-700 mb-3">Additional Results</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Section Modulus</p>
              <p className="font-medium">
                {resultData.sectionModulus.toExponential(2)} mm³
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Support Type</p>
              <p className="font-medium capitalize">
                {results.supportType.replace(/([A-Z])/g, ' $1').trim()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Unit System</p>
              <p className="font-medium">
                {results.unitSystem === 'metric' ? 'Metric' : 'Imperial'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Analysis Type</p>
              <p className="font-medium">Elastic</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Status Indicator */}
      <motion.div 
        className="mt-6 pt-6 border-t border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className={`flex items-center justify-center p-3 rounded-lg ${
          resultData.safetyMargin > results.safetyFactor ? 
            'bg-green-100 text-green-800' : 
            'bg-red-100 text-red-800'
        }`}>
          <p className="font-medium">
            {resultData.safetyMargin > results.safetyFactor ? 
              '✓ Structure meets safety requirements' : 
              '✗ Structure fails safety requirements'}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DesignOfStructuresResults;