import { useState } from 'react';

const BrickForm = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    wallLength: 0,
    wallHeight: 0,
    wallThickness: 0.23, // Default to 9 inches in meters
    mortarRatio: '1:6',
    brickSize: 'standard',
    wastage: 5,
    unitSystem: 'metric',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'wallLength' || name === 'wallHeight' || name === 'wallThickness' || 
               name === 'wastage' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Brick & Mortar Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Unit System</label>
          <select 
            name="unitSystem" 
            value={formData.unitSystem}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="metric">Metric (meters)</option>
            <option value="imperial">Imperial (feet)</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Wall Length ({formData.unitSystem === 'metric' ? 'meters' : 'feet'})
          </label>
          <input 
            type="number" 
            name="wallLength" 
            value={formData.wallLength}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Wall Height ({formData.unitSystem === 'metric' ? 'meters' : 'feet'})
          </label>
          <input 
            type="number" 
            name="wallHeight" 
            value={formData.wallHeight}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Wall Thickness ({formData.unitSystem === 'metric' ? 'meters' : 'feet'})
          </label>
          <input 
            type="number" 
            name="wallThickness" 
            value={formData.wallThickness}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Mortar Ratio</label>
          <select 
            name="mortarRatio" 
            value={formData.mortarRatio}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="1:3">1:3</option>
            <option value="1:4">1:4</option>
            <option value="1:5">1:5</option>
            <option value="1:6">1:6</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Brick Size</label>
          <select 
            name="brickSize" 
            value={formData.brickSize}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="standard">Standard (190×90×90 mm)</option>
            <option value="custom">Custom Size</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Wastage (%)</label>
          <input 
            type="number" 
            name="wastage" 
            value={formData.wastage}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      </div>

      <button 
        type="submit" 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Calculate
      </button>
    </form>
  );
};

export default BrickForm;