import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FluidMechanicsForm from '../Fluid/FluidFrom';
import FluidMechanicsResults from '../Fluid/FluidResults';
import FluidMechanicsTable from '../Fluid/FluidTable';

const FluidCalculator = () => {
  const [results, setResults] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto px-4 py-6 sm:px-6 sm:py-8"
    >
      <motion.h1 
        className="text-2xl sm:text-3xl font-bold mb-6 text-center"
        initial={{ y: -10 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
          Fluid Mechanics Calculator
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <FluidMechanicsForm onCalculate={setResults} />
      </motion.div>

      <AnimatePresence>
        {results && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              <FluidMechanicsResults results={results} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="mt-6 overflow-x-auto"
            >
              <FluidMechanicsTable results={results} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Decorative animated element */}
      <motion.div 
        className="mt-10 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
      />
    </motion.div>
  );
};

export default FluidCalculator;