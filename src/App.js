import 'react-native-gesture-handler'

import React from 'react';
import { LogBox } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import './config/Reactotron';

import { routes } from './routes/routes';
import { store, persistor } from './store';

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
  const MainStack = createNativeStackNavigator()

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            <MainStack.Navigator initialRouteName='Login'>
              {routes.map((route, idx) => (
                <MainStack.Screen
                  key={`${new Date().getTime()}-screen-${idx}`}
                  name={route.name}
                  options={route.options}
                  component={route.component}
                />
              ))}
            </MainStack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
