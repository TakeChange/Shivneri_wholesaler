import React from 'react';
import AppNavigation from './src/navigaiton/AppNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/Store';
import BillScreen from './src/screens/BillScreen';
import LoginScreen from './src/screens/LoginScreen';
import CategoryScreen from './src/screens/CategoryScreen';


const App = () => {

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  )
};

export default App;