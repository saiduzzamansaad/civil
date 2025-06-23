import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BrickForm from '../BrickCalculator/BrickForm';
import BrickResults from '../BrickCalculator/BrickResults';

const BrickCalculator = () => {
  const [results, setResults] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8 text-center"
      >
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-3 text-gray-800"
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Brick & Mortar Calculator
          </span>
        </motion.h1>
        <motion.p 
          className="text-gray-600 md:text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Calculate exact brick and mortar quantities for your construction project
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
      >
        <BrickForm onCalculate={setResults} />
      </motion.div>

      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="mt-6"
          >
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg overflow-hidden border border-gray-200"
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <BrickResults results={results} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative elements */}
      <motion.div
        className="flex justify-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
          animate={{
            scaleX: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default BrickCalculator;