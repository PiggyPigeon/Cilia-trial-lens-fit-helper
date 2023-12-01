import React, { useState } from 'react';
import './App.css';

function App() {
  const [simK, setSimK] = useState('');
  const [bfk, setBfk] = useState('');
  const [lensSuggestion, setLensSuggestion] = useState('');
  const [lensFit, setLensFit] = useState('');
  const [workingLens, setWorkingLens] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleInput = (event) => {
    let value = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length > 2) {
      value = value.slice(0, 2) + '.' + value.slice(2);
    }
    setSimK(value);
  };

  const categorizeBfk = (bfkValue) => {
    if (bfkValue < 31) {
      return "Lens A";
    } else if (bfkValue >= 31 && bfkValue < 41) {
      return "Lens B";
    } else {
      return "Lens C";
    }
  };

  const calculate = () => {
    const value = parseFloat(simK);
    const result = Math.round((6.293 + 0.828 * value) * 4) / 4;
    setBfk(result.toFixed(2));
    setLensSuggestion(categorizeBfk(result));
    setLensFit('');
    setWorkingLens('');
  };

  const handleLensFitChange = (event) => {
    setLensFit(event.target.value);
    setWorkingLens('');
    setSubmissionMessage(''); // Reset submission message
  };

  const handleWorkingLensChange = (event) => {
    setWorkingLens(event.target.value);
    setSubmissionMessage(''); // Reset submission message
  };

  const renderAlternativeLensOptions = () => {
    const lenses = ["Lens A", "Lens B", "Lens C"];
    return lenses.filter(lens => lens !== lensSuggestion).map(lens => (
        <div key={lens}>
          <input
              type="radio"
              id={lens}
              name="workingLens"
              value={lens}
              checked={workingLens === lens}
              onChange={handleWorkingLensChange}
          />
          <label htmlFor={lens}>{lens}</label>
        </div>
    ));
  };

  const handleSubmit = () => {
    setSubmissionMessage("Thank you, this information will help us improve this fit process for everyone!");
    // Here you can also handle the data submission logic
  };

  const showSubmitButton = lensFit === 'Yes' || (lensFit === 'No' && workingLens);

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
            推荐 BFK:  {bfk}
          </div>
          <div>
            Suggested Lens:  {lensSuggestion}
          </div>
          {lensSuggestion && (
              <div>
                Did this lens fit?
                <div>
                  <input
                      type="radio"
                      id="fitYes"
                      name="lensFit"
                      value="Yes"
                      checked={lensFit === 'Yes'}
                      onChange={handleLensFitChange}
                  />
                  <label htmlFor="fitYes">Yes</label>
                </div>
                <div>
                  <input
                      type="radio"
                      id="fitNo"
                      name="lensFit"
                      value="No"
                      checked={lensFit === 'No'}
                      onChange={handleLensFitChange}
                  />
                  <label htmlFor="fitNo">No</label>
                </div>
              </div>
          )}
          {lensFit === 'No' && (
              <div>
                Which lens worked?
                <div>
                  <input
                      type="radio"
                      id="none"
                      name="workingLens"
                      value="None or NA"
                      checked={workingLens === 'None or NA'}
                      onChange={handleWorkingLensChange}
                  />
                  <label htmlFor="none">None or NA</label>
                </div>
                {renderAlternativeLensOptions()}
              </div>
          )}
          {showSubmitButton && (
              <div>
                <button onClick={handleSubmit}>Submit Data</button>
              </div>
          )}

          {submissionMessage && (
              <div>
                {submissionMessage}
              </div>
          )}
        </header>
      </div>
  );
}

export default App;
