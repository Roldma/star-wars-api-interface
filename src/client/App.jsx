import React from 'react';
import { Provider } from 'react-redux';

import AppRouter from './router/AppRouter.jsx';
import store from './store';
import './css/styles.css';
import Landing from './components/landing.jsx';

const App = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

export default App;
