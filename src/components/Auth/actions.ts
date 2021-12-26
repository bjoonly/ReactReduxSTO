import { LoginAction, AuthActionTypes, RegisterAction, ILoginModel, ILoginResponse, IRegisterModel, LogoutAction, IRegisterError, ILoginError, IUser, ProfileAction } from "./types"
import { Dispatch } from "react"
import http from "../../http_common";
import axios, { AxiosError } from "axios";
import jwt from "jsonwebtoken";

export const LoginUser = (data: ILoginModel) => {
    return async (dispatch: Dispatch<LoginAction>) => {
        try {
            const response = await http.post<ILoginResponse>('api/auth/login', data)
            const { access_token } = response.data;
            localStorage.token = access_token;
            AuthUser(access_token, dispatch)
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<ILoginError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status
                    serverError.response.data.error = serverError.response.statusText
                    dispatch({ type: AuthActionTypes.LOGIN_AUTH_FAILED, payload: serverError.response.data })
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}
export const AuthUser = (token: string, dispatch: Dispatch<LoginAction>) => {
    const user = jwt.decode(token) as IUser;
    dispatch({
        type: AuthActionTypes.LOGIN_AUTH_SUCCESS,
        payload: { email: user.email, name: "" }
    })
}

export const RegisterUser = (data: IRegisterModel, image: File) => {
    return async (dispatch: Dispatch<RegisterAction>) => {
        try {
            var formData = new FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("password_confirmation", data.password_confirmation);
            formData.append("file", image);
            await http.post<ILoginResponse>('api/auth/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            dispatch({
                type: AuthActionTypes.REGISTER_AUTH_SUCCESS,
            })
            return Promise.resolve();
        }
        catch (ex) {
            if (axios.isAxiosError(ex)) {
                const serverError = ex as AxiosError<IRegisterError>;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status
                    serverError.response.data.error = serverError.response.statusText
                    dispatch({ type: AuthActionTypes.REGISTER_AUTH_FAILED, payload: serverError.response.data })
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(ex)
        }
    }
}
export const LogoutUser = () => {
    return async (dispatch: Dispatch<LogoutAction>) => {
        try {
            // await http.post('api/auth/logout')
            localStorage.removeItem("token");
            dispatch({
                type: AuthActionTypes.LOGOUT_AUTH_SUCCESS,
            })
            return Promise.resolve();
        }
        catch (ex) {
            return Promise.reject(ex)
        }
    }
}

export const GetProfile = () => {
    return async (dispatch: Dispatch<ProfileAction>) => {
        try {
            const response = await http.get<IUser>('api/auth/user-profile')
            dispatch({
                type: AuthActionTypes.GET_PROFILE_SUCCESS,
                payload: { id: response.data.id, email: response.data.email, name: response.data.name, image: response.data.image }
            });
            return Promise.resolve(response.data);

        } catch (ex) {
            return Promise.reject(ex)
        }

    }
}