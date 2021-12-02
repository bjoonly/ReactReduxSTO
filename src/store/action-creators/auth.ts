import { LoginAction, AuthActionTypes, RegisterAction, ILoginModel, ILoginResponse, IRegisterModel, LogoutAction } from "../../types/auth"
import { Dispatch } from "react"
import http from "../../http_common";

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
                dispatch({ type: AuthActionTypes.LOGIN_AUTH_FAILED, payload: error.response.statusText })
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
                dispatch({ type: AuthActionTypes.REGISTER_AUTH_FAILED, payload: error.response.statusText })
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