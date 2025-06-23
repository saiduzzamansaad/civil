export const calculateConcreteMaterials = (data) => {
    // Convert to metric if imperial
    let length = data.length;
    let width = data.width;
    let thickness = data.thickness;
    
    if (data.unitSystem === 'imperial') {
      length = length * 0.3048; // feet to meters
      width = width * 0.3048;
      thickness = thickness * 0.3048;
    }
  
    // Calculate volume
    let volume = 0;
    switch(data.elementType) {
      case 'slab':
        volume = length * width * thickness;
        break;
      case 'beam':
        volume = length * width * thickness;
        break;
      case 'column':
        volume = length * width * thickness;
        break;
      case 'footing':
        volume = length * width * thickness;
        break;
      default:
        volume = length * width * thickness;
    }
  
    const concreteMixRatios = {
      M20: { cement: 1, sand: 1.5, aggregate: 3, ratio: "1:1.5:3" },
      M25: { cement: 1, sand: 1, aggregate: 2, ratio: "1:1:2" }
      // Add more grades as needed
    };
    const mix = concreteMixRatios[data.grade] || concreteMixRatios.M20;
    const cement = (mix.cement * volume) * (1 + data.wastage/100);
    const sand = (mix.sand * volume) * (1 + data.wastage/100);
    const aggregate = (mix.aggregate * volume) * (1 + data.wastage/100);
  
    return {
      volume,
      cement,
      sand,
      aggregate,
      unitSystem: data.unitSystem,
      mixRatio: mix.ratio
    };
  };
  
  export const calculateSteelWeight = (data) => {
    let length = data.length;
    let diameter = data.diameter;
    
    if (data.unitSystem === 'imperial') {
      length = length * 0.3048; // feet to meters
      diameter = diameter * 25.4; // inches to mm
    }
  
    let weightPerUnit = 0;
    switch(data.steelType) {
      case 'round':
        weightPerUnit = (Math.pow(diameter, 2) / 162 * length);
        break;
      case 'square':
        weightPerUnit = (Math.pow(diameter, 2) / 162 * length) * 1.1;
        break;
      case 'flat':
        // Assuming thickness is 10mm for flat bars
        weightPerUnit = (diameter * 10 * 0.00785) * length;
        break;
      case 'hex':
        weightPerUnit = (Math.pow(diameter, 2) / 162 * length) * 1.1;
        break;
      default:
        weightPerUnit = (Math.pow(diameter, 2) / 162 * length);
    }
  
    const totalWeight = weightPerUnit * data.quantity;
  
    return {
      weightPerUnit,
      totalWeight,
      unitSystem: data.unitSystem,
      steelType: data.steelType,
      diameter: data.diameter,
      quantity: data.quantity
    };
  };
  
  // Define unitCategories with example data
  const unitCategories = {
      length: [
          { value: 'meters', toBase: 1 },
          { value: 'feet', toBase: 0.3048 }
      ],
      weight: [
          { value: 'kilograms', toBase: 1 },
          { value: 'pounds', toBase: 0.453592 }
      ]
      // Add more categories as needed
  };
  
  export const convertUnits = (data) => {
      const { category, fromUnit, toUnit, value } = data;
      const units = unitCategories[category];
    
    const fromUnitData = units.find(u => u.value === fromUnit);
    const toUnitData = units.find(u => u.value === toUnit);
    
    if (!fromUnitData || !toUnitData) return null;
    
    // Special handling for temperature
    if (category === 'temperature') {
      return convertTemperature(value, fromUnit, toUnit);
    }
  
    // Convert to base unit first
    const baseValue = value * fromUnitData.toBase;
    return baseValue / toUnitData.toBase;
  };
  
  const convertTemperature = (value, fromUnit, toUnit) => {
    if (fromUnit === toUnit) return value;
    
    // Convert to Celsius first
    let celsius;
    if (fromUnit === '°C') {
      celsius = value;
    } else if (fromUnit === '°F') {
      celsius = (value - 32) * 5/9;
    } else if (fromUnit === 'K') {
      celsius = value - 273.15;
    }
  
    // Convert from Celsius to target unit
    if (toUnit === '°C') {
      return celsius;
    } else if (toUnit === '°F') {
      return (celsius * 9/5) + 32;
    } else if (toUnit === 'K') {
      return celsius + 273.15;
    }
  
    return value;
  };