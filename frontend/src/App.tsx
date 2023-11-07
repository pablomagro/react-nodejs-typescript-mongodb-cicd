import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2
          className="App-link"
          rel="noopener noreferrer"
        >
          🚀 React App Example 🚀
        </h2>
        <h3>Deployed with AWS CDK 2.0 TypeScript</h3>
      </header>
    </div>
  );
}

export default App;
