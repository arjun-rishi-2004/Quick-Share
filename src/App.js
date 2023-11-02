// App.js
import React from 'react';
import './App.css';
import FileUpload from './FileUpload';
import TextShare from './TextShare';
import FileList from './FileList';
import { Card } from '@mui/material';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


function App() {
  return (
    <div className="App">
<div className='center' >

      
      <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap"  direction="row"
  justifyContent="center"
  alignItems="center"
  spacing={2}>

      <Card sx={{ width:345,maxWidth: 345,padding: 4 }}>
      <TextShare />
      </Card>
      <Card sx={{ maxWidth: 345,padding: 8,position:"sticky" }}>

      <FileUpload />

      <FileList />
      </Card>
      </Stack>
       {/* Display the list of uploaded files */}
    </div>

    </div>
  );
}

export default App;
