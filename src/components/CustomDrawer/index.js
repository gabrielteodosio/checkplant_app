import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'

import CustomDrawerList from '../CustomDrawerList'
import { Creators as AuthActions } from '../../store/ducks/auth';

const CustomDrawer = ({ authNavigation, signOut, ...props }) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ justifyContent: 'space-between', flex: 1 }}>
      <CustomDrawerList {...props} />
      <View />
      <DrawerItem
        label="Sair"
        onPress={() => signOut(authNavigation)}
      />
    </DrawerContentScrollView>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  signOut: AuthActions.signOut,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomDrawer)