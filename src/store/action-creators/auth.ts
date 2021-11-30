import { AuthAction, AuthActionTypes, ILoginModel, ILoginResponseUser } from "../../types/auth"
import { Dispatch } from "react"
import http from "../../http_common";


export const LoginUser = (data: ILoginModel) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({ type: AuthActionTypes.LOGIN_AUTH });
            const response = await http.post<ILoginResponseUser>('api/auth/login', data);
            dispatch({
                type: AuthActionTypes.LOGIN_AUTH_SUCCESS,
                payload: { email: response.data.user.email, image: "image.jpg" }
            });
        }
        catch (error) {
            dispatch({ type: AuthActionTypes.LOGIN_AUTH_FAILED, payload: "Error" })
        }
    }
}
