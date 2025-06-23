import { useState } from 'react';
import StrengthOfMaterialsForm from '../Strength/StrengthFrom';
import StrengthOfMaterialsResults from '../Strength/StrengthResults';

const StrengthCalculator = () => {
  const [results, setResults] = useState(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Strength of Materials Calculator</h1>
      <div className="max-w-4xl mx-auto">
        <StrengthOfMaterialsForm onCalculate={setResults} />
        {results && <StrengthOfMaterialsResults results={results} />}
      </div>
    </div>
  );
};

export default StrengthCalculator;