export enum ProductActionTypes {
    GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS",
    GET_PRODUCTS_FAILED = "GET_PRODUCTS_FAILED",
    GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS",
    GET_PRODUCT_FAILED = " GET_PRODUCT_FAILED"
}

export interface IProductItem {
    id: number,
    name: string,
    detail: string,
    image?: string
}
export interface IProductSearch {
    page?: number | string | null,
    id?: string | number | null,
    name?: string | null,
    detail?: string | null
}
export interface IProductsResponseModel {
    data: Array<IProductItem>,
    last_page: number
}
export interface IProductResponseModel {
    message: string
    data: IProductItem
}
export interface IProductModel {
    name: string
    detail: string
}

export interface ProductsState {
    products: Array<IProductItem>,
    currentProduct: IProductItem,
    lastPage: number
}

export type IUpsertProductError = {
    status: number,
    name: Array<string>,
    detail: Array<string>,
    error: string
};
export type IProductError = {
    message: string,
    status: number,
    error: string
}

export interface GetProductsSuccessAction {
    type: ProductActionTypes.GET_PRODUCTS_SUCCESS
    payload: { products: Array<IProductItem>, lastPage: number }
}

export interface GetProductSuccessAction {
    type: ProductActionTypes.GET_PRODUCT_SUCCESS
    payload: IProductItem
}

export type ProductsActions = GetProductsSuccessAction | GetProductSuccessAction;

