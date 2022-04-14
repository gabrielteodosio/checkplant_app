import * as React from 'react';
import {
  CommonActions,
  DrawerActions,
  useLinkBuilder,
} from '@react-navigation/native';

import { DrawerItem } from '@react-navigation/drawer';

export default function CustomDrawerList({
  state,
  navigation,
  descriptors,
  activeTintColor,
  inactiveTintColor,
  activeBackgroundColor,
  inactiveBackgroundColor,
  itemStyle,
  labelStyle,
}) {
  const buildLink = useLinkBuilder();

  return state.routes.map((route, i) => {
    const focused = i === state.index;
    const { title, drawerLabel, drawerIcon, onPress } = descriptors[route.key].options;

    return (
      <DrawerItem
        key={route.key}
        icon={drawerIcon}
        focused={focused}
        activeTintColor={activeTintColor}
        inactiveTintColor={inactiveTintColor}
        label={drawerLabel || title || route.name}
        activeBackgroundColor={activeBackgroundColor}
        inactiveBackgroundColor={inactiveBackgroundColor}
        labelStyle={labelStyle}
        style={itemStyle}
        to={buildLink(route.name, route.params)}
        onPress={
          onPress
            ? () => onPress(navigation)
            : () => {
              navigation.dispatch({
                ...(focused
                  ? DrawerActions.closeDrawer()
                  : CommonActions.navigate(route.name)),
                target: state.key,
              });
            }
        }
      />
    );
  });
}