import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import UniqueData from './UniqueData';

function ColumnEditor({ columnData, columnName, onRename }) {
  const [newName, setNewName] = useState(columnName);
  const [category, setCategory] = useState(null);

  const SetCategory = (data) => {
    setCategory(data);
  };

  const handleNameChange = () => {
    console.log(`Rename column from ${columnName} to ${newName}`);
    // If the parent component passed an onRename handler, call it to update the name in the parent component
    if (onRename) {
      onRename(newName);
    }
  };

  // Extract unique labels and their frequencies
  const uniqueValues = [...new Set(columnData)];
  const frequencies = uniqueValues.map(
    (val) => columnData.filter((v) => v === val).length
  );

  // Histogram data structure
  const histogramData = {
    labels: uniqueValues,
    datasets: [
      {
        label: 'Frequency',
        data: frequencies,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false, // Allow the chart to adjust aspect ratio
  };

  return (
    <div
      className="column-editor"
      style={{
        maxHeight: '300px', // Set a fixed max height as needed
        overflowY: 'auto',  // Enable vertical scrolling
        border: '1px solid #ccc', // Optional: to visually define the scrollable area
        padding: '20px', // Optional: add some padding inside the div
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>Edit Column: {columnName}</h3>
        <h3>
          Category:<span style={{ color: 'black' }}> {category}</span>
        </h3>
      </div>

      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={handleNameChange}>Rename Column</button>

      {/* Bar chart with options for responsiveness */}
      <div style={{ position: 'relative', height: '150px' }}>
        <Bar data={histogramData} options={options} />
      </div>

      <UniqueData data={columnData} onClick={(data) => SetCategory(data)} />
    </div>
  );
}

export default ColumnEditor;
