const ConverterResults = ({ conversion }) => {
    if (!conversion) return null;
  
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
  
    const convert = (data) => {
      const { category, fromUnit, toUnit, value } = data;
      const units = unitCategories[category];
      
      const fromUnitData = units.find(u => u.value === fromUnit);
      const toUnitData = units.find(u => u.value === toUnit);
      
      if (!fromUnitData || !toUnitData) return null;
      
      // Convert to base unit first
      let baseValue;
      if (category === 'length') {
        baseValue = value * fromUnitData.toMeter;
        return baseValue / toUnitData.toMeter;
      } else if (category === 'area') {
        baseValue = value * fromUnitData.toSqMeter;
        return baseValue / toUnitData.toSqMeter;
      } else if (category === 'volume') {
        baseValue = value * fromUnitData.toCubicMeter;
        return baseValue / toUnitData.toCubicMeter;
      } else if (category === 'weight') {
        baseValue = value * fromUnitData.toKg;
        return baseValue / toUnitData.toKg;
      }
      
      return null;
    };
  
    const convertedValue = convert(conversion);
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Conversion Result</h2>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="mb-4">
            <p className="text-gray-700">
              {conversion.value} {conversion.fromUnit} =
            </p>
            <p className="text-2xl font-semibold">
              {convertedValue.toFixed(6)} {conversion.toUnit}
            </p>
          </div>
          
          <div className="mb-4">
            <button 
              onClick={() => navigator.clipboard.writeText(`${convertedValue.toFixed(6)} ${conversion.toUnit}`)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
              Copy to Clipboard
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConverterResults;