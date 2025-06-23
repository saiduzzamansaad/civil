const SteelResults = ({ results }) => {
    if (!results) return null;
  
    const calculateWeight = (data) => {
      let length = data.length;
      let diameter = data.diameter;
      
      if (data.unitSystem === 'imperial') {
        length = length * 0.3048; // feet to meters
        diameter = diameter * 25.4; // inches to mm
      }
  
      let weightPerUnit = 0;
      switch(data.steelType) {
        case 'round':
          weightPerUnit = (Math.pow(diameter, 2) / 162 * length);
          break;
        case 'square':
          weightPerUnit = (Math.pow(diameter, 2) / 162 * length) * 1.1;
          break;
        case 'flat':
          // Assuming thickness is 10mm for flat bars
          weightPerUnit = (diameter * 10 * 0.00785) * length;
          break;
        case 'hex':
          weightPerUnit = (Math.pow(diameter, 2) / 162 * length) * 1.1;
          break;
        default:
          weightPerUnit = (Math.pow(diameter, 2) / 162 * length);
      }
  
      const totalWeight = weightPerUnit * data.quantity;
  
      return {
        weightPerUnit,
        totalWeight,
        unitSystem: data.unitSystem
      };
    };
  
    const weight = calculateWeight(results);
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Steel Weight Results</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <p className="text-gray-700">Weight per {results.unitSystem === 'metric' ? 'meter' : 'foot'}:</p>
            <p className="text-lg font-semibold">
              {weight.weightPerUnit.toFixed(2)} {results.unitSystem === 'metric' ? 'kg/m' : 'lb/ft'}
            </p>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-700">Total Weight:</p>
            <p className="text-lg font-semibold">
              {weight.totalWeight.toFixed(2)} {results.unitSystem === 'metric' ? 'kg' : 'lb'}
            </p>
          </div>
        </div>
  
        <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded">
          <p className="font-semibold">Steel Type: {getSteelTypeName(results.steelType)}</p>
          <p className="text-sm">Size: {results.diameter}{results.unitSystem === 'metric' ? 'mm' : 'in'}</p>
          <p className="text-sm">Quantity: {results.quantity} nos</p>
        </div>
      </div>
    );
  };
  
  const getSteelTypeName = (type) => {
    const names = {
      round: 'Round Bar',
      square: 'Square Bar',
      flat: 'Flat Bar',
      hex: 'Hexagonal Bar'
    };
    return names[type] || 'Steel Bar';
  };
  
  export default SteelResults;