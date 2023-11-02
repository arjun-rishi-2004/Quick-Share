import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";
import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function TextShare() {
  const [sharedText, setSharedText] = useState("");
  const sharedCollectionRef = collection(db, "shared_data");
  const [sharedData, setSharedData] = useState([]);

  const shareData = async () => {
    await addDoc(sharedCollectionRef, { text: sharedText });
    setSharedText("");
  }

  const getSharedData = async () => {
    const data = await getDocs(sharedCollectionRef);
    setSharedData(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  }

  const deleteSharedData = async (id) => {
    const sharedDoc = doc(db, "shared_data", id);
    await deleteDoc(sharedDoc);
    getSharedData();
  }

  const copyData = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert("Text copied to clipboard");
      })
      .catch((error) => {
        console.error("Copy to clipboard failed:", error);
      });
  }

  useEffect(() => {
    getSharedData();
  }, []);

  return (
    <div>
      <h2>Text Sharing</h2>
    
<TextField
          id="outlined-multiline-flexible"
          label="Enter your text here"
          multiline
          maxRows={20}
          value={sharedText}
          onChange={(event) => setSharedText(event.target.value)}
        />
    <Button onClick={shareData} variant="outlined" endIcon={<SendIcon />}>
        Share
      </Button>
   


      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
  

  {
  sharedData.map((data) => (
          <Card sx={{ maxWidth: 345,padding:1, marginTop:1 }}>

    

    <CardContent>
      {data.text}
    </CardContent>


    <CardActions>

    <Button color="secondary" variant="outlined" onClick={() => copyData(data.text)}>Copy</Button>
        <Button variant="outlined" onClick={() => deleteSharedData(data.id)} startIcon={<DeleteIcon />}>
  Delete
</Button>
</CardActions>

</Card>

  ))}

</List>



    </div>
  );
}

export default TextShare;
