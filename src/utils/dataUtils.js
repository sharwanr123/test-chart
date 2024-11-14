export function removeNaNs(data, columnName, valuesToRemove) {
    return data.filter((row) => !valuesToRemove.includes(row[columnName]));
  }
  
  export function discretizeColumn(data, columnName, binSize) {
    const columnValues = data.map((row) => parseFloat(row[columnName])).filter((v) => !isNaN(v));
    const max = Math.max(...columnValues);
    const min = Math.min(...columnValues);
    const bins = Array(Math.ceil((max - min) / binSize)).fill(0);
    data.forEach((row) => {
      const value = parseFloat(row[columnName]);
      if (!isNaN(value)) {
        const binIndex = Math.floor((value - min) / binSize);
        row[columnName] = binIndex;
      }
    });
    return data;
  }
  