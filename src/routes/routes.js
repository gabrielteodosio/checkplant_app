import MapScreen from "../screens/MapScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

export const routes = [
  {
    name: 'Login',
    component: LoginScreen,
    options: { headerShown: false },
  },
  {
    name: 'Map',
    component: MapScreen,
    options: { headerShown: false },
  },
  {
    name: 'Register',
    component: RegisterScreen,
    options: { headerShown: false },
  },
]