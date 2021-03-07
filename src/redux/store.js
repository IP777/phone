import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";

// const rootReducer = combineReducers({
// 	session: sessionReducer,
// 	content: contentReducer,
// 	recipe: recipeReducer,
// });
const rootReducer = combineReducers({
	//
});

const middleware = [ReduxThunk];
const enhancer = applyMiddleware(...middleware);

const store = createStore(rootReducer, composeWithDevTools(enhancer));

export default store;
