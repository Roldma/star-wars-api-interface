import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from '../components/landing.jsx';
import CharList from '../components/characterList.jsx';

const AppRouter = () => (
  <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/charList" component={CharList} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
