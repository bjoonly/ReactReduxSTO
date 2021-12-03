import React from "react";
import InputGroup from "../../common/inputGroup";
import { Formik, Form } from "formik";
import { ILoginError, ILoginModel } from "../../../types/auth";
import { useActions } from "../../../hooks/useActions";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { LoginScheme } from "./validation";

const LoginPage: React.FC = () => {
    const { LoginUser } = useActions();
    const navigate = useNavigate();

    const initialValues: ILoginModel = { email: '', password: '' };

    return (
        <div className="my-3">

            <div className="col-12  col-md-8 col-lg-6 mx-0 mx-md-auto">
                <h1>Login</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={LoginScheme}
                    onSubmit={async (values: ILoginModel, { setFieldError }) => {
                        try {
                            await LoginUser(values);
                            toast.success("Login is successful!");
                            navigate("/");
                        }
                        catch (ex) {
                            const serverErrors = ex as ILoginError;
                            if (serverErrors.email && serverErrors.email.length > 0) {
                                setFieldError("email", serverErrors.email[0]);
                            }
                            if (serverErrors.password && serverErrors.password.length > 0) {
                                setFieldError("password", serverErrors.password[0]);
                            }
                            let message = "Login failed! "
                            if (serverErrors.status === 401) {
                                message += "The user with entered data doesn't exist."
                            }
                            else if (serverErrors.status === 422) {
                                message += "Validation failed."
                            }
                            toast.error(message);
                        }
                    }}>
                    {({ errors, touched }) => (
                        <Form className="py-2">
                            <div className="form-floating mb-3">
                                <InputGroup
                                    label="Email"
                                    field="email"
                                    touched={touched.email}
                                    error={errors.email}
                                    type="text" />
                            </div>
                            <div className="form-floating mb-3">
                                <InputGroup
                                    label="Password"
                                    field="password"
                                    touched={touched.password}
                                    error={errors.password}
                                    type="password" />
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