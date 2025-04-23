const BrickResults = ({ results }) => {
    if (!results) return null;
  
    const calculateMaterials = (data) => {
      // Convert to metric if imperial
      let length = data.wallLength;
      let height = data.wallHeight;
      let thickness = data.wallThickness;
      
      if (data.unitSystem === 'imperial') {
        length = length * 0.3048; // feet to meters
        height = height * 0.3048;
        thickness = thickness * 0.3048;
      }
  
      // Wall volume in cubic meters
      const wallVolume = length * height * thickness;
      
      // Brick calculations
      const brickSize = data.brickSize === 'standard' ? 
        { length: 0.19, width: 0.09, height: 0.09 } : 
        { length: 0.23, width: 0.11, height: 0.075 }; // example custom size
      
      // Brick volume with 10mm mortar
      const brickVolumeWithMortar = 
        (brickSize.length + 0.01) * (brickSize.width + 0.01) * (brickSize.height + 0.01);
      
      const numberOfBricks = Math.ceil(wallVolume / brickVolumeWithMortar * (1 + data.wastage / 100));
      
      // Mortar calculations
      const [cementPart, sandPart] = data.mortarRatio.split(':').map(Number);
      const totalParts = cementPart + sandPart;
      
      // Assume 30% of wall volume is mortar
      const mortarVolume = wallVolume * 0.3;
      
      // Cement in cubic meters (1 cubic meter of cement = 1440 kg)
      const cementVolume = mortarVolume * (cementPart / totalParts);
      const cementKg = cementVolume * 1440;
      const cementBags = Math.ceil(cementKg / 50); // 50kg per bag
      
      // Sand in cubic meters
      const sandVolume = mortarVolume * (sandPart / totalParts);
      
      return {
        numberOfBricks,
        cementKg,
        cementBags,
        sandVolume,
        wallVolume,
        unitSystem: data.unitSystem
      };
    };
  
    const materials = calculateMaterials(results);
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Results</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <p className="text-gray-700">Number of Bricks:</p>
            <p className="text-lg font-semibold">{materials.numberOfBricks}</p>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-700">Cement Required:</p>
            <p className="text-lg font-semibold">{materials.cementKg.toFixed(2)} kg ({materials.cementBags} bags)</p>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-700">Sand Required:</p>
            <p className="text-lg font-semibold">
              {materials.sandVolume.toFixed(3)} m³ (
              {(materials.sandVolume * 35.3147).toFixed(2)} ft³)
            </p>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-700">Wall Volume:</p>
            <p className="text-lg font-semibold">
              {materials.wallVolume.toFixed(3)} m³ (
              {(materials.wallVolume * 35.3147).toFixed(2)} ft³)
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default BrickResults;