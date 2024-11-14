import React, { useState } from "react";
import Papa from "papaparse";
import { CSVLink } from "react-csv";
import DataPreview from "./components/DataPreview";
import ColumnEditor from "./components/ColumnEditor";
import "./App.css";
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UniqueData from "./components/UniqueData";
import ShowColumns from "./components/ShowColumns";
import DiscretizeColumns from "./components/DescretisizeComponent";

const btnDesc = [
  "Remove NaNs",
  "Discretize columns",
  "relabel/group values in columns",
];

function App() {
  const [data, setData] = useState([]);
  const [activeBtn, setActiveBtn] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [descretize, setDescretize] = useState(false);
  const [isbtnClicked, setisbtnClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setData(result.data);
          setPreviewData(result.data.slice(0, 50));
        },
      });
    }
  };

  const handleColumnSelect = (columnName) => {
    setSelectedColumn(columnName);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleClose2 = () => {
    console.log("handleClose2");
    setisbtnClicked(false);
  };

  const handleClose3 = () => {
    console.log("handleClose3");
    setDescretize(false);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "8px",
    height: "400px",
  };

  const btnStyle1 = {
    padding: "10px 20px",
    border: "none",
  };

  const btnStyle2 = {
    padding: "10px 20px",
    border: "none",
    backgroundColor: "green",
    color: "white",
  };

  const removeNanfunc = (id) => {
    console.log("btn clicked id=========", id);
    setActiveBtn(id);
    if (id === 0) {
      setisbtnClicked(true);
    }
    if (id === 1) {
      setDescretize(true);
    }
  };

  return (
    <div className="App">
      <h1>Data Analysis Tool</h1>
      <div>
        <input type="file" accept=".csv,.xlsx" onChange={handleFileUpload} />
        <CSVLink data={data} filename="processed_data.csv">
          Download Processed Data
        </CSVLink>
      </div>
      <DataPreview data={previewData} onColumnSelect={handleColumnSelect} />
      {previewData.length > 0 && (
        <div style={{ display: "flex", gap: "100px", marginTop: "74px" }}>
          {btnDesc.map((item, index) => {
            return (
              <button
                key={index}
                id={index}
                onClick={() => removeNanfunc(index)}
                style={activeBtn === index ? btnStyle2 : btnStyle1}
              >
                {item}
              </button>
            );
          })}
        </div>
      )}

      {isbtnClicked && (
        <Modal open={isbtnClicked} onClose={handleClose2}>
          <Box sx={modalStyle}>
            <IconButton
              aria-label="close"
              onClick={handleClose2}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <ShowColumns data={data} />
          </Box>
        </Modal>
      )}

      {selectedColumn && (
        <Modal open={isModalOpen} onClose={handleClose}>
          <Box sx={modalStyle}>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <ColumnEditor
              columnData={data.map((row) => row[selectedColumn])}
              columnName={selectedColumn}
            />
          </Box>
        </Modal>
      )}

      {descretize && (
        <Modal open={descretize} onClose={() => handleClose3()}>
          <Box sx={modalStyle}>
            <IconButton
              aria-label="close"
              onClick={handleClose3}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <DiscretizeColumns data={data} />
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default App;
