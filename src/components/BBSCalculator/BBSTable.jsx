import React from 'react';
import { useReactToPrint } from 'react-to-print';

const BBSTable = ({ results }) => {
  const tableRef = React.useRef();

  const calculateCuttingLength = (data) => {
    const { barShape, length, breadth, cover } = data;
    let cuttingLength = 0;
    
    switch(barShape) {
      case 'straight':
        cuttingLength = length - (2 * cover);
        break;
      case 'crank':
        cuttingLength = length - (2 * cover) + (2 * 0.42 * (breadth - (2 * cover)));
        break;
      case 'l-shape':
        cuttingLength = (length - cover) + (breadth - cover) - (1 * (breadth - (2 * cover)));
        break;
      case 'u-shape':
        cuttingLength = (2 * (length - cover)) + (breadth - (2 * cover));
        break;
      case 'spiral':
        // Simplified spiral calculation
        cuttingLength = 1.2 * length;
        break;
      default:
        cuttingLength = length;
    }
    
    return cuttingLength;
  };

  const calculateWeight = (diameter, length) => {
    return (Math.pow(diameter, 2) / 162) * (length / 1000); // Convert mm to meters
  };

  const cuttingLength = calculateCuttingLength(results);
  const weightPerBar = calculateWeight(results.barDiameter, cuttingLength);
  const totalWeight = weightPerBar * results.numberOfBars * (1 + results.wastage / 100);
  const totalLength = cuttingLength * results.numberOfBars * (1 + results.wastage / 100);

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
        <h2 className="text-xl font-semibold">Bar Bending Schedule Table</h2>
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Print/Export
        </button>
      </div>

      <div ref={tableRef} className="bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4 text-center">
          <h3 className="text-lg font-bold">BAR BENDING SCHEDULE</h3>
          <p className="text-sm">Project: Sample Project</p>
          <p className="text-sm">Element: {results.elementType.toUpperCase()}</p>
          <p className="text-sm">Date: {new Date().toLocaleDateString()}</p>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Bar Mark</th>
              <th className="border p-2">Bar Dia (mm)</th>
              <th className="border p-2">Shape</th>
              <th className="border p-2">No. of Bars</th>
              <th className="border p-2">Cutting Length (mm)</th>
              <th className="border p-2">Weight per Bar (kg)</th>
              <th className="border p-2">Total Length (mm)</th>
              <th className="border p-2">Total Weight (kg)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 text-center">BM-01</td>
              <td className="border p-2 text-center">{results.barDiameter}</td>
              <td className="border p-2 text-center">{results.barShape}</td>
              <td className="border p-2 text-center">{results.numberOfBars}</td>
              <td className="border p-2 text-center">{cuttingLength.toFixed(2)}</td>
              <td className="border p-2 text-center">{weightPerBar.toFixed(2)}</td>
              <td className="border p-2 text-center">{totalLength.toFixed(2)}</td>
              <td className="border p-2 text-center">{totalWeight.toFixed(2)}</td>
            </tr>
            {/* Additional rows can be added here for multiple bar types */}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 font-semibold">
              <td className="border p-2 text-right" colSpan="7">Total (including {results.wastage}% wastage)</td>
              <td className="border p-2 text-center">{totalWeight.toFixed(2)} kg</td>
            </tr>
          </tfoot>
        </table>

        <div className="mt-4 text-xs">
          <p><strong>Notes:</strong></p>
          <ul className="list-disc pl-5">
            <li>Weight calculation formula: (D² / 162) × Length (in meters)</li>
            <li>Standard bend deductions applied</li>
            <li>Cover: {results.cover} mm</li>
            <li>All dimensions in millimeters unless specified</li>
          </ul>
        </div>

        <div className="mt-6 flex justify-between text-sm">
          <div>
            <p>Prepared by: _________________</p>
            <p>Designation: _________________</p>
          </div>
          <div>
            <p>Checked by: _________________</p>
            <p>Designation: _________________</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BBSTable;