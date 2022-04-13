import { all } from '@redux-saga/core/effects';
import auth from './auth';

export default function* rootSaga() {
  yield all([...auth]);
}