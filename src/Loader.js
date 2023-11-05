import React from 'react';
import simbuGif from './simbu-str.gif'; // Assuming simbu-str.gif is in the same directory

// ... rest of your code

const Loader = () => {
  return (
    <div className="loader">
  <img src={simbuGif} alt="Simbu GIF" />
    </div>
  );
}

export default Loader;
