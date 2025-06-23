import { useState } from 'react';
import ConverterForm from '../UnitConverter/ConverterForm';
import ConverterResults from '../UnitConverter/ConverterResults';

const UnitConverter = () => {
  const [conversion, setConversion] = useState(null);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Unit Converter</h1>
      <ConverterForm onConvert={setConversion} />
      {conversion && <ConverterResults conversion={conversion} />}
    </div>
  );
};

export default UnitConverter;