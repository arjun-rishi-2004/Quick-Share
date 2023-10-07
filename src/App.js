import './App.css';
import { useState, useEffect } from 'react';
import { db } from "./firebase-config";
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";

function App() {
  // States for input and data
  const [sharedText, setSharedText] = useState("");
  const sharedCollectionRef = collection(db, "shared_data");
  const [sharedData, setSharedData] = useState([]);

  // Function to share data
  const shareData = async () => {
    await addDoc(sharedCollectionRef, { text: sharedText, timestamp: new Date() });
    setSharedText(""); // Reset input after sharing
  }

  // Function to delete shared data
  const deleteSharedData = async (id) => {
    const sharedDoc = doc(db, "shared_data", id);
    await deleteDoc(sharedDoc);
  }

  // Fetch shared data
  useEffect(() => {
    const getSharedData = async () => {
      const data = await getDocs(sharedCollectionRef);
      setSharedData(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }
    getSharedData();
  }, []);

  return (
    <div className="App">
      <input
        type="text"
        value={sharedText}
        onChange={(event) => setSharedText(event.target.value)}
        placeholder="Enter text to share"
      />
      <button onClick={shareData}>Share</button>
      {
        sharedData.map(data => (
          <div key={data.id}>
            <p>{data.text}</p>
            <p>Shared on: {data.timestamp.toISOString()}</p>
            <button onClick={() => deleteSharedData(data.id)}>Delete</button>
          </div>
        ))
      }
    </div>
  )
}

export default App;
