import { useState } from 'react';
import BBSForm from '../BBSCalculator/BBSForm';
import BBSResults from '../BBSCalculator/ BBSResults';
import BBSTable from '../BBSCalculator/BBSTable';

const BBSCalculator = () => {
  const [results, setResults] = useState(null);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Bar Bending Schedule Calculator</h1>
      <BBSForm onCalculate={setResults} />
      {results && (
        <>
          <BBSResults results={results} />
          <BBSTable results={results} />
        </>
      )}
    </div>
  );
};

export default BBSCalculator;