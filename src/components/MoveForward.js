import React, { useEffect, useState } from 'react';
import RemoveNan from './RemoveNan';

const MoveForward=({ columnData, columnName })=> {
    console.log('columnName in moveforward component------',columnName)
    console.log('columnData in moveforward component------',columnData)
  const [category, setCategory] = useState(null);
  const [Values,setValues]=useState([])

  const SetCategory=(data)=>{
    console.log("first")
  }

  useEffect(()=>{
    const values = columnData.map(item => item[columnName]);
    setValues(values)
  },[])



// console.log("value of column matching-------",values);


  return (
    <div
      className="column-editor"
      style={{
        maxHeight: '700px', // Set a fixed max height as needed
        overflowY: 'auto',  // Enable vertical scrolling
        border: '1px solid #ccc', // Optional: to visually define the scrollable area
        padding: '20px', // Optional: add some padding inside the div
      }}
    >
      <RemoveNan data={Values} columnName={columnName} allData={columnData} />
    </div>
  );
}

export default MoveForward;
