import { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [sharedText, setSharedText] = useState("");
  const [sharedData, setSharedData] = useState([]);

  const shareData = () => {
    if (sharedText.trim() !== "") {
      setSharedData([...sharedData, sharedText]);
      setSharedText("");
    }
  }

  const deleteSharedData = (index) => {
    const updatedData = [...sharedData];
    updatedData.splice(index, 1);
    setSharedData(updatedData);
  }

  const handleLogin = () => {
    if (username === 'arjun' && password === 'password') {
      setAuthenticated(true);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  }

  const handleLogout = () => {
    setAuthenticated(false);
  }

  return (
    <div className="App">
      {authenticated ? (
        <>
          <div className="input-container">
            <textarea
              value={sharedText}
              onChange={(event) => setSharedText(event.target.value)}
              placeholder="Enter text to share"
            />
            <button onClick={shareData}>Share</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
          {
            sharedData.map((data, index) => (
              <div className="shared-data" key={index}>
                <pre>{data}</pre>
                <div className="button-container">
                  <button onClick={() => deleteSharedData(index)} className="delete-button">Delete</button>
                </div>
              </div>
            ))
          }
        </>
      ) : (
        <div className="login-container">
          <h2>Login</h2>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;
