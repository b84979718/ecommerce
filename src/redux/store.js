import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import cartReducer from "./cart/cartreducers";

const store = createStore(cartReducer, composeWithDevTools(applyMiddleware()))

export default store