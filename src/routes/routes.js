import MapScreen from "../screens/MapScreen";
import LoginScreen from "../screens/LoginScreen";
import SplashScreen from "../screens/SplashScreen";
import RegisterScreen from "../screens/RegisterScreen";

import { Colors } from "../theme/colors";

export const routes = [
  {
    name: 'Splash',
    component: SplashScreen,
    options: { headerShown: false },
  },
  {
    name: 'Login',
    component: LoginScreen,
    options: { headerShown: false },
  },
  {
    name: 'Map',
    component: MapScreen,
    options: {
      title: 'Mapa',
      headerShown: true,
      headerMode: 'screen',
      backgroundColor: Colors.primary,
      headerTintColor: Colors.lighter,
      headerStyle: { backgroundColor: Colors.primary },
    },
  },
  {
    name: 'Register',
    component: RegisterScreen,
    options: { headerShown: false },
  },
]