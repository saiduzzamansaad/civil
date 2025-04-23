const BBSResults = ({ results }) => {
    if (!results) return null;
  
    const calculateCuttingLength = (data) => {
      const { barShape, length, breadth, cover } = data;
      let cuttingLength = 0;
      
      switch(barShape) {
        case 'straight':
          cuttingLength = length - (2 * cover);
          break;
        case 'crank':
          cuttingLength = length - (2 * cover) + (2 * 0.42 * (breadth - (2 * cover)));
          break;
        case 'l-shape':
          cuttingLength = (length - cover) + (breadth - cover) - (1 * (breadth - (2 * cover)));
          break;
        case 'u-shape':
          cuttingLength = (2 * (length - cover)) + (breadth - (2 * cover));
          break;
        case 'spiral':
          // Simplified spiral calculation
          cuttingLength = 1.2 * length; // This would be more complex in reality
          break;
        default:
          cuttingLength = length;
      }
      
      return cuttingLength;
    };
  
    const calculateWeight = (diameter, length) => {
      return (Math.pow(diameter, 2) / 162) * (length / 1000); // Convert mm to meters
    };
  
    const cuttingLength = calculateCuttingLength(results);
    const weightPerBar = calculateWeight(results.barDiameter, cuttingLength);
    const totalWeight = weightPerBar * results.numberOfBars * (1 + results.wastage / 100);
    const totalLength = cuttingLength * results.numberOfBars * (1 + results.wastage / 100);
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Results</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <p className="text-gray-700">Cutting Length per Bar:</p>
            <p className="text-lg font-semibold">{cuttingLength.toFixed(2)} mm</p>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-700">Weight per Bar:</p>
            <p className="text-lg font-semibold">{weightPerBar.toFixed(2)} kg</p>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-700">Total Length (with wastage):</p>
            <p className="text-lg font-semibold">{totalLength.toFixed(2)} mm</p>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-700">Total Weight (with wastage):</p>
            <p className="text-lg font-semibold">{totalWeight.toFixed(2)} kg</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default BBSResults;