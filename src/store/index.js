import { createStore, compose, applyMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from '@redux-saga/core'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import sagas from './sagas'
import reducers from './ducks'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const middlewares = [];
const enhancers = [];

const sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware);
enhancers.push(applyMiddleware(...middlewares));

// const composer = __DEV__
//   ? compose(
//     ...enhancers,
//     console.tron.createEnhancer(),
//   )
//   : compose(...enhancers);

const composer = compose(...enhancers);

const persistedReducers = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducers, composer);
const persistor = persistStore(store);

sagaMiddleware.run(sagas);

export { store, persistor };
