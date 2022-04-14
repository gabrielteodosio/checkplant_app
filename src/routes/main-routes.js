import MapScreen from "../screens/MapScreen";

import { Colors } from "../theme/colors";

export const mainRoutes = [
  {
    name: 'Map',
    component: MapScreen,
    options: {
      title: 'Mapa',
      headerTintColor: Colors.light,
      headerStyle: {
        backgroundColor: Colors.primary,
      },
    },
  },
]