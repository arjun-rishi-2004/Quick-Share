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
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';


function App() {

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">

      
      {/* <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap"  direction="row"
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
      </Stack> */}
       {/* Display the list of uploaded files */}


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

<FileUpload />

<FileList />
</Card></TabPanel>
      </TabContext>



    </div>

  );
}

export default App;
