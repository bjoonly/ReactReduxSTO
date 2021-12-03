import { Formik, Form } from "formik";
import React from "react";
import InputGroup from "../../common/inputGroup";
import { IRegisterError, IRegisterModel } from "../../../types/auth";
import { useActions } from "../../../hooks/useActions";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { RegisterScheme } from "./validation";


const RegisterPage: React.FC = () => {
    const { RegisterUser } = useActions();

    const navigate = useNavigate();

    const initialValues: IRegisterModel = { name: '', email: '', password: '', password_confirmation: '' };
    return (
        <div className="my-3">
            <div className="col-12  col-md-8 col-lg-6 mx-0 mx-md-auto">
                <h1>Register</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={RegisterScheme}
                    onSubmit={async (values: IRegisterModel, { setFieldError }) => {
                        try {
                            await RegisterUser(values);
                            toast.success("User successfully registered!");
                            navigate("/");
                        }
                        catch (ex) {
                            const serverErrors = ex as IRegisterError;
                            if (serverErrors.name && serverErrors.name.length > 0) {
                                setFieldError("name", serverErrors.name[0]);
                            }
                            if (serverErrors.email && serverErrors.email.length > 0) {
                                setFieldError("email", serverErrors.email[0]);
                            }
                            if (serverErrors.password && serverErrors.password.length > 0) {
                                setFieldError("password", serverErrors.password[0]);
                            }
                            let message = "Register failed!"
                            toast.error(message);
                        }
                    }}>
                    {({ errors, touched }) => (
                        <Form className="py-2">
                            <div className="form-floating mb-3">
                                <InputGroup
                                    label="Name"
                                    field="name"
                                    touched={touched.name}
                                    error={errors.name} />
                            </div>
                            <div className="form-floating mb-3">
                                <InputGroup
                                    label="Email"
                                    field="email"
                                    touched={touched.email}
                                    error={errors.email} type="email" />
                            </div>
                            <div className="form-floating mb-3">
                                <InputGroup
                                    label="Password"
                                    field="password"
                                    type="password"
                                    touched={touched.password}
                                    error={errors.password} />
                            </div>
                            <div className="form-floating mb-3">
                                <InputGroup
                                    label="Confirm password"
                                    field="password_confirmation"
                                    type="password"
                                    touched={touched.password_confirmation}
                                    error={errors.password_confirmation} />
                            </div>
                            <button type="submit" className="btn btn-primary">Register</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div >

    );
}

export default RegisterPage;