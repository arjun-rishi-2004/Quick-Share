// FileUpload.js
import { useState } from "react";
import { storage } from "./firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import './App.css';

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
      <button onClick={handleUpload}>Upload File</button>
    </div>
  );
}

export default FileUpload;
