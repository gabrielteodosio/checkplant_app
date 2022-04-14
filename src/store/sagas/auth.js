import axios from 'axios';
import Toast from 'react-native-root-toast';
import { Platform, StatusBar } from 'react-native';
import { takeLatest, put, call, select } from '@redux-saga/core/effects';

import { Types, Creators } from '../ducks/auth';
import constants from '../../config/constants';

const { BASE_URL } = constants.getConfig();

function* signIn({ body, navigation }) {
  try {
    const { data, status } = yield call(
      axios.post,
      `${BASE_URL}/users/sign_in`,
      body,
    );

    if (status === 200) {
      yield put(Creators.signInSuccess(data.token));
      navigation.replace('MapStack');

      Toast.show('Usuário logado com sucesso', {
        delay: 0,
        shadow: true,
        animation: true,
        hideOnPress: true,
        textColor: 'white',
        backgroundColor: 'green',
        position: Platform.select({
          ios: 50,
          android: 20 + StatusBar.currentHeight,
        }),
        duration: Toast.durations.LONG,
      });
    } else {
      throw new Error('Error authenticating user');
    }
  } catch (err) {
    yield put(Creators.signInError(err));
  }
}

function* signOut({ navigation }) {
  const { token } = yield select((state) => state.auth);

  try {
    if (token) {
      yield put(Creators.signOutSuccess());
      navigation.replace('Login');
    } else {
      throw new Error('No user to sign out')
    }
  } catch (error) {
    yield put(Creators.signOutError(error));
  }

}

function* signUp({ body, navigation }) {
  try {
    const { data, status } = yield call(axios.post, `${BASE_URL}/users`, body,
      {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      }
    );

    if (status === 201) {
      yield put(Creators.signUpSuccess(data.token));
      navigation.replace('MapStack');

      Toast.show('Usuário registrado com sucesso', {
        delay: 0,
        shadow: true,
        animation: true,
        hideOnPress: true,
        textColor: 'white',
        backgroundColor: 'green',
        position: Platform.select({
          ios: 50,
          android: 20 + StatusBar.currentHeight,
        }),
        duration: Toast.durations.LONG,
      });
    } else {
      throw new Error('Error authenticating user');
    }
  } catch (err) {
    yield put(Creators.signUpError(err));
  }
}

export default [
  takeLatest(Types.SIGN_IN, signIn),
  takeLatest(Types.SIGN_OUT, signOut),
  takeLatest(Types.SIGN_UP, signUp),
];