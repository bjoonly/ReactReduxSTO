import * as Yup from 'yup';

const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/
export const RegisterScheme = Yup.object().shape({
    name: Yup.string().min(3, "Name must be at least 3 characters").max(50, "Name must be at most 50 characters").required('Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().matches(passwordRegExp, 'Password is not valid').required('Password is required'),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required')
});