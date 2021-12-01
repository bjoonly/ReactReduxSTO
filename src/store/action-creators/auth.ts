import { LoginAction, AuthActionTypes, RegisterAction, ILoginModel, ILoginResponse, IRegisterModel } from "../../types/auth"
import { Dispatch } from "react"
import http from "../../http_common";


export const LoginUser = (data: ILoginModel) => {
    return async (dispatch: Dispatch<LoginAction>) => {
        try {
           // dispatch({ type: AuthActionTypes.LOGIN_AUTH });
            const response = await http.post<ILoginResponse>('api/auth/login', data);
            dispatch({
                type: AuthActionTypes.LOGIN_AUTH_SUCCESS,
                payload: response.data.user
            });
            return Promise.resolve();
        }
        catch (error) {
            dispatch({ type: AuthActionTypes.LOGIN_AUTH_FAILED, payload: "Error" })
            return Promise.reject(error);
        }
    }
}

export const RegisterUser = (data: IRegisterModel) => {
    return async (dispatch: Dispatch<RegisterAction>) => {
        try {
        //    dispatch({ type: AuthActionTypes.REGISTER_AUTH });
            const response = await http.post<ILoginResponse>('api/auth/register', data);
            dispatch({
                type: AuthActionTypes.REGISTER_AUTH_SUCCESS,
                payload: response.data.user
            });
            return Promise.resolve();
        }
        catch (error) {
            dispatch({ type: AuthActionTypes.REGISTER_AUTH_FAILED, payload: "Error" })
            return Promise.reject(error);
        }

    }
}


