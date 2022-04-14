import 'react-native-gesture-handler'

import React from 'react';
import { LogBox } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { SafeAreaProvider } from 'react-native-safe-area-context';

import './config/Reactotron';

import { store, persistor } from './store';
import AppRouter from './routes/AppRouter';

if (__DEV__) {
  LogBox.ignoreLogs([
    // 'Warning: componentWillReceiveProps has been renamed',
    'Require cycle:',
    '[RCTRootView cancelTouches]',
    'Calling bridge.imageLoader',
    'Warning: componentWillMount has been renamed',
    'Warning: componentWillReceiveProps has been renamed',
    'ViewPropTypes will be removed from React Native',
  ]);
}

const App = () => {


  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <AppRouter />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
