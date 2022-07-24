import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// About Persistense 
import {
    persistStore,
    persistReducer
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// Middleware
import createSagaMiddleware from 'redux-saga';

// Sagas
import rootSaga from './rootSaga';

// Reducers
import rootReducer from './rootReducer';

const persistConfig = {
    key: "root",
    storage
};

// Persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));

// Global App Store
const store = createStore(persistedReducer, {}, enhancer);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor};