import { Formik, Form } from "formik";
import React from "react";
import InputGroup from "../../common/inputGroup";
import * as Yup from 'yup';
import { IRegisterModel } from "../../../types/auth";
import { useActions } from "../../../hooks/useActions";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const RegisterPage: React.FC = () => {
    const { RegisterUser } = useActions();
    const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/
    const RegisterScheme = Yup.object().shape({
        name: Yup.string().min(3, "Name must be at least 3 characters").max(50, "Name must be at most 50 characters").required('Name is required'),
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().matches(passwordRegExp, 'Password is not valid').required('Password is required'),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required')
    });
    const navigate = useNavigate();

    const initialValues: IRegisterModel = { name: '', email: '', password: '', password_confirmation: '' };
    return (
        <div className="my-3">
            <div className="col-12  col-md-8 col-lg-6 mx-0 mx-md-auto">
                <h1>Register</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={RegisterScheme}
                    onSubmit={async (values: IRegisterModel) => {
                        try {
                            await RegisterUser(values);
                            toast.success("User successfully registered!");
                            navigate("/");
                        }
                        catch (ex) {
                            let message = "Register failed!"
                            toast.error(message);
                        }
                    }}>
                    {({ errors, touched }) => (
                        <Form className="py-2">
                            <div className="form-floating mb-3">
                                <InputGroup label="Name" field="name" />
                                {touched.name && errors.name && <div className="text-danger mb-2">{errors.name}</div>}
                            </div>
                            <div className="form-floating mb-3">
                                <InputGroup label="Email" field="email" type="email" />
                                {touched.email && errors.email && <div className="text-danger mb-2">{errors.email}</div>}
                            </div>
                            <div className="form-floating mb-3">
                                <InputGroup label="Password" field="password" type="password" />
                                {touched.password && errors.password && <div className="text-danger mb-2">{errors.password}</div>}
                            </div>
                            <div className="form-floating mb-3">
                                <InputGroup label="Confirm password" field="password_confirmation" type="password" />
                                {touched.password_confirmation && errors.password_confirmation && <div className="text-danger mb-2">{errors.password_confirmation}</div>}
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