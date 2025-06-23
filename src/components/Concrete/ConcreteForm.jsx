import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';


const ConcreteForm = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    elementType: 'slab',
    length: 0,
    width: 0,
    thickness: 0.15,
    grade: 'M20',
    wastage: 5,
    unitSystem: 'metric'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'length' || name === 'width' || name === 'thickness' || 
               name === 'wastage' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Concrete Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Element Type"
          name="elementType"
          value={formData.elementType}
          onChange={handleChange}
          options={[
            { value: 'slab', label: 'Slab' },
            { value: 'beam', label: 'Beam' },
            { value: 'column', label: 'Column' },
            { value: 'footing', label: 'Footing' }
          ]}
        />

        <Select
          label="Concrete Grade"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          options={[
            { value: 'M10', label: 'M10' },
            { value: 'M15', label: 'M15' },
            { value: 'M20', label: 'M20' },
            { value: 'M25', label: 'M25' },
            { value: 'M30', label: 'M30' }
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
          label={`Width (${formData.unitSystem === 'metric' ? 'm' : 'ft'})`}
          name="width"
          type="number"
          value={formData.width}
          onChange={handleChange}
          step="0.01"
          min="0"
        />

        <Input
          label={`Thickness (${formData.unitSystem === 'metric' ? 'm' : 'ft'})`}
          name="thickness"
          type="number"
          value={formData.thickness}
          onChange={handleChange}
          step="0.01"
          min="0"
        />

        <Input
          label="Wastage (%)"
          name="wastage"
          type="number"
          value={formData.wastage}
          onChange={handleChange}
          step="1"
          min="0"
          max="20"
        />

        <Select
          label="Unit System"
          name="unitSystem"
          value={formData.unitSystem}
          onChange={handleChange}
          options={[
            { value: 'metric', label: 'Metric (m, kg)' },
            { value: 'imperial', label: 'Imperial (ft, lb)' }
          ]}
        />
      </div>

      <div className="mt-4">
        <Button type="submit" variant="primary">
          Calculate
        </Button>
      </div>
    </form>
  );
};

export default ConcreteForm;