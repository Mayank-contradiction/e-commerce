import { 
    GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS, GET_ALL_PRODUCTS_FAIL,
    GET_SINGLE_PRODUCT_REQUEST, GET_SINGLE_PRODUCT_SUCCESS, GET_SINGLE_PRODUCT_FAIL,
    GET_ALL_CATEGORIES_REQUEST, GET_ALL_CATEGORIES_SUCCESS, GET_ALL_CATEGORIES_FAIL,
    GET_PRODUCT_BY_CATEGORY_REQUEST, GET_PRODUCT_BY_CATEGORY_SUCCESS, GET_PRODUCT_BY_CATEGORY_FAIL,
    GET_USER_CART_REQUEST, GET_USER_CART_SUCCESS, GET_USER_CART_FAIL,
    ADD_PRODUCT_IN_CART_REQUEST, ADD_PRODUCT_IN_CART_SUCCESS, ADD_PRODUCT_IN_CART_FAIL
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

export const getSingleProductReducer = (state = { product: {} }, action) =>{
    switch(action.type){
        case GET_SINGLE_PRODUCT_REQUEST:
            return{
                ...state,
                productLoading: true,
                productError: null
            }
        case GET_SINGLE_PRODUCT_SUCCESS:
            return{
                ...state,
                productLoading: false,
                product: action.payload
            }
        case GET_SINGLE_PRODUCT_FAIL:
            return{
                ...state,
                productLoading: false,
                productError: action.payload
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

// export const getProductByCateReducer = (state = { ProductByCate: {} }, action) =>{
//     switch(action.type){
//         case GET_PRODUCT_BY_CATEGORY_REQUEST:
//             return{
//                 ...state,
//                 ProductByCateLoading: true,
//                 ProductByCateError: null
//             }
//         case GET_PRODUCT_BY_CATEGORY_SUCCESS:
//             return{
//                 ...state,
//                 ProductByCateLoading: false,
//                 ProductByCate: action.payload
//             }
//         case GET_PRODUCT_BY_CATEGORY_FAIL:
//             return{
//                 ...state,
//                 ProductByCateLoading: false,
//                 ProductByCateError: action.payload
//             }
//         default:
//             return state
//     }
// }

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

export const addProductInCartReducer = (state = { addcartProductMessage: {} }, action) =>{
    switch(action.type){
        case ADD_PRODUCT_IN_CART_REQUEST:
            return{
                ...state,
                addcartProductLoading: true,
                addcartProductError: null
            }
        case ADD_PRODUCT_IN_CART_SUCCESS:
            return{
                ...state,
                addcartProductLoading: false,
                addcartProductMessage: action.payload
            }
        case ADD_PRODUCT_IN_CART_FAIL:
            return{
                ...state,
                addcartProductLoading: false,
                addcartProductError: action.payload
            }
        default:
            return state
    }
}