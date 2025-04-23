import { useState } from 'react';
import SteelForm from '../Steel/SteelForm';
import SteelResults from '../Steel/SteelResults';

const SteelCalculator = () => {
  const [results, setResults] = useState(null);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Steel Weight Calculator</h1>
      <SteelForm onCalculate={setResults} />
      {results && <SteelResults results={results} />}
    </div>
  );
};

export default SteelCalculator;