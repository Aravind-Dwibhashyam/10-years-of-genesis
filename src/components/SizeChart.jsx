import React, { useState } from 'react';
import { RulerIcon, X } from 'lucide-react';
import './SizeChart.css';

const sizeGuides = [
  {
    category: 'T-Shirts',
    sizes: [
      { size: 'S', chest: '36-38"', length: '28"', sleeve: '8"' },
      { size: 'M', chest: '39-41"', length: '29"', sleeve: '8.5"' },
      { size: 'L', chest: '42-44"', length: '30"', sleeve: '9"' },
      { size: 'XL', chest: '45-47"', length: '31"', sleeve: '9.5"' },
      { size: 'XXL', chest: '48-50"', length: '32"', sleeve: '10"' }
    ]
  },
  {
    category: 'Hoodies',
    sizes: [
      { size: 'S', chest: '38-40"', length: '26"', sleeve: '25"' },
      { size: 'M', chest: '41-43"', length: '27"', sleeve: '25.5"' },
      { size: 'L', chest: '44-46"', length: '28"', sleeve: '26"' },
      { size: 'XL', chest: '47-49"', length: '29"', sleeve: '26.5"' },
      { size: 'XXL', chest: '50-52"', length: '30"', sleeve: '27"' }
    ]
  }
];

const SizeChart = ({ onClose }) => {
  const [activeCategory, setActiveCategory] = useState(sizeGuides[0].category);

  return (
    <div className="size-chart-overlay">
      <div className="size-chart-container" onClick={(e) => e.stopPropagation()}>
        <div className="size-chart-header">
          <div className="size-chart-heading">
            <RulerIcon size={18} className="size-chart-icon" />
            <h3 className="size-chart-title">Size Chart</h3>
          </div>
          <button
            onClick={onClose}
            className="close-button"
          >
            <X size={20} />
          </button>
        </div>

        <div className="size-guide-content">
          <div className="size-guide">
            {sizeGuides.map((guide) => (
              <button
                key={guide.category}
                onClick={() => setActiveCategory(guide.category)}
                className={`size-chart-category-button ${activeCategory === guide.category
                  ? 'size-chart-category-button-active'
                  : 'size-chart-category-button-inactive'
                  }`}
              >
                {guide.category}
              </button>
            ))}
          </div>

          <div className="size-chart-table-container">
            <table className="size-chart-table">
              <thead>
                <tr>
                  <th className="size-chart-th">Size</th>
                  <th className="size-chart-th">Chest</th>
                  <th className="size-chart-th">Length</th>
                  {sizeGuides.find(g => g.category === activeCategory)?.sizes[0].sleeve && (
                    <th className="size-chart-th">Sleeve</th>
                  )}
                </tr>
              </thead>
              <tbody className="table-style">
                {sizeGuides
                  .find(g => g.category === activeCategory)
                  ?.sizes.map((size, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                      <td className="size-chart-td-first">{size.size}</td>
                      <td className="size-chart-td">{size.chest}</td>
                      <td className="size-chart-td">{size.length}</td>
                      {size.sleeve && (
                        <td className="size-chart-td">{size.sleeve}</td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="size-chart-tips">
            <p className="mb-2 font-medium">Measurement Tips:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Chest: Measure around the fullest part of your chest, keeping the tape horizontal.</li>
              <li>Length: Measure from the highest point of the shoulder to the bottom hem.</li>
              <li>Sleeve: Measure from the shoulder seam to the end of the sleeve.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeChart;
