import { ProductsActions, ProductActionTypes, ProductsState } from "./types";

const initialState: ProductsState = {
    products: [],
    currentProduct: {
        id: 0,
        name: "",
        detail: ""
    },
    lastPage: 0
}

export const productReducer = (state = initialState, action: ProductsActions) => {
    switch (action.type) {
        case ProductActionTypes.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload.products,
                lastPage: action.payload.lastPage
            }
        case ProductActionTypes.GET_PRODUCT_SUCCESS:
            return {
                ...state,
                currentProduct: action.payload
            }
        default:
            return state;
    }
}