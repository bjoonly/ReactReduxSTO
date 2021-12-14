import { LoginAction, AuthState, RegisterAction, AuthActionTypes, LogoutAction, ProfileAction } from "./types";

const initialState: AuthState = {
    user: {
        email: "",
        name: ""
    },
    error: null,
    isAuth: false,
    loading: false
}

export const authReducer = (state = initialState, action: LoginAction | RegisterAction | LogoutAction | ProfileAction): AuthState => {

    switch (action.type) {
        case AuthActionTypes.LOGIN_AUTH_SUCCESS: {
            return {
                ...state,
                user: action.payload,
                isAuth: true,
                error: null,
            }
        }

        case AuthActionTypes.LOGIN_AUTH_FAILED: {
            return {
                ...state,
                isAuth: false,
                error: action.payload
            }
        }
        case AuthActionTypes.REGISTER_AUTH_FAILED: {
            return {
                ...state,
                isAuth: false,
                error: action.payload
            }
        }
        case AuthActionTypes.GET_PROFILE_SUCCESS: {
            return {
                ...state,
                user: action.payload
            }
        }
        case AuthActionTypes.LOGOUT_AUTH_SUCCESS: {
            return {
                ...state,
                user: {
                    email: "",
                    name: ""
                },
                isAuth: false,
                error: null
            }
        }
        default:
            return state;
    }
}