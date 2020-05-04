import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers';
import sagas from './sagas';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const middlewares = [sagaMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(
    persistedReducer,
    initialState,
    compose(...enhancers)
  );
  const persistor = persistStore(store);

  store.runSaga = sagaMiddleware.run;

  store.runSaga(sagas);

  return { store, persistor };
}
