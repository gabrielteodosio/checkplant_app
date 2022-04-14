import LoginScreen from "../screens/LoginScreen";
import SplashScreen from "../screens/SplashScreen";
import RegisterScreen from "../screens/RegisterScreen";

export const authRoutes = [
  {
    name: 'Splash',
    component: SplashScreen,
  },
  {
    name: 'Login',
    component: LoginScreen,
  },
  {
    name: 'Register',
    component: RegisterScreen,
  },
]