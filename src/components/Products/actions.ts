import { Dispatch } from "react"
import { IProductError, IProductModel, IProductsResponseModel, IUpsertProductError, ProductsActions, ProductActionTypes, IProductItem, IProductResponseModel, IProductSearch } from "./types"
import http from "../../http_common";
import axios, { AxiosError } from "axios";

export const GetProducts = (search: IProductSearch) => {
    return async (dispatch: Dispatch<ProductsActions>) => {
        try {
            let response = await http.get<IProductsResponseModel>('api/products/index',
                {
                    params: search
                })
            dispatch({
                type: ProductActionTypes.GET_PRODUCTS_SUCCESS,
                payload: { products: response.data.data, lastPage: response.data.last_page }
            });
            return Promise.resolve(response.data.data)
        }
        catch (ex) {
            return Promise.reject(ex)
        }
    }
}

export const AddProduct = (data: IProductModel) => {
    return async (dispatch: Dispatch<ProductsActions>) => {
        try {
            const response = await http.post<IProductsResponseModel>('api/products/store', data)
            return Promise.resolve(response);
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<IUpsertProductError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status
                    serverError.response.data.error = serverError.response.statusText
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}
export const DeleteProduct = (id: number) => {
    return async (dispatch: Dispatch<ProductsActions>) => {
        try {
            await http.delete<IProductsResponseModel>(`api/products/destroy/${id}`)
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<IProductError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status
                    serverError.response.data.error = serverError.response.statusText
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}
export const UpdateProduct = (data: IProductItem) => {
    return async (dispatch: Dispatch<ProductsActions>) => {
        try {
            await http.put<IProductResponseModel>(`api/products/update/${data.id}`, data)
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<IUpsertProductError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status
                    serverError.response.data.error = serverError.response.statusText
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}
export const GetProduct = (id: number | string) => {
    return async (dispatch: Dispatch<ProductsActions>) => {
        try {
            const response = await http.get<IProductResponseModel>(`api/products/show/${id}`)

            dispatch({
                type: ProductActionTypes.GET_PRODUCT_SUCCESS,
                payload: { id: response.data.data.id, name: response.data.data.name, detail: response.data.data.detail }
            });
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<IProductError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status
                    serverError.response.data.error = serverError.response.statusText
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}