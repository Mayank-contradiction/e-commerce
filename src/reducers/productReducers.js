import { 
    GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS, GET_ALL_PRODUCTS_FAIL,
    GET_ALL_CATEGORIES_REQUEST, GET_ALL_CATEGORIES_SUCCESS, GET_ALL_CATEGORIES_FAIL,
    GET_PRODUCT_BY_CATEGORY_REQUEST, GET_PRODUCT_BY_CATEGORY_SUCCESS, GET_PRODUCT_BY_CATEGORY_FAIL,
    GET_USER_CART_REQUEST, GET_USER_CART_SUCCESS, GET_USER_CART_FAIL,
} from '../constants/productConstants';

export const getProductsReducer = (state = { products: [] }, action) =>{
    switch(action.type){
        case GET_ALL_PRODUCTS_REQUEST:
        case GET_PRODUCT_BY_CATEGORY_REQUEST:
            return{
                ...state,
                productsLoading: true,
                productsError: null
            }
        case GET_ALL_PRODUCTS_SUCCESS:
        case GET_PRODUCT_BY_CATEGORY_SUCCESS:
            return{
                ...state,
                productsLoading: false,
                products: action.payload
            }
        case GET_ALL_PRODUCTS_FAIL:
        case GET_PRODUCT_BY_CATEGORY_FAIL:
            return{
                ...state,
                productsLoading: false,
                productsError: action.payload
            }
        default:
            return state
    }
}

export const getCategoriesReducer = (state = { categories: [] }, action) =>{
    switch(action.type){
        case GET_ALL_CATEGORIES_REQUEST:
            return{
                ...state,
                categoriesLoading: true,
                categoriesError: null
            }
        case GET_ALL_CATEGORIES_SUCCESS:
            return{
                ...state,
                categoriesLoading: false,
                categories: action.payload
            }
        case GET_ALL_CATEGORIES_FAIL:
            return{
                ...state,
                categoriesLoading: false,
                categoriesError: action.payload
            }
        default:
            return state
    }
}

export const getCartReducer = (state = { cartList: [] }, action) =>{
    switch(action.type){
        case GET_USER_CART_REQUEST:
            return{
                ...state,
                cartLoading: true,
                cartError: null
            }
        case GET_USER_CART_SUCCESS:
            return{
                ...state,
                cartLoading: false,
                cartList: action.payload
            }
        case GET_USER_CART_FAIL:
            return{
                ...state,
                cartLoading: false,
                cartError: action.payload
            }
        default:
            return state
    }
}