import { LoginAction, AuthState, RegisterAction, AuthActionTypes } from "../../types/auth";

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

export const authReducer = (state = initialState, action: LoginAction | RegisterAction): AuthState => {

    switch (action.type) {
        case AuthActionTypes.LOGIN_AUTH_SUCCESS: {
            return {
                ...state,
                user: action.payload,
                isAuth: true
            }
        }

        case AuthActionTypes.LOGIN_AUTH_FAILED: {
            return {
                ...state,
                isAuth: false,
                error: action.payload
            }
        }
        default:
            return state;
    }
}