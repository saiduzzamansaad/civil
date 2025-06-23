import React from 'react';
import { useReactToPrint } from 'react-to-print';

const FluidMechanicsTable = ({ results }) => {
  const tableRef = React.useRef();

  const calculateResults = (data) => {
    let calculated = {};
    
    switch(data.calculationType) {
      case 'reynolds':
        calculated.value = (data.density * data.velocity * data.diameter) / data.viscosity;
        calculated.label = 'Reynolds Number';
        calculated.unit = '';
        calculated.regime = calculated.value < 2000 ? 'Laminar' : 
                         calculated.value > 4000 ? 'Turbulent' : 'Transitional';
        break;
        
      case 'flowrate':
        const area = Math.PI * Math.pow(data.diameter/2, 2);
        calculated.value = data.velocity * area;
        calculated.label = 'Flow Rate';
        calculated.unit = data.unitSystem === 'metric' ? 'm³/s' : 'ft³/s';
        break;
        
      case 'headloss':
        const g = data.unitSystem === 'metric' ? 9.81 : 32.2;
        calculated.value = (data.frictionFactor * data.length * Math.pow(data.velocity, 2)) / 
                          (data.diameter * 2 * g);
        calculated.label = 'Head Loss';
        calculated.unit = data.unitSystem === 'metric' ? 'm' : 'ft';
        break;
        
      default:
        calculated.value = 0;
        calculated.label = 'Result';
        calculated.unit = '';
    }
    
    return calculated;
  };

  const resultData = calculateResults(results);
  const unitSystem = results.unitSystem === 'metric' ? 'SI Units' : 'Imperial Units';

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
    pageStyle: `
      @page {
        size: A4 landscape;
        margin: 10mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
        }
        table {
          break-inside: avoid;
        }
      }
    `,
  });

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Fluid Mechanics Results Table</h2>
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Print/Export
        </button>
      </div>

      <div ref={tableRef} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <div className="mb-4 text-center">
          <h3 className="text-lg font-bold">FLUID MECHANICS CALCULATION REPORT</h3>
          <p className="text-sm">Calculation Type: {results.calculationType.replace(/-/g, ' ').toUpperCase()}</p>
          <p className="text-sm">Unit System: {unitSystem}</p>
          <p className="text-sm">Date: {new Date().toLocaleDateString()}</p>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Parameter</th>
              <th className="border p-2">Value</th>
              <th className="border p-2">Units</th>
              <th className="border p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 font-medium">Density</td>
              <td className="border p-2 text-right">{results.density}</td>
              <td className="border p-2">{results.unitSystem === 'metric' ? 'kg/m³' : 'lb/ft³'}</td>
              <td className="border p-2">Fluid density</td>
            </tr>
            
            <tr className="bg-gray-50">
              <td className="border p-2 font-medium">Velocity</td>
              <td className="border p-2 text-right">{results.velocity}</td>
              <td className="border p-2">{results.unitSystem === 'metric' ? 'm/s' : 'ft/s'}</td>
              <td className="border p-2">Flow velocity</td>
            </tr>
            
            <tr>
              <td className="border p-2 font-medium">Diameter</td>
              <td className="border p-2 text-right">{results.diameter}</td>
              <td className="border p-2">{results.unitSystem === 'metric' ? 'm' : 'ft'}</td>
              <td className="border p-2">Pipe diameter</td>
            </tr>
            
            {results.calculationType === 'reynolds' && (
              <tr className="bg-gray-50">
                <td className="border p-2 font-medium">Viscosity</td>
                <td className="border p-2 text-right">{results.viscosity}</td>
                <td className="border p-2">{results.unitSystem === 'metric' ? 'Pa·s' : 'lb·s/ft²'}</td>
                <td className="border p-2">Dynamic viscosity</td>
              </tr>
            )}
            
            {results.calculationType === 'headloss' && (
              <>
                <tr className="bg-gray-50">
                  <td className="border p-2 font-medium">Friction Factor</td>
                  <td className="border p-2 text-right">{results.frictionFactor}</td>
                  <td className="border p-2">-</td>
                  <td className="border p-2">Darcy friction factor</td>
                </tr>
                <tr>
                  <td className="border p-2 font-medium">Pipe Length</td>
                  <td className="border p-2 text-right">{results.length}</td>
                  <td className="border p-2">{results.unitSystem === 'metric' ? 'm' : 'ft'}</td>
                  <td className="border p-2">Length of pipe</td>
                </tr>
              </>
            )}
            
            <tr className="bg-blue-50 font-semibold">
              <td className="border p-2">{resultData.label}</td>
              <td className="border p-2 text-right">{resultData.value.toFixed(4)}</td>
              <td className="border p-2">{resultData.unit}</td>
              <td className="border p-2">
                {resultData.regime ? `Flow Regime: ${resultData.regime}` : 'Calculated result'}
              </td>
            </tr>
          </tbody>
        </table>

        {results.calculationType === 'reynolds' && (
          <div className="mt-4 p-3 bg-gray-100 rounded border border-gray-300">
            <h4 className="font-bold mb-2">Reynolds Number Interpretation:</h4>
            <ul className="list-disc pl-5 text-sm">
              <li><strong>Re &lt; 2000:</strong> Laminar Flow (Smooth, orderly fluid motion)</li>
              <li><strong>2000 ≤ Re ≤ 4000:</strong> Transitional Flow (Unstable flow regime)</li>
              <li><strong>Re &gt; 4000:</strong> Turbulent Flow (Chaotic, irregular fluid motion)</li>
            </ul>
          </div>
        )}

        <div className="mt-6 flex justify-between text-sm">
          <div>
            <p>Calculated by: _________________</p>
            <p>Date: {new Date().toLocaleDateString()}</p>
          </div>
          <div>
            <p>Verified by: _________________</p>
            <p>Date: _________________</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FluidMechanicsTable;