import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawer from '../components/CustomDrawer';

import { mainRoutes } from './main-routes';
import { authRoutes } from './auth-routes';

const AppRouter = () => {
  const AuthStack = createNativeStackNavigator()
  const MainDrawer = createDrawerNavigator()

  return (
    <NavigationContainer>
      <AuthStack.Navigator
        initialRouteName='Splash'
        screenOptions={{ headerShown: false }}
      >
        {authRoutes.map((route, authRouteIdx) => (
          <AuthStack.Screen
            name={route.name}
            options={route?.options}
            component={route.component}
            key={`${Date.now()}-authRoute-${authRouteIdx}`}
          />
        ))}
        <AuthStack.Screen
          name={'MapStack'}
          key={`${Date.now()}-authRoute-${Number.MAX_VALUE}`}
        >
          {({ navigation: authNavigation }) => (
            <MainDrawer.Navigator
              initialRouteName="Map"
              drawerContent={(props) => <CustomDrawer authNavigation={authNavigation} {...props} />}
            >
              {mainRoutes.map((route, mapRouteIdx) => (
                <MainDrawer.Screen
                  name={route.name}
                  options={route.options}
                  component={route.component}
                  key={`${Date.now()}-authRoute-${Number.MAX_VALUE}-mapRoute-${mapRouteIdx}`}
                />
              ))}
            </MainDrawer.Navigator>
          )}
        </AuthStack.Screen>
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}

export default AppRouter