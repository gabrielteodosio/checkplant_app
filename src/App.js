import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { routes } from './routes/routes';

const App = () => {
  const MainStack = createNativeStackNavigator()

  return (
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
  );
};

export default App;
