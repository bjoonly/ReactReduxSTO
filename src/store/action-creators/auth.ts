import { LoginAction, AuthActionTypes, RegisterAction, ILoginModel, ILoginResponse, IRegisterModel, LogoutAction, IRegisterError, ILoginError } from "../../types/auth"
import { Dispatch } from "react"
import http from "../../http_common";
import axios, { AxiosError } from "axios";

export const LoginUser = (data: ILoginModel) => {
    return async (dispatch: Dispatch<LoginAction>) => {
        dispatch({ type: AuthActionTypes.LOGIN_AUTH });
        await http.post<ILoginResponse>('api/auth/login', data)
            .then(response => {
                dispatch({
                    type: AuthActionTypes.LOGIN_AUTH_SUCCESS,
                    payload: { id: response.data.user.id, name: response.data.user.name, email: response.data.user.email }
                })
                return Promise.resolve();
            }).catch(error => {
                if (axios.isAxiosError(error)) {
                    const serverError = error as AxiosError<ILoginError>;
                    if (serverError && serverError.response) {
                        dispatch({ type: AuthActionTypes.LOGIN_AUTH_FAILED, payload: serverError.response.data })
                        serverError.response.data.status = serverError.response.status
                        serverError.response.data.error = serverError.response.statusText
                        return Promise.reject(serverError.response.data);
                    }
                }
                return Promise.reject(error.response.status)
            });
    }
}

export const RegisterUser = (data: IRegisterModel) => {
    return async (dispatch: Dispatch<RegisterAction>) => {
        dispatch({ type: AuthActionTypes.REGISTER_AUTH });
        await http.post<ILoginResponse>('api/auth/register', data)
            .then(response => {
                dispatch({
                    type: AuthActionTypes.REGISTER_AUTH_SUCCESS,
                    payload: { id: response.data.user.id, name: response.data.user.name, email: response.data.user.email }
                })
                return Promise.resolve();
            }).catch(error => {
                if (axios.isAxiosError(error)) {
                    const serverError = error as AxiosError<IRegisterError>;
                    if (serverError && serverError.response) {
                        serverError.response.data.status = serverError.response.status
                        serverError.response.data.error = serverError.response.statusText
                        dispatch({ type: AuthActionTypes.REGISTER_AUTH_FAILED, payload: serverError.response.data })
                        return Promise.reject(serverError.response.data);
                    }
                }
                return Promise.reject(error.response.status)
            });
    }
}
export const LogoutUser = () => {
    return async (dispatch: Dispatch<LogoutAction>) => {
        //  await http.post('api/auth/logout')
        //   .then(() => {
        dispatch({
            type: AuthActionTypes.LOGOUT_AUTH_SUCCESS,
        })
        //         return Promise.resolve();
        //   }).catch(error => {
        //     
        //       return Promise.reject(error.response.status)
        //   });
    }
}