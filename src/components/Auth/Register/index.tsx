import { Formik, Form } from "formik";
import React, { useEffect, useRef, useState } from "react";
import InputGroup from "../../common/inputGroup";
import { IRegisterError, IRegisterModel } from "../types";
import { useActions } from "../../../hooks/useActions";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { RegisterScheme } from "./validation";
import { Modal } from 'bootstrap';
import Cropper from 'cropperjs';

const RegisterPage: React.FC = () => {
    const { RegisterUser } = useActions();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [image, setImage] = useState<string>("https://cdn.pixabay.com/photo/2017/01/18/17/39/cloud-computing-1990405_640.png");

    let modal: Modal;
    let cropper: Cropper;

    const modalRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        modal = new Modal(modalRef.current as Element, {
            backdrop: "static",
            keyboard: false
        });
    }, [])

    const selectImage = () => {
        const modalEle = modalRef.current
        const modal = new Modal(modalEle as unknown as Element, {
            backdrop: "static",
            keyboard: false,

        });
        modal.show()
        const image = document.getElementById("cropper-image")
        cropper = new Cropper(image as any, {
            aspectRatio: 1 / 1,
            viewMode: 3,
            dragMode: "move",
            crop(event) { },
        })

    }
    const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files)
            return;
        await setImage(URL.createObjectURL(files[0]))
        await selectImage()

    }

    const initialValues: IRegisterModel = { name: '', email: '', password: '', password_confirmation: '' };
    return (
        <>
            <div className="row d-flex justify-content-center align-items-center ">
                <div className="col-12 col-md-10 col-lg-9">

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

                            <div className="form d-md-flex justify-content-around">
                                <div className="p-2 mb-3 md-md-0 ">
                                    <label htmlFor="image">
                                        <img id="img_preview" className="w-100" src={image} style={{ cursor: "pointer" }} />
                                    </label>
                                    <input name="image" id="image" type="file" accept="image/*" onChange={handleOnChange} className="form-control d-none" />
                                </div>
                                <Form className="p-2 col-12 col-md-7">
                                    <h1>Register</h1>
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
                            </div>
                        )}
                    </Formik>
                </div>
            </div>

            <div className="modal" ref={modalRef} tabIndex={-1}>
                <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body w-100">
                            <p>Modal body text goes here.</p>
                            <div>
                                <img id="cropper-image" src={image} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterPage;