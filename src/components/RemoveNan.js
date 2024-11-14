import React, { useEffect, useState } from 'react';
import ShowFinalData from './ShoWFinalData';

const RemoveNan = ({ data, columnName, allData }) => {
    console.log("column data in Unique Data component--------", allData);
    const [isSelected, setIsSelected] = useState([]);
    const [finalData, setFinalData] = useState(null);
    const [isfinal, setisFinal] = useState(false);

    const frequencyMap = data.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
    }, {});

    // Convert the frequency map to an array of objects
    const uniqueDataWithCount = Object.keys(frequencyMap).map(key => ({
        value: key,
        count: frequencyMap[key],
    }));

    const handleChange = (item) => {
        setIsSelected(prevSelected =>
            prevSelected.includes(item.value)
                ? prevSelected.filter(selectedItem => selectedItem !== item.value)
                : [...prevSelected, item.value]
        );
    };

    useEffect(() => {
        const filteredData = allData.filter(row => {
            return !Object.values(row).some(value => isSelected.includes(value));
          });
        console.log("final data---------", filteredData);
        setFinalData(filteredData)
    }, [isfinal])

    console.log("Selected options:", isSelected);
    console.log("Filtered data:", finalData);

    return (
        <div>
            {!isfinal && <div>
                <p>{columnName}</p>
                <div style={{
                    maxHeight: '300px',
                    overflowY: 'auto',
                    border: '1px solid #ccc',
                    padding: '10px'
                }}>
                    {uniqueDataWithCount.map((item, idx) => (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }} key={idx}>
                            <div><strong>{item.value}:</strong></div>
                            <div>{item.count} times</div>
                            <div>
                                <input
                                    type='checkbox'
                                    onChange={() => handleChange(item)}
                                    checked={isSelected.includes(item.value)}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {isSelected.length > 0 && (
                    <div style={{ textAlign: 'right', paddingTop: '10px' }}>
                        <button onClick={() => { console.log("Filtered data to process:", finalData); setisFinal(true) }}>
                            Remove Data
                        </button>
                    </div>
                )}
            </div>}


            {isfinal && <ShowFinalData allData={finalData} />}
        </div>
    );
};

export default RemoveNan;
