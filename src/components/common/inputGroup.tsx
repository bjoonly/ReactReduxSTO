import { Field } from "formik";
import classNames from "classnames";

type AppProps = {
    label: string,
    field: string,
    touched?: boolean | null,
    error?: string | null,
    type?: "text" | "email" | "password",
}

const InputGroup = ({ label, field, touched = null, error = null, type = "text" }: AppProps) => {
    return (
        <>
            <Field type={type}
                name={field}
                className={classNames("form-control",
                    { "is-invalid": touched && error },
                    { "is-valid": touched && !error }
                )}
                id={field}
                placeholder={label} />
            <label htmlFor={field}>{label}</label>
            {touched && error && <div className="invalid-feedback">{error}</div>}
        </>
    );
}

export default InputGroup;