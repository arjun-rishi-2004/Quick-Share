// FileUpload.js
import { useState } from "react";
import { storage } from "./firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import './App.css';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (file) {
      const storageRef = ref(storage, `uploaded_files/${file.name}`);
      await uploadBytes(storageRef, file);
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      {/* <button onClick={handleUpload}>Upload File</button> */}
      <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />} onClick={handleUpload} >
  Upload file
  <VisuallyHiddenInput type="file" />
</Button>
    </div>
  );
}

export default FileUpload;
