import { useState } from 'react';
import SurveyingForm from '../Surveying/SurveyingFrom';
import SurveyingResults from '../Surveying/SurveyingResults';

const SurveyingCalculator = () => {
  const [results, setResults] = useState(null);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Load Calculator</h1>
      <SurveyingForm onCalculate={setResults} />
      {results && <SurveyingResults results={results} />}
    </div>
  );
};

export default SurveyingCalculator;