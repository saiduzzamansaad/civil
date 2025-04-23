import { useState } from 'react';
import BrickForm from '../BrickCalculator/BrickForm';
import BrickResults from '../BrickCalculator/BrickResults';

const BrickCalculator = () => {
  const [results, setResults] = useState(null);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Brick & Mortar Calculator</h1>
      <BrickForm onCalculate={setResults} />
      {results && <BrickResults results={results} />}
    </div>
  );
};

export default BrickCalculator;