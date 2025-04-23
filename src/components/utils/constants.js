export const unitCategories = {
    length: [
      { name: 'Meter', value: 'm', toBase: 1 },
      { name: 'Centimeter', value: 'cm', toBase: 0.01 },
      { name: 'Millimeter', value: 'mm', toBase: 0.001 },
      { name: 'Kilometer', value: 'km', toBase: 1000 },
      { name: 'Inch', value: 'in', toBase: 0.0254 },
      { name: 'Foot', value: 'ft', toBase: 0.3048 },
      { name: 'Yard', value: 'yd', toBase: 0.9144 },
      { name: 'Mile', value: 'mi', toBase: 1609.34 }
    ],
    area: [
      { name: 'Square Meter', value: 'm²', toBase: 1 },
      { name: 'Square Centimeter', value: 'cm²', toBase: 0.0001 },
      { name: 'Square Millimeter', value: 'mm²', toBase: 0.000001 },
      { name: 'Square Kilometer', value: 'km²', toBase: 1000000 },
      { name: 'Square Inch', value: 'in²', toBase: 0.00064516 },
      { name: 'Square Foot', value: 'ft²', toBase: 0.092903 },
      { name: 'Square Yard', value: 'yd²', toBase: 0.836127 },
      { name: 'Acre', value: 'ac', toBase: 4046.86 },
      { name: 'Hectare', value: 'ha', toBase: 10000 }
    ],
    volume: [
      { name: 'Cubic Meter', value: 'm³', toBase: 1 },
      { name: 'Cubic Centimeter', value: 'cm³', toBase: 0.000001 },
      { name: 'Cubic Millimeter', value: 'mm³', toBase: 0.000000001 },
      { name: 'Liter', value: 'L', toBase: 0.001 },
      { name: 'Milliliter', value: 'mL', toBase: 0.000001 },
      { name: 'Cubic Foot', value: 'ft³', toBase: 0.0283168 },
      { name: 'Cubic Inch', value: 'in³', toBase: 0.0000163871 },
      { name: 'Gallon (US)', value: 'gal', toBase: 0.00378541 },
      { name: 'Gallon (UK)', value: 'gal UK', toBase: 0.00454609 }
    ],
    weight: [
      { name: 'Kilogram', value: 'kg', toBase: 1 },
      { name: 'Gram', value: 'g', toBase: 0.001 },
      { name: 'Milligram', value: 'mg', toBase: 0.000001 },
      { name: 'Metric Ton', value: 't', toBase: 1000 },
      { name: 'Pound', value: 'lb', toBase: 0.453592 },
      { name: 'Ounce', value: 'oz', toBase: 0.0283495 }
    ],
    pressure: [
      { name: 'Pascal', value: 'Pa', toBase: 1 },
      { name: 'Kilopascal', value: 'kPa', toBase: 1000 },
      { name: 'Megapascal', value: 'MPa', toBase: 1000000 },
      { name: 'Bar', value: 'bar', toBase: 100000 },
      { name: 'PSI', value: 'psi', toBase: 6894.76 },
      { name: 'KSI', value: 'ksi', toBase: 6894760 }
    ],
    temperature: [
      { name: 'Celsius', value: '°C', toBase: 1 },
      { name: 'Fahrenheit', value: '°F', toBase: 1 },
      { name: 'Kelvin', value: 'K', toBase: 1 }
    ]
  };
  
  export const materialDensities = {
    concrete: {
      rcc: 25,    // kN/m³
      pcc: 24,    // kN/m³
      brick: 18.8, // kN/m³
      tiling: 22   // kN/m³
    },
    steel: 7850 // kg/m³
  };
  
  export const concreteMixRatios = {
    M10: { cement: 220, sand: 480, aggregate: 660, ratio: '1:3:6' },
    M15: { cement: 320, sand: 460, aggregate: 640, ratio: '1:2:4' },
    M20: { cement: 400, sand: 450, aggregate: 630, ratio: '1:1.5:3' },
    M25: { cement: 480, sand: 440, aggregate: 620, ratio: '1:1:2' },
    M30: { cement: 520, sand: 430, aggregate: 610, ratio: '1:1:1.5' }
  };