import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";
import './App.css';

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
      <textarea
        value={sharedText}
        onChange={(event) => setSharedText(event.target.value)}
        placeholder="Enter text to share"
      />
      <button onClick={shareData}>Share Text</button>
      <ul>
        {sharedData.map(data => (
          <li key={data.id}>
            {data.text}
            <button onClick={() => copyData(data.text)}>Copy</button>
            <button onClick={() => deleteSharedData(data.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TextShare;
