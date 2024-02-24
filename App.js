import React from 'react';
import AppNavigation from './src/navigaiton/AppNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/Store';

const App = () => {

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  )
};

export default App;