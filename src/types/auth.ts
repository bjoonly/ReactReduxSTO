export enum AuthActionTypes {
    LOGIN_AUTH = "LOGIN_AUTH",
    LOGIN_AUTH_SUCCESS = " LOGIN_AUTH_SUCCESS",
    LOGIN_AUTH_FAILED = "LOGIN_AUTH_FAILED",
}
export interface ILoginModel {
    email: string,
    password: string
}
export interface IRegisterPage {
    name: string,
    email: string,
    password: string,
    confirm_password: string
};
export interface IUser {
    email: string,
    image: string
}

export interface ILoginResponseUser {
    expires_in: string,
    access_token: string,
    user: IUser
}

export interface AuthState {
    user: IUser,
    isAuth: boolean,
    loading: boolean,
    error: null | string
}

export interface LoginAuthAction {
    type: AuthActionTypes.LOGIN_AUTH
}

export interface LoginAuthSuccessAction {
    type: AuthActionTypes.LOGIN_AUTH_SUCCESS,
    payload: IUser
}

export interface LoginAuthFailedAction {
    type: AuthActionTypes.LOGIN_AUTH_FAILED,
    payload: string
}


export type AuthAction = LoginAuthAction | LoginAuthSuccessAction | LoginAuthFailedAction;