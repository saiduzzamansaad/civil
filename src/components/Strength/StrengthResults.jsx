const StrengthOfMaterialsResults = ({ results }) => {
      if (!results) return null;
    
      const calculateResults = (data) => {
        let force = data.force;
        let area = data.area;
        let originalLength = data.originalLength;
        let changeInLength = data.changeInLength;
        // Removed unused variable 'modulus'
        let momentOfInertia = data.momentOfInertia;
        let distance = data.distance;
    
        // Convert units if necessary (simplified conversion)
        if (data.unitSystem === 'imperial') {
          // For imperial to metric conversions
          force = force * 4.44822; // lb to N
          area = area * 645.16; // in² to mm²
          originalLength = originalLength * 25.4; // in to mm
          changeInLength = changeInLength * 25.4; // in to mm
          // modulus conversion removed as it is unused
          momentOfInertia = momentOfInertia * 416231.426; // in⁴ to mm⁴
          distance = distance * 25.4; // in to mm
        }
    
        let stress, strain, elasticModulus, bendingStress;
        
        switch(data.calculationType) {
          case 'stress':
            stress = force / area; // MPa (N/mm²)
            return { result: stress, unit: 'MPa', label: 'Stress' };
          
          case 'strain':
            strain = changeInLength / originalLength;
            return { result: strain, unit: '', label: 'Strain' };
          
          case 'modulus':
            stress = force / area;
            strain = changeInLength / originalLength;
            elasticModulus = stress / strain;
            return { result: elasticModulus, unit: 'GPa', label: 'Modulus of Elasticity' };
          
          case 'bending':
            bendingStress = (force * distance) / momentOfInertia;
            return { result: bendingStress, unit: 'MPa', label: 'Bending Stress' };
          
          default:
            return null;
        }
      };
    
      const resultsData = calculateResults(results);
      const imperialResults = results.unitSystem === 'imperial';
    
      if (!resultsData) return null;
    
      return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold mb-4">Calculation Results</h2>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="mb-4">
              <p className="text-gray-700">{resultsData.label}:</p>
              <p className="text-lg font-semibold">
                {resultsData.result.toFixed(6)} {resultsData.unit}
                {imperialResults && (
                  <span className="text-sm text-gray-500 ml-2">
                    (Converted from imperial units)
                  </span>
                )}
              </p>
            </div>
    
            {results.calculationType === 'stress' && (
              <div className="mb-4">
                <p className="text-gray-700">Input Parameters:</p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Force: {results.force} {imperialResults ? 'lb' : 'N'}</li>
                  <li>Area: {results.area} {imperialResults ? 'in²' : 'mm²'}</li>
                </ul>
              </div>
            )}
    
            {results.calculationType === 'strain' && (
              <div className="mb-4">
                <p className="text-gray-700">Input Parameters:</p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Original Length: {results.originalLength} {imperialResults ? 'in' : 'mm'}</li>
                  <li>Change in Length: {results.changeInLength} {imperialResults ? 'in' : 'mm'}</li>
                </ul>
              </div>
            )}
    
            {results.calculationType === 'modulus' && (
              <div className="mb-4">
                <p className="text-gray-700">Input Parameters:</p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Force: {results.force} {imperialResults ? 'lb' : 'N'}</li>
                  <li>Area: {results.area} {imperialResults ? 'in²' : 'mm²'}</li>
                  <li>Original Length: {results.originalLength} {imperialResults ? 'in' : 'mm'}</li>
                  <li>Change in Length: {results.changeInLength} {imperialResults ? 'in' : 'mm'}</li>
                </ul>
              </div>
            )}
    
            {results.calculationType === 'bending' && (
              <div className="mb-4">
                <p className="text-gray-700">Input Parameters:</p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Force: {results.force} {imperialResults ? 'lb' : 'N'}</li>
                  <li>Moment of Inertia: {results.momentOfInertia} {imperialResults ? 'in⁴' : 'mm⁴'}</li>
                  <li>Distance: {results.distance} {imperialResults ? 'in' : 'mm'}</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      );
    };
    
    export default StrengthOfMaterialsResults;