import { combineReducers } from "redux";
import { productReducer } from "../../components/Products/reducer";
import { authReducer } from "../../components/Auth/reducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer
});

export type RootState = ReturnType<typeof rootReducer>;