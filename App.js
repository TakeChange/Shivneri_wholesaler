import React from 'react';
import AppNavigation from './src/navigaiton/AppNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux_toolkit/store';
import CreditBalanceScreen from './src/screens/CreditBalanceScreen';
const App = () => {

  return (
    <Provider store={store}>
      {/* <AppNavigation /> */}
      <CreditBalanceScreen/>
    </Provider>
  )
};

export default App;