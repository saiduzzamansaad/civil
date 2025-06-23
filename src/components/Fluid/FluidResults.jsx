const FluidMechanicsResults = ({ results }) => {
      if (!results) return null;
    
      const calculateResults = (data) => {
        let result = {};
        
        switch(data.calculationType) {
          case 'reynolds':
            // Re = ρvD/μ
            result.value = (data.density * data.velocity * data.diameter) / data.viscosity;
            result.label = 'Reynolds Number';
            result.unit = '';
            result.description = result.value < 2000 ? 'Laminar Flow' : 
                              result.value > 4000 ? 'Turbulent Flow' : 'Transitional Flow';
            break;
            
          case 'flowrate': {
            // Q = vA (assuming circular pipe)
            const area = Math.PI * Math.pow(data.diameter/2, 2);
            result.value = data.velocity * area;
            result.label = 'Flow Rate';
            result.unit = getUnit('flowRate');
            break;
          }
            
          case 'headloss': {
            // h_f = f(L/D)(v²/2g)
            const g = data.unitSystem === 'metric' ? 9.81 : 32.2; // m/s² or ft/s²
            result.value = (data.frictionFactor * data.length * Math.pow(data.velocity, 2)) / 
                          (data.diameter * 2 * g);
            result.label = 'Head Loss';
            result.unit = getUnit('head');
            break;
          }
            
          case 'pressure': {
            // ΔP = ρgh_f
            const g_p = data.unitSystem === 'metric' ? 9.81 : 32.2;
            result.value = data.density * g_p * data.headLoss;
            result.label = 'Pressure Drop';
            result.unit = getUnit('pressure');
            break;
          }
            
          case 'velocity': {
            // v = Q/A
            const area_v = Math.PI * Math.pow(data.diameter/2, 2);
            result.value = data.flowRate / area_v;
            result.label = 'Flow Velocity';
            result.unit = getUnit('velocity');
            break;
          }
            
          default:
            result.value = 0;
            result.label = 'Result';
            result.unit = '';
        }
        
        return result;
      };
    
      const getUnit = (quantity) => {
        if (results.unitSystem === 'metric') {
          switch(quantity) {
            case 'flowRate': return 'm³/s';
            case 'head': return 'm';
            case 'pressure': return 'Pa';
            case 'velocity': return 'm/s';
            default: return '';
          }
        } else {
          switch(quantity) {
            case 'flowRate': return 'ft³/s';
            case 'head': return 'ft';
            case 'pressure': return 'psi';
            case 'velocity': return 'ft/s';
            default: return '';
          }
        }
      };
    
      const resultData = calculateResults(results);
    
      return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Fluid Mechanics Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <p className="text-gray-700">{resultData.label}:</p>
              <p className="text-2xl font-bold text-blue-700">
                {resultData.value.toFixed(4)} {resultData.unit}
              </p>
              {resultData.description && (
                <p className="text-sm mt-1 italic">{resultData.description}</p>
              )}
            </div>
            
            <div className="mb-4">
              <p className="text-gray-700">Calculation Type:</p>
              <p className="text-lg font-medium capitalize">
                {results.calculationType.replace(/([A-Z])/g, ' $1').trim()}
              </p>
            </div>
          </div>
    
          <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded border border-blue-100">
            <h3 className="font-semibold mb-2">Input Parameters:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              {results.density && (
                <p>Density: {results.density} {getUnit('density')}</p>
              )}
              {results.velocity && (
                <p>Velocity: {results.velocity} {getUnit('velocity')}</p>
              )}
              {results.diameter && (
                <p>Diameter: {results.diameter} {getUnit('length')}</p>
              )}
              {results.viscosity && (
                <p>Viscosity: {results.viscosity} {getUnit('viscosity')}</p>
              )}
              {results.length && (
                <p>Length: {results.length} {getUnit('length')}</p>
              )}
              {results.frictionFactor && (
                <p>Friction Factor: {results.frictionFactor}</p>
              )}
              {results.headLoss && (
                <p>Head Loss: {results.headLoss} {getUnit('head')}</p>
              )}
              {results.flowRate && (
                <p>Flow Rate: {results.flowRate} {getUnit('flowRate')}</p>
              )}
            </div>
          </div>
    
          {results.calculationType === 'reynolds' && (
            <div className="mt-4 p-3 bg-green-50 text-green-800 rounded border border-green-100">
              <h3 className="font-semibold mb-1">Flow Regime Interpretation:</h3>
              <ul className="list-disc pl-5 text-sm">
                <li>Re &lt; 2000: Laminar Flow</li>
                <li>2000 ≤ Re ≤ 4000: Transitional Flow</li>
                <li>Re &gt; 4000: Turbulent Flow</li>
              </ul>
            </div>
          )}
        </div>
      );
    };
    
    export default FluidMechanicsResults;