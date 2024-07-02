import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import rootReducer from './reducer';

const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const persistsConfig = {
  key: 'root',
  storage,
};

export default function configureStore(preloadedState) {
  const persistedReducer = persistReducer(persistsConfig, rootReducer);

  const store = createStore(persistedReducer, preloadedState, composeEnhancers(applyMiddleware(thunk)));

  const persistor = persistStore(store);

  return { store, persistor };
}
