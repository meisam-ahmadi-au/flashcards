import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import AddCard from './components/AddCard/AddCard';
import AllCards from './components/AllCards/AllCards';
import Cards from './components/Cards/Cards';
import Categories from './components/Categories/Categories';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import ShowIf from './components/ShowIf/ShowIf';

const App: React.FC = () => (
  <div className="app">
    <Navbar />
    <div className="app__body">
      <ShowIf.Authenticated>
        <Route
          exact={true}
          path="/categories/:category/addcard"
          component={AddCard}
        />
        <Route exact={true} path="/categories/:category" component={Cards} />
        <Route
          exact={true}
          path="/categories/:category/allcards"
          component={AllCards}
        />
        <Route exact={true} path="/categories" component={Categories} />
      </ShowIf.Authenticated>
      <Route path="/" exact={true} component={Home} />
      {/* <Redirect to="/" /> */}
    </div>
  </div>
);

export default App;
