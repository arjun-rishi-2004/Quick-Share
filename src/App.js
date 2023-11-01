// App.js
import React from 'react';
import './App.css';
import FileUpload from './FileUpload';
import TextShare from './TextShare';
import FileList from './FileList';
function App() {
  return (
    <div className="App">
      <FileUpload />
      <TextShare />
      <FileList /> {/* Display the list of uploaded files */}
    </div>
  );
}

export default App;
