import { useState } from 'react';

const StrengthOfMaterialsForm = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    force: 0,
    area: 0,
    originalLength: 0,
    changeInLength: 0,
    modulus: 0,
    momentOfInertia: 0,
    distance: 0,
    calculationType: 'stress',
    unitSystem: 'metric'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'force' || name === 'area' || name === 'originalLength' || 
              name === 'changeInLength' || name === 'modulus' || name === 'momentOfInertia' || 
              name === 'distance' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(formData);
  };

  const getUnit = (quantity) => {
    if (formData.unitSystem === 'metric') {
      switch(quantity) {
        case 'force': return 'N';
        case 'area': return 'mm²';
        case 'length': return 'mm';
        case 'stress': return 'MPa';
        case 'modulus': return 'GPa';
        case 'moment': return 'mm⁴';
        default: return '';
      }
    } else {
      switch(quantity) {
        case 'force': return 'lb';
        case 'area': return 'in²';
        case 'length': return 'in';
        case 'stress': return 'psi';
        case 'modulus': return 'psi';
        case 'moment': return 'in⁴';
        default: return '';
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Strength of Materials Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Unit System</label>
          <select 
            name="unitSystem" 
            value={formData.unitSystem}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="metric">Metric (mm, N, MPa)</option>
            <option value="imperial">Imperial (in, lb, psi)</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Calculation Type</label>
          <select 
            name="calculationType" 
            value={formData.calculationType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="stress">Stress (σ = F/A)</option>
            <option value="strain">Strain (ε = ΔL/L)</option>
            <option value="modulus">Modulus of Elasticity (E = σ/ε)</option>
            <option value="bending">Bending Stress (σ = My/I)</option>
          </select>
        </div>

        {formData.calculationType === 'stress' || formData.calculationType === 'modulus' || formData.calculationType === 'bending' ? (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Force ({getUnit('force')})
            </label>
            <input 
              type="number" 
              name="force" 
              value={formData.force}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        ) : null}

        {formData.calculationType === 'stress' || formData.calculationType === 'modulus' || formData.calculationType === 'bending' ? (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Cross-sectional Area ({getUnit('area')})
            </label>
            <input 
              type="number" 
              name="area" 
              value={formData.area}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        ) : null}

        {formData.calculationType === 'strain' || formData.calculationType === 'modulus' ? (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Original Length ({getUnit('length')})
            </label>
            <input 
              type="number" 
              name="originalLength" 
              value={formData.originalLength}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        ) : null}

        {formData.calculationType === 'strain' || formData.calculationType === 'modulus' ? (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Change in Length ({getUnit('length')})
            </label>
            <input 
              type="number" 
              name="changeInLength" 
              value={formData.changeInLength}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        ) : null}

        {formData.calculationType === 'modulus' ? (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Modulus of Elasticity ({getUnit('modulus')})
            </label>
            <input 
              type="number" 
              name="modulus" 
              value={formData.modulus}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        ) : null}

        {formData.calculationType === 'bending' ? (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Moment of Inertia ({getUnit('moment')})
            </label>
            <input 
              type="number" 
              name="momentOfInertia" 
              value={formData.momentOfInertia}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        ) : null}

        {formData.calculationType === 'bending' ? (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Distance from Neutral Axis ({getUnit('length')})
            </label>
            <input 
              type="number" 
              name="distance" 
              value={formData.distance}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        ) : null}
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

export default StrengthOfMaterialsForm;