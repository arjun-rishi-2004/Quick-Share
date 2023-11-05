import { useState } from "react";
import { storage } from "./firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import './App.css';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CircularProgress from '@mui/material/CircularProgress';
import Loader from "./Loader"; // Add this line to import the Loader component

function FileUpload({ onUploadComplete }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleUpload = async () => {
    if (file) {
      const storageRef = ref(storage, `uploaded_files/${file.name}`);
      setUploading(true); // Set uploading state to true
      await uploadBytes(storageRef, file);
      setUploading(false); // Set uploading state to false after upload
      onUploadComplete();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  return (
    <div>
      { uploading ? (
        <Loader /> // Use the Loader component when uploading
      ) : (
        <div>
          <h2>File Upload</h2>
          <label
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{
              border: "2px dashed #ccc",
              borderRadius: "4px",
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
              display: "block",
            }}
          >
            {fileName ? (
              <div>
                File Selected: {fileName}
              </div>
            ) : (
              <div>
                Drag and drop a file here or click to select one
              </div>
            )}
            <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
          </label>
          {uploading ? (
            <Button variant="outlined" disabled>
              <CircularProgress size={20} sx={{ marginRight: 1 }} /> Uploading
            </Button>
          ) : (
            <Button sx={{ marginTop:5,marginBottom:5 }}onClick={handleUpload} variant="outlined" startIcon={<CloudUploadIcon />}>
              Upload File
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default FileUpload;
