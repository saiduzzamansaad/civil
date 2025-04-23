import { useState } from 'react';
import LoadForm from '../LoadCalculator/LoadForm';
import LoadResults from '../LoadCalculator/LoadResults';

const LoadCalculator = () => {
  const [results, setResults] = useState(null);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Load Calculator</h1>
      <LoadForm onCalculate={setResults} />
      {results && <LoadResults results={results} />}
    </div>
  );
};

export default LoadCalculator;