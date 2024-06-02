// App.js
import React from 'react';
import {useState,useEffect} from 'react';
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
import VantaBirds from './VantaBirds'; // Import the component


function App() {

  const [value, setValue] = React.useState('1');
  const [input, setInput] = useState('');
  const[displayType,setDisplayType]=useState("");


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [uploadCount, setUploadCount] = useState(0);

  const handleUploadComplete = () => {
    setUploadCount(uploadCount + 1); // Incrementing the count triggers a re-render
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const newInput = input + event.key.toLowerCase();
    
  
     if (newInput.endsWith('evanesco')) {
        // setBgColor('#ffff00'); // Change background color to yellow
        setDisplayType("None")
        setInput(''); // Reset input
      } 
      else if (newInput.endsWith('aparecium')) {
        // setBgColor('#ffff00'); // Change background color to yellow
        setDisplayType("flex")
        setInput(''); // Reset input
      } else {
        setInput(newInput); // Update input if no cheat code is matched
        
    }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [input]); // Add input as a dependency

  return (
    <div className="App" style={{display: displayType }}  >
      
 <div className='center-content' >
<h1 className='animate-charcter'>Arjun Share </h1>
 <h4 className='sub-head'>" Nambi Vaanga , Sandhosam ah Ponga ! "</h4>
 </div>
 <div className='tab-center'>

       <TabContext value={value} className="tab" >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Text Share" value="1"  />
            <Tab label="File Share" value="2"  />
          </TabList>
        </Box>
        <TabPanel value="1">
        <Card sx={{ 
  maxWidth: 400, 
  padding: 8, 
  margin: '8px', 
  boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
  '@media (max-width: 600px)': { // Apply styles for screens up to 600px wide (adjust as needed)
    maxWidth: '90%', // Set the maximum width to 90% for mobile
    margin: '0 auto', // Center the card horizontally
  padding:2,
  marginLeft:5
  }
}}>
  <TextShare />
</Card>

      </TabPanel>
        <TabPanel value="2">
        <Card sx={{ 
  maxWidth: 400, 
  padding: 8, 
  margin: '8px', 
  boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
  '@media (max-width: 600px)': { // Apply styles for screens up to 600px wide (adjust as needed)
    maxWidth: '90%', // Set the maximum width to 90% for mobile
    margin: '0 auto', // Center the card horizontally
  padding:2,
  marginLeft:5
  }
}}>
        <FileUpload onUploadComplete={handleUploadComplete} />
      <FileList  key={uploadCount} />
</Card></TabPanel>
      </TabContext>



    </div>
    </div>

  );
}

export default App;
