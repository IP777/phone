import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import sessionReducer from "./reducer/session";
import logger from "./middleware/logger";
//-----------------------------
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
	session: sessionReducer,
});

const persistConfig = {
	key: "userToken",
	storage: storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [ReduxThunk];
const enhancer = applyMiddleware(...middleware);

const store = createStore(persistedReducer, composeWithDevTools(enhancer));
const persistor = persistStore(store);

export { store, persistor };
