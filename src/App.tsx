import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import AddCard from './components/AddCard/AddCard';
import AllCards from './components/AllCards/AllCards';
import Cards from './components/Cards/Cards';
import Categories from './components/Categories/Categories';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { Modal } from './components/Portal/Portal';
import ShowIf from './components/ShowIf/ShowIf';
import Spinner from './components/Spinner/Spinner';
import { IReduxStates } from './store/reducers/states';

const App: React.FC = props => {
  const isLoading = useSelector((s: IReduxStates) => s.general.isLoading);
  console.log({ props });
  return (
    <div className="app">
      {isLoading && (
        <Modal>
          <Spinner />
        </Modal>
      )}
      <Navbar />
      <div className="app__body">
        <Route exact={true} path="/" component={Home} />
        <ShowIf.Logged>
          <Route
            exact={true}
            path="/categories/:category/addcard"
            component={AddCard}
          />
          <Route
            exact={true}
            path="/categories/:category/allcards"
            component={AllCards}
          />
          <Route exact={true} path="/categories/:category" component={Cards} />
          <Route exact={true} path="/categories" component={Categories} />
        </ShowIf.Logged>
        <Route path="/:anythingelse">
          <Redirect to="/" />
        </Route>
      </div>
    </div>
  );
};

export default App;
