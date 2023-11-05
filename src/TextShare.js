import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";
import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import SearchBar from './SearchBar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

function TextShare() {
  const [sharedText, setSharedText] = useState("");
  const sharedCollectionRef = collection(db, "shared_data");
  const [sharedData, setSharedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const shareData = async () => {
    await addDoc(sharedCollectionRef, { text: sharedText });
    setSharedText("");
    getSharedData();
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

  // Filter sharedData based on search query
  const filteredSharedData = sharedData.filter(data =>
    data.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Text Sharing</h2>

      <TextField
      sx={{width:345}}
        id="outlined-multiline-flexible"
        label="Enter your text here"
        multiline
        maxRows={20}
        value={sharedText}
        onChange={(event) => setSharedText(event.target.value)}
      />
      <Button onClick={shareData} variant="outlined" endIcon={<SendIcon />} sx={{marginTop:1}}>
        Share
      </Button>

      {/* Add search bar */}
      <SearchBar  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />


      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {filteredSharedData.map((data) => (
          <Card key={data.id} sx={{ maxWidth: 345, padding: 1, marginTop: 1 }}>
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
