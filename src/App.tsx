import React from 'react';
import './App.css';
import GoogleAuthentication from './components/Authenticate/GoogleAuthentication'
import CategoryContainer from './components/Decks/DeckContainer';

const App: React.FC = () => {
  return (
    <div className="App">
      <GoogleAuthentication />
      <CategoryContainer />
    </div>
  );
};

export default App;
