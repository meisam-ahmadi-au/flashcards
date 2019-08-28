import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import './App.css';
import AddCard from './components/AddCard/AddCard';
import Categories from './components/Categories/Categories';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { UsersContext } from './providers/UsersProvider';

const App: React.FC = () => {
  const isAuthenticated = React.useContext(UsersContext);
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        {isAuthenticated ? (
          <>
            <Route exact={true} path="/addcard" component={AddCard} />
            <Route exact={true} path="/categories" component={Categories} />
          </>
        ) : null}
        <Route path="/" exact={true} component={Home} />
        <Redirect to="/" />
      </div>
    </BrowserRouter>
  );
};

export default App;
