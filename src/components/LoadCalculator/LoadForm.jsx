import { useState } from 'react';

const materialDensities = {
  rcc: 25,    // kN/m³
  pcc: 24,    // kN/m³
  brick: 18.8, // kN/m³
  tiling: 22   // kN/m³
};

const LoadForm = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    elementType: 'slab',
    materialType: 'rcc',
    length: 0,
    width: 0,
    thickness: 0.15, // Default 150mm
    liveLoad: 2, // Default 2 kN/m²
    unitSystem: 'metric',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'length' || name === 'width' || name === 'thickness' || 
               name === 'liveLoad' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Load Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Element Type</label>
          <select 
            name="elementType" 
            value={formData.elementType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="slab">Slab</option>
            <option value="beam">Beam</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Material Type</label>
          <select 
            name="materialType" 
            value={formData.materialType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="rcc">RCC (25 kN/m³)</option>
            <option value="pcc">PCC (24 kN/m³)</option>
            <option value="brick">Brick (18.8 kN/m³)</option>
            <option value="tiling">Tiling (22 kN/m³)</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Length ({formData.unitSystem === 'metric' ? 'meters' : 'feet'})
          </label>
          <input 
            type="number" 
            name="length" 
            value={formData.length}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Width ({formData.unitSystem === 'metric' ? 'meters' : 'feet'})
          </label>
          <input 
            type="number" 
            name="width" 
            value={formData.width}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Thickness ({formData.unitSystem === 'metric' ? 'meters' : 'feet'})
          </label>
          <input 
            type="number" 
            name="thickness" 
            value={formData.thickness}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Live Load (kN/m²)
          </label>
          <input 
            type="number" 
            name="liveLoad" 
            value={formData.liveLoad}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Unit System</label>
          <select 
            name="unitSystem" 
            value={formData.unitSystem}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="metric">Metric (kN, m)</option>
            <option value="imperial">Imperial (lb, ft)</option>
          </select>
        </div>
      </div>

      <button 
        type="submit" 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Calculate Load
      </button>
    </form>
  );
};

export default LoadForm;