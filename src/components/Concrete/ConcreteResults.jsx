const ConcreteResults = ({ results }) => {
    if (!results) return null;
  
    const calculateMaterials = (data) => {
      // Convert to metric if imperial
      let length = data.length;
      let width = data.width;
      let thickness = data.thickness;
      
      if (data.unitSystem === 'imperial') {
        length = length * 0.3048; // feet to meters
        width = width * 0.3048;
        thickness = thickness * 0.3048;
      }
  
      // Calculate volume
      let volume = 0;
      switch(data.elementType) {
        case 'slab':
          volume = length * width * thickness;
          break;
        case 'beam':
          volume = length * width * thickness;
          break;
        case 'column':
          volume = length * width * thickness;
          break;
        case 'footing':
          volume = length * width * thickness;
          break;
        default:
          volume = length * width * thickness;
      }
  
      // Calculate materials based on grade (kg per m³)
      const gradeMix = {
        M10: { cement: 220, sand: 480, aggregate: 660 },
        M15: { cement: 320, sand: 460, aggregate: 640 },
        M20: { cement: 400, sand: 450, aggregate: 630 },
        M25: { cement: 480, sand: 440, aggregate: 620 },
        M30: { cement: 520, sand: 430, aggregate: 610 }
      };
  
      const mix = gradeMix[data.grade] || gradeMix.M20;
      const cement = (mix.cement * volume) * (1 + data.wastage/100);
      const sand = (mix.sand * volume) * (1 + data.wastage/100);
      const aggregate = (mix.aggregate * volume) * (1 + data.wastage/100);
  
      return {
        volume,
        cement,
        sand,
        aggregate,
        unitSystem: data.unitSystem
      };
    };
  
    const materials = calculateMaterials(results);
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Concrete Calculation Results</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <p className="text-gray-700">Total Volume:</p>
            <p className="text-lg font-semibold">
              {materials.volume.toFixed(3)} m³ (
              {(materials.volume * 35.3147).toFixed(2)} ft³)
            </p>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-700">Cement Required:</p>
            <p className="text-lg font-semibold">
              {materials.cement.toFixed(2)} kg (
              {(materials.cement * 2.20462).toFixed(2)} lb)
            </p>
            <p className="text-sm">
              ≈ {Math.ceil(materials.cement / 50)} bags (50kg each)
            </p>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-700">Sand Required:</p>
            <p className="text-lg font-semibold">
              {materials.sand.toFixed(2)} kg (
              {(materials.sand * 2.20462).toFixed(2)} lb)
            </p>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-700">Aggregate Required:</p>
            <p className="text-lg font-semibold">
              {materials.aggregate.toFixed(2)} kg (
              {(materials.aggregate * 2.20462).toFixed(2)} lb)
            </p>
          </div>
        </div>
  
        <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded">
          <p className="font-semibold">Concrete Grade: {results.grade}</p>
          <p className="text-sm">Mix Ratio: {getMixRatio(results.grade)}</p>
        </div>
      </div>
    );
  };
  
  const getMixRatio = (grade) => {
    const ratios = {
      M10: '1:3:6',
      M15: '1:2:4',
      M20: '1:1.5:3',
      M25: '1:1:2',
      M30: '1:1:1.5'
    };
    return ratios[grade] || '1:1.5:3';
  };
  
  export default ConcreteResults;