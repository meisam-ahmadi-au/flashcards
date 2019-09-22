import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import './App.css';
import AddCard from './components/AddCard/AddCard';
import Cards from './components/Cards/Cards';
import Categories from './components/Categories/Categories';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { UsersContext } from './providers/UsersProvider';

const App: React.FC = () => {
  const isAuthenticated = React.useContext(UsersContext);
  return (
    <div className="App">
      <Navbar />
      {isAuthenticated ? (
        <>
          <Route
            exact={true}
            path="/categories/:category/addcard"
            component={AddCard}
          />
          <Route exact={true} path="/categories/:category" component={Cards} />
          <Route exact={true} path="/categories" component={Categories} />
        </>
      ) : null}
      <Route path="/" exact={true} component={Home} />
      <Redirect to="/" />
    </div>
  );
};

export default App;
