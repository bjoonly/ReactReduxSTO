import { LoginAction, AuthState, RegisterAction, AuthActionTypes, LogoutAction } from "../../types/auth";

const initialState: AuthState = {
    user: {
        id: 0,
        email: "",
        name: ""
    },
    error: null,
    isAuth: false,
    loading: false
}

export const authReducer = (state = initialState, action: LoginAction | RegisterAction | LogoutAction): AuthState => {

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
        case AuthActionTypes.LOGOUT_AUTH_SUCCESS: {
            return {
                ...state,
                user: {
                    id: 0,
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