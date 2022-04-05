import { 
    GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS, GET_ALL_PRODUCTS_FAIL,
    GET_ALL_CATEGORIES_REQUEST, GET_ALL_CATEGORIES_SUCCESS, GET_ALL_CATEGORIES_FAIL,
    GET_PRODUCT_BY_CATEGORY_REQUEST, GET_PRODUCT_BY_CATEGORY_SUCCESS, GET_PRODUCT_BY_CATEGORY_FAIL,
    GET_USER_CART_REQUEST, GET_USER_CART_SUCCESS, GET_USER_CART_FAIL,
} from '../constants/productConstants';

const BASE_URL = 'https://fakestoreapi.com/';

// Load list of all products
export const getAllProducts = () => async (dispatch) => {
    try{
        dispatch({type : GET_ALL_PRODUCTS_REQUEST})
        const response = await fetch(`${ BASE_URL }products`);
        const data = await response.json();
        dispatch({
            type: GET_ALL_PRODUCTS_SUCCESS,
            payload: data
        })
    }catch(error) {
        dispatch({
            type: GET_ALL_PRODUCTS_FAIL,
            payload: error
        })
    }
}

// Load all categories
export const getCategoryList = () => async (dispatch) => {
    try{
        dispatch({type : GET_ALL_CATEGORIES_REQUEST})
        const response = await fetch(`${ BASE_URL }products/categories`);
        const data = await response.json();
        dispatch({
            type: GET_ALL_CATEGORIES_SUCCESS,
            payload: data
        })
    }catch(error) {
        dispatch({
            type: GET_ALL_CATEGORIES_FAIL,
            payload: error
        })
    }
}

// Load products in a category
export const getProductsByCate = (category) => async (dispatch) => {
    try{
        dispatch({type : GET_PRODUCT_BY_CATEGORY_REQUEST})
        const response = await fetch(`${ BASE_URL }products/category/${category}`);
        const data = await response.json();
        dispatch({
            type: GET_PRODUCT_BY_CATEGORY_SUCCESS,
            payload: data
        })
    }catch(error) {
        dispatch({
            type: GET_PRODUCT_BY_CATEGORY_FAIL,
            payload: error
        })
    }
}

// Load cart of user
export const getCarts = () => async (dispatch) => {
    try{
        dispatch({type : GET_USER_CART_REQUEST})
        const response = await fetch(`${ BASE_URL }carts/user/1`);
        const data = await response.json();
        dispatch({
            type: GET_USER_CART_SUCCESS,
            payload: data
        })
    }catch(error) {
        dispatch({
            type: GET_USER_CART_FAIL,
            payload: error
        })
    }
}