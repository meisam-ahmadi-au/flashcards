import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import AddCard from './components/AddCard/AddCard';
import Authenticate from './components/Authenticate/Authenticate';
import CategoryContainer from './components/Decks/DeckContainer';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';

const App: React.FC = () => {
  const [isAuthenticated, setAuthenticate] = React.useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar setAuthenticate={setAuthenticate} />
        <Switch>
          <Route path="/addcard" component={AddCard} />
          <Route path="/categories" component={CategoryContainer} />
          <Route path="/" exact={true} component={Home} />
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
