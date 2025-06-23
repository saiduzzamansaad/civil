import { useState } from 'react';
import DesignOfStructuresForm from '../DesignOfStructures/DesignFrom';
import DesignOfStructuresResults from '../DesignOfStructures/DesignResults';

const ConcreteCalculator = () => {
  const [results, setResults] = useState(null);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Concrete Calculator</h1>
      <DesignOfStructuresForm onCalculate={setResults} />
      {results && <DesignOfStructuresResults results={results} />}
    </div>
  );
};

export default ConcreteCalculator;