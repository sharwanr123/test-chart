import React, { useEffect, useState } from 'react';

const UniqueData = ({ data,onClick }) => {
  console.log("column data in Unique Data component--------", data);
  const [category,setCategory]=useState(null);

  // Create a map to count occurrences of each unique item
  const frequencyMap = data.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

  // Convert the frequency map to an array of objects
  const uniqueDataWithCount = Object.keys(frequencyMap).map(key => ({
    value: key,
    count: frequencyMap[key],
  }));

  



  console.log("Unique data with counts=====", uniqueDataWithCount.length);
  console.log("Unique data with counts=====", data.length);

  useEffect(()=>{
      if(uniqueDataWithCount.length>0 && uniqueDataWithCount.length<10)
  {
    setCategory('Discrete column')
  }
  else if(uniqueDataWithCount.length===data.length)
  {
    setCategory('indexing column')
  }
  else{
    setCategory('continuous column') 
  }
if(category)
{
    onClick(category)
}

},[data,uniqueDataWithCount])

  return (
    <div>
      <p>UniqueData Component</p>
      <div style={{
        maxHeight: '300px',  // Adjust this value as needed
        overflowY: 'auto',   // Enable vertical scrolling
        border: '1px solid #ccc', // Optional: Add a border to the container
        padding: '10px'      // Optional: Add some padding for better spacing
      }}>
        {uniqueDataWithCount.map((item, idx) => {
          return (
            <div style={{display:'flex',justifyContent:'space-between'}} key={idx}>
                <div><strong>{item.value}:</strong> </div>
                <div>{item.count} times</div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UniqueData;
