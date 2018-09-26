import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from '../components/landing';
import Search from '../components/search';

const AppRouter = () => {
  <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/search" component={search} />
      </Switch>
    </div>
  </BrowserRouter>;
};

export default AppRouter;
