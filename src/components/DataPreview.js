import React from 'react';

function DataPreview({ data, onColumnSelect }) {
  return (
    <div className="data-preview">
      <table>
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((col) => (
                <th key={col} onClick={() => onColumnSelect(col)}>
                  {col}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {Object.values(row).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataPreview;
