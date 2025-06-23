import { useState } from 'react';

const unitCategories = {
  length: [
    { name: 'Meter', value: 'm', toMeter: 1 },
    { name: 'Centimeter', value: 'cm', toMeter: 0.01 },
    { name: 'Millimeter', value: 'mm', toMeter: 0.001 },
    { name: 'Kilometer', value: 'km', toMeter: 1000 },
    { name: 'Inch', value: 'in', toMeter: 0.0254 },
    { name: 'Foot', value: 'ft', toMeter: 0.3048 },
    { name: 'Yard', value: 'yd', toMeter: 0.9144 },
    { name: 'Mile', value: 'mi', toMeter: 1609.34 },
  ],
  area: [
    { name: 'Square Meter', value: 'm²', toSqMeter: 1 },
    { name: 'Square Centimeter', value: 'cm²', toSqMeter: 0.0001 },
    { name: 'Square Millimeter', value: 'mm²', toSqMeter: 0.000001 },
    { name: 'Square Kilometer', value: 'km²', toSqMeter: 1000000 },
    { name: 'Square Inch', value: 'in²', toSqMeter: 0.00064516 },
    { name: 'Square Foot', value: 'ft²', toSqMeter: 0.092903 },
    { name: 'Square Yard', value: 'yd²', toSqMeter: 0.836127 },
    { name: 'Acre', value: 'ac', toSqMeter: 4046.86 },
    { name: 'Hectare', value: 'ha', toSqMeter: 10000 },
  ],
  volume: [
    { name: 'Cubic Meter', value: 'm³', toCubicMeter: 1 },
    { name: 'Cubic Centimeter', value: 'cm³', toCubicMeter: 0.000001 },
    { name: 'Cubic Millimeter', value: 'mm³', toCubicMeter: 0.000000001 },
    { name: 'Liter', value: 'L', toCubicMeter: 0.001 },
    { name: 'Milliliter', value: 'mL', toCubicMeter: 0.000001 },
    { name: 'Cubic Foot', value: 'ft³', toCubicMeter: 0.0283168 },
    { name: 'Cubic Inch', value: 'in³', toCubicMeter: 0.0000163871 },
    { name: 'Gallon (US)', value: 'gal', toCubicMeter: 0.00378541 },
    { name: 'Gallon (UK)', value: 'gal UK', toCubicMeter: 0.00454609 },
  ],
  weight: [
    { name: 'Kilogram', value: 'kg', toKg: 1 },
    { name: 'Gram', value: 'g', toKg: 0.001 },
    { name: 'Milligram', value: 'mg', toKg: 0.000001 },
    { name: 'Metric Ton', value: 't', toKg: 1000 },
    { name: 'Pound', value: 'lb', toKg: 0.453592 },
    { name: 'Ounce', value: 'oz', toKg: 0.0283495 },
  ],
};

const ConverterForm = ({ onConvert }) => {
  const [formData, setFormData] = useState({
    category: 'length',
    fromUnit: 'm',
    toUnit: 'ft',
    value: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConvert(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Unit Converter</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Category</label>
          <select 
            name="category" 
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="length">Length</option>
            <option value="area">Area</option>
            <option value="volume">Volume</option>
            <option value="weight">Weight</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">From Unit</label>
          <select 
            name="fromUnit" 
            value={formData.fromUnit}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            {unitCategories[formData.category].map(unit => (
              <option key={unit.value} value={unit.value}>{unit.name} ({unit.value})</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">To Unit</label>
          <select 
            name="toUnit" 
            value={formData.toUnit}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            {unitCategories[formData.category].map(unit => (
              <option key={unit.value} value={unit.value}>{unit.name} ({unit.value})</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Value</label>
          <input 
            type="number" 
            name="value" 
            value={formData.value}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      </div>

      <button 
        type="submit" 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Convert
      </button>
    </form>
  );
};

export default ConverterForm;