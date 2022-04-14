import axios from 'axios';
import { takeLatest, put, call, select } from '@redux-saga/core/effects';

import { Types, Creators } from '../ducks/map';
import constants from '../../config/constants';

const { BASE_URL } = constants.getConfig();

function* fetchMarkers() {
  const { token } = yield select((state) => state.auth);

  try {
    const { data, status } = yield call(
      axios.get,
      `${BASE_URL}/annotations`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const markers = data.map(({ longitude, latitude, ...marker}) => ({
      ...marker,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    }))

    if (status === 200) {
      yield put(Creators.fetchMarkersSuccess(markers));
    } else {
      throw new Error('Error getting annotations');
    }
  } catch (err) {
    yield put(Creators.fetchMarkersError(err));
  }
}

function* newAnnotation({ annotation }) {
  const { token } = yield select((state) => state.auth);

  try {
    const { data, status } = yield call(
      axios.post,
      `${BASE_URL}/annotations`,
      annotation,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (status === 201) {
      yield put(Creators.newAnnotationSuccess(data));
      yield put(Creators.fetchMarkers());
    } else {
      throw new Error('Error getting annotations');
    }
  } catch (err) {
    yield put(Creators.newAnnotationError(err));
  }
}

export default [
  takeLatest(Types.FETCH_MARKERS, fetchMarkers),
  takeLatest(Types.NEW_ANNOTATION, newAnnotation),
];