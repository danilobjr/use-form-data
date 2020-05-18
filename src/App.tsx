import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <form className="form">
        <div className="field">
          <label className="label">Login</label>
          <input className="input" type="text" />
          <span className="message">Error message here</span>
        </div>

        <div className="field -not-valid">
          <label className="label">Password</label>
          <input className="input" type="password" />
          <span className="message">Error message here</span>
        </div>

        <div className="actions">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default App;
