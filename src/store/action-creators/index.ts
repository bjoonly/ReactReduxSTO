import * as AuthActionCreators from '../../components/Auth/actions';
import * as ProductActionCreators from "../../components/Products/actions"
export default {
    ...AuthActionCreators,
    ...ProductActionCreators
}