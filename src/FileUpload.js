import { useState } from "react";
import { storage } from "./firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import './App.css';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CircularProgress from '@mui/material/CircularProgress';


function FileUpload({ onUploadComplete }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
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

  return (
    <div>
      <h2>File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      {uploading ? (
        <Button variant="outlined" disabled>
          <CircularProgress size={20} sx={{ marginRight: 1 }} /> Uploading
        </Button>
      ) : (
        <Button onClick={handleUpload} variant="outlined" startIcon={<CloudUploadIcon />}>
          Upload File
        </Button>
      )}
    </div>
  );
}

export default FileUpload;
