import React from "react";
import InputGroup from "../../common/inputGroup";
import * as Yup from 'yup';
import { Formik, Form } from "formik";
import { ILoginModel } from "../../../types/auth";
import { useActions } from "../../../hooks/useActions";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const LoginPage: React.FC = () => {
    const { LoginUser } = useActions();
    const navigate = useNavigate();
    const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/
    const LoginScheme = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().matches(passwordRegExp, 'Password is not valid').required('Password is required'),
    });
    const initialValues: ILoginModel = { email: '', password: '' };


    return (
        <div className="my-3">

            <div className="col-12  col-md-8 col-lg-6 mx-0 mx-md-auto">
                <h1>Login</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={LoginScheme}
                    onSubmit={async (values: ILoginModel) => {
                        try {
                            await LoginUser(values);
                            toast.success("Login is successful!");
                            navigate("/");
                        }
                        catch (ex) {
                            let message = "Login failed! "
                            if (ex === 401) {
                                message += "The user with entered data doesn't exist."
                            }
                            else if (ex === 422) {
                                message += "Validation failed."
                            }
                            toast.error(message);
                        }
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
                            <button type="submit" className="btn btn-primary" >Login</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div >

    );
}

export default LoginPage;