import './App.css';
import { useState, useEffect } from 'react';
import { db } from "./firebase-config";
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";

function App() {
  const [sharedText, setSharedText] = useState("");
  const sharedCollectionRef = collection(db, "shared_data");
  const [sharedData, setSharedData] = useState([]);
  const [copied, setCopied] = useState(false); // Added state for copy button

  const shareData = async () => {
    await addDoc(sharedCollectionRef, { text: sharedText });
    setSharedText("");
  }
// ...
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
    navigator.clipboard.writeText(text);
    setCopied(true); // Set copied state to true
    setTimeout(() => {
      setCopied(false); // Reset copied state after a brief delay
    }, 1500);
  }

  useEffect(() => {
    const getSharedData = async () => {
      const data = await getDocs(sharedCollectionRef);
      setSharedData(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }
    getSharedData();
  }, [sharedText]);

  return (
    <div className="App">
      <div className="input-container">
        <textarea
          value={sharedText}
          onChange={(event) => setSharedText(event.target.value)}
          placeholder="Enter text to share"
        />
        <button onClick={shareData}>Share</button>
      </div>
      {
        sharedData.map(data => (
          <div className="shared-data" key={data.id}>
            <p>{data.text}</p>
            <div className="button-container">
              <button onClick={() => deleteSharedData(data.id)} className="delete-button">Delete</button>
              <button onClick={() => copyData(data.text)} className="copy-button">
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default App;
