import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from '../components/landing.jsx';
import CharList from '../components/characterList.jsx';
import SearchPage from '../components/searchPage.jsx';

const AppRouter = props => (
  <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <Landing {...props} />} />
        <Route exact path="/charList" render={() => <CharList {...props} />} />
        <Route exact path="/searchSwapi" render={() => <SearchPage {...props} />} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
