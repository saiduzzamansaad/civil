import { useState } from 'react';

const BBSForm = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    elementType: 'beam',
    barShape: 'straight',
    barDiameter: 12,
    length: 0,
    breadth: 0,
    cover: 25,
    bendAngle: 90,
    numberOfBars: 1,
    wastage: 5,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'barDiameter' || name === 'length' || name === 'breadth' || 
               name === 'cover' || name === 'bendAngle' || name === 'numberOfBars' || 
               name === 'wastage' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Bar Bending Schedule Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Element Type</label>
          <select 
            name="elementType" 
            value={formData.elementType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="beam">Beam</option>
            <option value="column">Column</option>
            <option value="slab">Slab</option>
            <option value="footing">Footing</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Bar Shape</label>
          <select 
            name="barShape" 
            value={formData.barShape}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="straight">Straight</option>
            <option value="crank">Crank</option>
            <option value="l-shape">L-Shape</option>
            <option value="u-shape">U-Shape</option>
            <option value="spiral">Spiral</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Bar Diameter (mm)</label>
          <select 
            name="barDiameter" 
            value={formData.barDiameter}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="8">8mm</option>
            <option value="10">10mm</option>
            <option value="12">12mm</option>
            <option value="16">16mm</option>
            <option value="20">20mm</option>
            <option value="25">25mm</option>
            <option value="32">32mm</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Length (mm)</label>
          <input 
            type="number" 
            name="length" 
            value={formData.length}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Breadth (mm)</label>
          <input 
            type="number" 
            name="breadth" 
            value={formData.breadth}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Cover (mm)</label>
          <input 
            type="number" 
            name="cover" 
            value={formData.cover}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Bend Angle (degrees)</label>
          <input 
            type="number" 
            name="bendAngle" 
            value={formData.bendAngle}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Number of Bars</label>
          <input 
            type="number" 
            name="numberOfBars" 
            value={formData.numberOfBars}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
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

export default BBSForm;