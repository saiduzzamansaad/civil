import { useState } from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

const SteelForm = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    steelType: 'round',
    diameter: 12,
    length: 1,
    quantity: 1,
    unitSystem: 'metric'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'diameter' || name === 'length' || name === 'quantity' ? 
              parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Steel Weight Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Steel Type"
          name="steelType"
          value={formData.steelType}
          onChange={handleChange}
          options={[
            { value: 'round', label: 'Round Bar' },
            { value: 'square', label: 'Square Bar' },
            { value: 'flat', label: 'Flat Bar' },
            { value: 'hex', label: 'Hex Bar' }
          ]}
        />

        <Select
          label="Diameter/Size (mm)"
          name="diameter"
          value={formData.diameter}
          onChange={handleChange}
          options={[
            { value: 8, label: '8mm' },
            { value: 10, label: '10mm' },
            { value: 12, label: '12mm' },
            { value: 16, label: '16mm' },
            { value: 20, label: '20mm' },
            { value: 25, label: '25mm' },
            { value: 32, label: '32mm' }
          ]}
        />

        <Input
          label={`Length (${formData.unitSystem === 'metric' ? 'm' : 'ft'})`}
          name="length"
          type="number"
          value={formData.length}
          onChange={handleChange}
          step="0.01"
          min="0"
        />

        <Input
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
        />

        <Select
          label="Unit System"
          name="unitSystem"
          value={formData.unitSystem}
          onChange={handleChange}
          options={[
            { value: 'metric', label: 'Metric (mm, m, kg)' },
            { value: 'imperial', label: 'Imperial (in, ft, lb)' }
          ]}
        />
      </div>

      <div className="mt-4">
        <Button type="submit" variant="primary">
          Calculate Weight
        </Button>
      </div>
    </form>
  );
};

export default SteelForm;