import axios from 'axios';
import { takeLatest, put, call } from '@redux-saga/core/effects';

import { Types, Creators } from '../ducks/map';
import constants from '../../config/constants';

const { BASE_URL } = constants.getConfig();

function* fetchMarkers() {
  try {
    const { data, status } = yield call(
      axios.post,
      `${BASE_URL}/users/sign_in`,
      body,
    );

    if (status === 200) {
      yield put(Creators.signInSuccess(data.token));
    } else {
      throw new Error('Error authenticating user');
    }
  } catch (err) {
    yield put(Creators.signInError(err));
  }
}


export default [
  takeLatest(Types.FETCH_MARKERS, fetchMarkers),
];