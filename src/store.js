import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { getProductsReducer, getSingleProductReducer, getCategoriesReducer, getCartReducer, addProductInCartReducer } from './reducers/productReducers';

const reducer = combineReducers({
    productsList : getProductsReducer,
    productById : getSingleProductReducer,
    categories : getCategoriesReducer,
    cartListStore : getCartReducer,
    addProductInCartResponse : addProductInCartReducer
})

let initialState = {};

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;