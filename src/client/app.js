import React from 'react';
import { Provider } from 'react-redux';

import './css/styles.css';
import AppRouter from './router/AppRouter';
import store from './store';

const App = () => {
  <Provider store={store}>
    <AppRouter />
  </Provider>;
};

export default App;
