import { all } from '@redux-saga/core/effects';
import auth from './auth';
import map from './map';

export default function* rootSaga() {
  yield all([
    ...auth,
    ...map,
  ]);
}