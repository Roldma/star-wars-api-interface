import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from '../components/landing.jsx';
import CharList from '../components/characterList.jsx';
import SearchPage from '../components/search/searchPage.jsx';

const AppRouter = () => (
  <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/charList" component={CharList} />
        <Route exact path="/searchSwapi" component={SearchPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
