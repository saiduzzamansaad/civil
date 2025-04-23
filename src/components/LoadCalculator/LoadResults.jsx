const LoadResults = ({ results }) => {
    if (!results) return null;
  
    const materialDensities = {
      rcc: 25,    // kN/m³
      pcc: 24,    // kN/m³
      brick: 18.8, // kN/m³
      tiling: 22   // kN/m³
    };
  
    const calculateLoads = (data) => {
      // Convert to metric if imperial
      let length = data.length;
      let width = data.width;
      let thickness = data.thickness;
      
      if (data.unitSystem === 'imperial') {
        length = length * 0.3048; // feet to meters
        width = width * 0.3048;
        thickness = thickness * 0.3048;
      }
  
      const density = materialDensities[data.materialType];
      const deadLoad = density * thickness; // kN/m²
      
      let totalDeadLoad, totalLiveLoad;
      
      if (data.elementType === 'slab') {
        const area = length * width;
        totalDeadLoad = deadLoad * area; // kN
        totalLiveLoad = data.liveLoad * area; // kN
      } else { // beam
        totalDeadLoad = deadLoad * width * thickness * length; // kN
        totalLiveLoad = data.liveLoad * width * length; // kN (assuming live load is per meter length)
      }
      
      const totalLoad = totalDeadLoad + totalLiveLoad;
      
      return {
        deadLoad,
        totalDeadLoad,
        liveLoad: data.liveLoad,
        totalLiveLoad,
        totalLoad,
        unitSystem: data.unitSystem,
        elementType: data.elementType
      };
    };
  
    const loads = calculateLoads(results);
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Load Calculation Results</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <p className="text-gray-700">Dead Load per m²:</p>
            <p className="text-lg font-semibold">{loads.deadLoad.toFixed(2)} kN/m²</p>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-700">Live Load:</p>
            <p className="text-lg font-semibold">{loads.liveLoad.toFixed(2)} kN/m²</p>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-700">Total Dead Load:</p>
            <p className="text-lg font-semibold">{loads.totalDeadLoad.toFixed(2)} kN</p>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-700">Total Live Load:</p>
            <p className="text-lg font-semibold">{loads.totalLiveLoad.toFixed(2)} kN</p>
          </div>
          
          <div className="mb-4 md:col-span-2">
            <p className="text-gray-700">Total Load:</p>
            <p className="text-xl font-bold">{loads.totalLoad.toFixed(2)} kN</p>
          </div>
        </div>
        
        {loads.totalLoad > 50 && loads.elementType === 'slab' && (
          <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded">
            <p>Warning: This load exceeds typical residential slab capacity (50 kN).</p>
            <p>Please consult a structural engineer.</p>
          </div>
        )}
      </div>
    );
  };
  
  export default LoadResults;