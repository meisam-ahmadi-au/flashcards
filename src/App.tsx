import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import AddCard from './components/AddCard/AddCard';
import Authenticate from './components/Authenticate/Authenticate';
import GoogleAuthentication from './components/Authenticate/GoogleAuthentication';
import CategoryContainer from './components/Decks/DeckContainer';

const App: React.FC = () => {
  // const [isAuthenticated, setAuthenticate] = React.useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <GoogleAuthentication />
        <Switch>
          <Route path="/signin" component={Authenticate} />
          <Route path="/addcard" component={AddCard} />
          <Route path="/" exact={true} component={CategoryContainer} />
          <Redirect to="/signin"/>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
