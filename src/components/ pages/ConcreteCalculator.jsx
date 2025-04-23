import { useState } from 'react';
import ConcreteForm from '../Concrete/ConcreteForm';
import ConcreteResults from '../Concrete/ConcreteResults';

const ConcreteCalculator = () => {
  const [results, setResults] = useState(null);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Concrete Calculator</h1>
      <ConcreteForm onCalculate={setResults} />
      {results && <ConcreteResults results={results} />}
    </div>
  );
};

export default ConcreteCalculator;