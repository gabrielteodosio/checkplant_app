import { combineReducers } from 'redux';

import { reducer as auth } from './auth';
import { reducer as map } from './map';

const reducers = combineReducers({
  auth,
  map,
});

export default reducers
