import React, { useState } from 'react'
import MoveForward from './MoveForward';

const ShowColumns = ({ data }) => {
  console.log("columnData in ShowColumn component is----------",data);
  const [selectedColumn, setSelectedColumn] = useState(null);

  const columns = Object.keys(data[0]);
  console.log(columns);

  const [selectedOption, setSelecetdOption] = useState(null);
  const [ismoveForward, setismoveForward] = useState(false);

  const HandleCheckboxSelect = (columnName) => {
    console.log("selected", columnName)
    setSelecetdOption(columnName)
  }

  const handleMovForwardBtn=()=>{
    console.log("first")
    setismoveForward(true)
  }

  return (
    <div>
      {ismoveForward?<MoveForward columnData={data} columnName={selectedOption}/>:<>{columns.map((item, index) => {
        console.log("item-----",item)
        return (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
            <div>{item}</div>
            <div><input type='checkbox' id={index} onChange={() => HandleCheckboxSelect(item)} /></div>
          </div>
        )
      })}
      {selectedOption && <div>
        <button onClick={()=>handleMovForwardBtn()}>Move Forward</button>
      </div>}</>}


    </div>
  )
}

export default ShowColumns