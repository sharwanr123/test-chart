import { useCallback } from 'react';

const useDownloadCSV = () => {
  const downloadFile = useCallback((allData, fileName = 'data.csv') => {
    if (!allData || allData.length === 0) {
      console.error("No data to download");
      return;
    }

    // Extract headers from the first row keys
    const headers = Object.keys(allData[0]);

    // Convert data to CSV format
    const csvRows = [
      headers.join(','), // Header row
      ...allData.map(row =>
        headers.map(header => JSON.stringify(row[header] ?? '')).join(',')
      ),
    ];

    // Create a Blob from the CSV data
    const csvData = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvData);

    // Create a temporary link to trigger the download
    const link = document.createElement('a');
    link.href = csvUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    // Clean up the link after download
    document.body.removeChild(link);
    URL.revokeObjectURL(csvUrl); // Revoke the created object URL to free up resources
  }, []);

  return downloadFile;
};

export default useDownloadCSV;
