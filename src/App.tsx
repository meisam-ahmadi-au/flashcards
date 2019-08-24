import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import AddCard from './components/AddCard/AddCard';
import Categories from './components/Decks/Categories';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';

const App: React.FC = () => {
  const [isAuthenticated, setAuthenticate] = React.useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar
          setAuthenticate={setAuthenticate}
          isAuthenticated={isAuthenticated}
        />
        <Switch>
          {isAuthenticated ? (
            <>
              <Route path="/addcard" component={AddCard} protected={true}/>
              <Route path="/categories" component={Categories} />
            </>
          ) : null}
          <Route path="/" exact={true} component={Home} />
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
