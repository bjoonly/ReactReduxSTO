import React from "react";
import InputGroup from "../../common/inputGroup";
import * as Yup from 'yup';
import { Formik, Form } from "formik";
import { ILoginModel } from "../../../types/auth";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import ActionCreators from "../../../store/action-creators";

const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(ActionCreators, dispatch);
}
const LoginPage = () => {
    const { LoginUser } = useActions();
    const LoginScheme = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const initialValues: ILoginModel = { email: '', password: '' };
    return (
        <div className="my-3">
            <div className="col-12  col-md-8 col-lg-6 mx-0 mx-md-auto">
                <h1>Login</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={LoginScheme}
                    onSubmit={(values: ILoginModel) => {
                        LoginUser(values);

                    }}>
                    {({ errors, touched }) => (
                        <Form className="py-2">
                            <div className="form-floating mb-3">
                                <InputGroup label="Email" field="email" type="email" />
                                {touched.email && errors.email && <div className="text-danger mb-2">{errors.email}</div>}
                            </div>
                            <div className="form-floating mb-3">
                                <InputGroup label="Password" field="password" type="password" />
                                {touched.password && errors.password && <div className="text-danger mb-2">{errors.password}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div >

    );
}

export default LoginPage;