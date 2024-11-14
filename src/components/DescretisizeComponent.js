import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

// Helper function to generate the bins
const createBins = (data, binSize) => {
  let minValue = Math.min(...data);
  let maxValue = Math.max(...data);
  let bins = [];

  for (let i = minValue; i < maxValue; i += binSize) {
    bins.push([i, i + binSize]);
  }

  bins.push([maxValue - binSize, maxValue]); // last bin (could be smaller)
  return bins;
};

// Helper function to create bins by number of elements per bin
const createBinsByNumber = (data, nBins) => {
  let sortedData = [...data].sort((a, b) => a - b);
  let binSize = Math.ceil(sortedData.length / nBins);
  let bins = [];

  for (let i = 0; i < nBins; i++) {
    let binStart = sortedData[i * binSize];
    let binEnd =
      sortedData[Math.min((i + 1) * binSize - 1, sortedData.length - 1)];
    bins.push([binStart, binEnd]);
  }

  return bins;
};

// Main DiscretizeColumns Component
const DiscretizeColumns = ({ data }) => {
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [discretizationMethods, setDiscretizationMethods] = useState({});
  const [dataset, setDataset] = useState(data);
  const [columnData, setColumnData] = useState(null);
  const [colName, setColName] = useState(null);

  // const uniqueValues = [...new Set(columnData)];
  // const frequencies = uniqueValues.map(
  //   (val) => columnData.filter((v) => v === val).length
  // );

  // Histogram data structure
  // const histogramData = {
  //   labels: uniqueValues,
  //   datasets: [
  //     {
  //       label: 'Frequency',
  //       data: frequencies,
  //       backgroundColor: 'rgba(75, 192, 192, 0.6)',
  //     },
  //   ],
  // };
  const showBarr = (columnname) => {
    const columnValues = data.map((row) => row[columnname]);
    console.log("Values for column:", columnname, columnValues);
    setColName(columnname);
    setColumnData(columnValues);
  };

  const uniqueValues = [...new Set(columnData)];
  const frequencies = uniqueValues.map(
    (val) => columnData.filter((v) => v === val).length
  );

  // Histogram data structure
  const histogramData = {
    labels: uniqueValues,
    datasets: [
      {
        label: "Frequency",
        data: frequencies,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };
  // Get unique values for each column
  const getColumnUniqueValues = (columnName) => {
    const columnData = dataset.slice(0, 100).map((row) => row[columnName]);
    return [...new Set(columnData)].filter((value) => value !== undefined);
  };

  // Determine column type
  const determineColumnType = (columnName) => {
    const uniqueValues = getColumnUniqueValues(columnName);
    const uniqueCount = uniqueValues.length;

    if (uniqueCount > 0 && uniqueCount < 10) {
      return "Discrete column";
    } else if (uniqueCount === data.length) {
      return "Indexing column";
    } else {
      return "Continuous column";
    }
  };

  // Columns that can be selected for discretization
  const getSelectableColumns = () => {
    const columns = Object.keys(dataset[0]);
    return columns.map((col) => {
      const uniqueValues = getColumnUniqueValues(col);
      const columnType = determineColumnType(col);
      const isDisabled = uniqueValues.length === dataset.length;

      return {
        name: col,
        type: columnType,
        isDisabled,
      };
    });
  };

  // Handle column selection
  const handleColumnSelection = (columnName) => {
    setSelectedColumns((prev) => {
      if (prev.includes(columnName)) {
        return prev.filter((col) => col !== columnName);
      }
      return [...prev, columnName];
    });
  };

  // Handle discretization methods for each column
  const handleDiscretization = (columnName, method, value) => {
    setDiscretizationMethods((prev) => ({
      ...prev,
      [columnName]: {
        ...prev[columnName],
        [method]: value,
      },
    }));
  };

  // Apply discretization methods to the dataset
  const applyDiscretization = () => {
    const newDataset = dataset.map((row, index) => {
      if (index >= 100) return row;

      const updatedRow = { ...row };

      selectedColumns.forEach((columnName) => {
        const method = discretizationMethods[columnName];

        if (method) {
          let newValue;
          if (method.constantBinSize) {
            newValue = createBins(
              getColumnUniqueValues(columnName),
              method.constantBinSize
            );
          } else if (method.numberOfBins) {
            newValue = createBinsByNumber(
              getColumnUniqueValues(columnName),
              method.numberOfBins
            );
          } else if (method.customDiscretization) {
            newValue = method.customDiscretization.split(",").map(Number);
          }
          updatedRow[columnName] = newValue;
        }
      });

      return updatedRow;
    });

    setDataset(newDataset);
  };

  return (
    <div style={{ height: "386px", overflow: "scroll", width: "607px" }}>
      <button
        onClick={() => applyDiscretization()}
        disabled={selectedColumns.length === 0}
      >
        Apply Discretization
      </button>

      <div>
        <h3>Select Columns to Discretize</h3>
        <div>
          {getSelectableColumns().map(({ name, type, isDisabled }) => (
            <div
              key={name}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <input
                  type="checkbox"
                  disabled={isDisabled}
                  checked={selectedColumns.includes(name)}
                  onChange={() => handleColumnSelection(name)}
                  style={{
                    backgroundColor: isDisabled ? "red" : "transparent",
                    color: isDisabled ? "gray" : "black",
                  }}
                />
                {name}
              </div>
              <div>{type}</div>
            </div>
          ))}
        </div>
      </div>

      {selectedColumns.length > 0 && (
        <div>
          <h3>Discretization Methods for Selected Columns</h3>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              {selectedColumns.map((columnName) => (
                <div className="discretization" key={columnName}>
                  <h4>{columnName}</h4>
                  <div>
                    <label>Constant Bin Size</label>
                    <input
                      type="number"
                      onChange={(e) =>
                        handleDiscretization(
                          columnName,
                          "constantBinSize",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <label>Number of Bins</label>
                    <input
                      type="number"
                      onChange={(e) =>
                        handleDiscretization(
                          columnName,
                          "numberOfBins",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <label>Number of Binssss</label>
                    <input
                      type="number"
                      onChange={(e) =>
                        handleDiscretization(
                          columnName,
                          "numberOfBins",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div>
                    <label>Custom Discretization</label>
                    <input
                      type="text"
                      placeholder="e.g., 0,1,4,8,10"
                      onChange={(e) =>
                        handleDiscretization(
                          columnName,
                          "customDiscretization",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <button onClick={() => showBarr(columnName)}>
                      show bar
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div>
              {colName !== null && colName}
              <Bar data={histogramData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscretizeColumns;
