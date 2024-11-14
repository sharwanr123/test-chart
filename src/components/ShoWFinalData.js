import React from 'react';
import useDownloadCSV from '../hooks/useDownloadCSV';

const ShowFinalData = ({ allData }) => {
    const downloadCSV = useDownloadCSV();
  if (!allData || allData.length === 0) {
    return <p>No data available</p>;
  }
 
  const DownloadFile=()=>{
    console.log("download clicked");
    downloadCSV(allData, 'myData.csv');
  }
  const headers = Object.keys(allData[0]);
  const displayedData = allData.slice(0, 50); // Display only the first 50 rows

  return (
    <div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <h2>Data Table</h2>  <button onClick={()=>DownloadFile()} style={{fontSize: '20px',
    margin: '10px',
    padding: '20px 27px'}}>Download</button>
        </div>
     
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}> {/* Add scrollable container */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  style={{
                    border: '1px solid #ddd',
                    padding: '8px',
                    textAlign: 'left',
                    backgroundColor: '#f2f2f2'
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, colIndex) => (
                  <td
                    key={colIndex}
                    style={{
                      border: '1px solid #ddd',
                      padding: '8px'
                    }}
                  >
                    {row[header] !== undefined ? row[header] : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowFinalData;
