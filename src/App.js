// App.js
import React from 'react';

import {useState} from 'react';
import './App.css';
import FileUpload from './FileUpload';
import TextShare from './TextShare';
import FileList from './FileList';
import { Card } from '@mui/material';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import { CenterFocusStrong } from '@mui/icons-material';


function App() {

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [uploadCount, setUploadCount] = useState(0);

  const handleUploadComplete = () => {
    setUploadCount(uploadCount + 1); // Incrementing the count triggers a re-render
  };


  return (
    <div className="App">

      
 <center>
  <h1 className='animate-charcter
'>Arjun Share </h1>
<h4>" Nambi Vaanga , Sandhosam ah Ponga ! "</h4>
 </center>

       <TabContext value={value} className="tab" >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Text Share" value="1" />
            <Tab label="File Share" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"> <Card sx={{ width:345,maxWidth: 345,padding: 4 }}>
      <TextShare />
      </Card></TabPanel>
        <TabPanel value="2"><Card sx={{ maxWidth: 345,padding: 8,position:"sticky" }}>
        <FileUpload onUploadComplete={handleUploadComplete} />
      <FileList key={uploadCount} />
</Card></TabPanel>
      </TabContext>



    </div>

  );
}

export default App;
