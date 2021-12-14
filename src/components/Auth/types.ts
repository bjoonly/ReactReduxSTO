export enum AuthActionTypes {
    LOGIN_AUTH = "LOGIN_AUTH",
    LOGIN_AUTH_SUCCESS = " LOGIN_AUTH_SUCCESS",
    LOGIN_AUTH_FAILED = "LOGIN_AUTH_FAILED",
    REGISTER_AUTH = "REGISTER_AUTH",
    REGISTER_AUTH_SUCCESS = " REGISTER_AUTH_SUCCESS",
    REGISTER_AUTH_FAILED = "REGISTER_AUTH_FAILED",
    LOGOUT_AUTH_SUCCESS = "LOGOUT_AUTH_SUCCESS",
    GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS",
    GET_PROFILE_FAILED = "GET_PROFILE_FAILED"
}

export type ILoginError = {
    status: number,
    email: Array<string>,
    password: Array<string>,
    error: string
};
export type IRegisterError = {
    status: number,
    name: Array<string>,
    email: Array<string>,
    password: Array<string>,
    error: string
};
export interface ILoginModel {
    email: string,
    password: string
}
export interface IRegisterModel {
    name: string,
    email: string,
    password: string,
    password_confirmation: string
};

export interface IUser {
    id?: number,
    email: string,
    name: string
}

export interface ILoginResponse {
    expires_in: string,
    access_token: string,
}


export interface AuthState {
    user: IUser,
    isAuth: boolean,
    loading: boolean,
    error: null | string | IRegisterError | ILoginError
}

export interface LoginAuthAction {
    type: AuthActionTypes.LOGIN_AUTH
}
export interface GetProfileSuccessAction {
    type: AuthActionTypes.GET_PROFILE_SUCCESS,
    payload: IUser
}
export interface GetProfileFailedAction {
    type: AuthActionTypes.GET_PROFILE_FAILED,
    payload: string
}
export interface LoginAuthSuccessAction {
    type: AuthActionTypes.LOGIN_AUTH_SUCCESS,
    payload: IUser
}

export interface LoginAuthFailedAction {
    type: AuthActionTypes.LOGIN_AUTH_FAILED,
    payload: string | ILoginError
}

export interface RegisterAuthAction {
    type: AuthActionTypes.REGISTER_AUTH
}

export interface RegisterAuthSuccessAction {
    type: AuthActionTypes.REGISTER_AUTH_SUCCESS,
    //payload: IUser
}

export interface RegisterAuthFailedAction {
    type: AuthActionTypes.REGISTER_AUTH_FAILED,
    payload: string | IRegisterError
}
export interface LogoutAuthSuccessAction {
    type: AuthActionTypes.LOGOUT_AUTH_SUCCESS,
}

export type LoginAction = LoginAuthAction | LoginAuthSuccessAction | LoginAuthFailedAction;
export type RegisterAction = RegisterAuthAction | RegisterAuthSuccessAction | RegisterAuthFailedAction;
export type LogoutAction = LogoutAuthSuccessAction;
export type ProfileAction = GetProfileSuccessAction | GetProfileFailedAction;
