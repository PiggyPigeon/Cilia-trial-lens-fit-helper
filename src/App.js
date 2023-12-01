import React, { useState } from 'react';
import './App.css';

function App() {
  const [simK, setSimK] = useState('');
  const [bfk, setBfk] = useState('');

  const handleInput = (event) => {
    let value = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length > 2) {
      value = value.slice(0, 2) + '.' + value.slice(2);
    }
    setSimK(value);
  };

  const calculate = () => {
    const value = parseFloat(simK);
    const result = Math.round((6.293 + 0.828 * value) * 4) / 4;
    setBfk(result.toFixed(2));
  };

  return (
      <div className="App">
        <header className="App-header">
          <h1>Cilia 视光小助手</h1>
          <div>
            <label htmlFor="simK">Sim K:</label>
            <input
                id="simK"
                value={simK}
                onChange={handleInput}
                onKeyPress={(event) => event.key === 'Enter' && calculate()}
            />
            <button onClick={calculate}>计算</button>
          </div>
          <div>
            推荐 BFK: {bfk}
          </div>
        </header>
      </div>
  );
}

export default App;
