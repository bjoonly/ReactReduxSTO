import { Formik, Form } from "formik";
import React, { useState } from "react";
import InputGroup from "../../common/inputGroup";
import { IRegisterError, IRegisterModel } from "../types";
import { useActions } from "../../../hooks/useActions";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { RegisterScheme } from "./validation";


const RegisterPage: React.FC = () => {
    const { RegisterUser } = useActions();
    const [loading, setLoading] = useState<boolean>(false);
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
                            setLoading(true)
                            await RegisterUser(values);
                            toast.success("User successfully registered!");
                            navigate("/");
                        }
                        catch (ex) {
                            setLoading(false)
                            const serverErrors = ex as IRegisterError;
                            Object.entries(serverErrors).forEach(([key, value]) => {
                                if (Array.isArray(value)) {
                                    setFieldError(key, value[0]);
                                }
                            });
                            let message = "Register failed!"
                            if (serverErrors.status === 422) {
                                message += "Validation failed."
                            }
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
                            <button type="submit" disabled={loading} className="btn btn-primary">Register</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div >

    );
}

export default RegisterPage;