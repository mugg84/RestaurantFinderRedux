import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/pages/Home';
import About from './Components/pages/About';
import RestaurantInfo from './Components/restaurants/RestaurantInfo';
import { Provider } from 'react-redux';
import store from './store';

import './App.scss';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <main className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/restaurant/:id" component={RestaurantInfo} />
          </Switch>
        </main>
      </Router>
    </Provider>
  );
};

export default App;
