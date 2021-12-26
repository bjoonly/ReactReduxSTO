import { Formik, Form } from "formik";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
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
    const modalRef = useRef(null);
    const [fileSelected, setFileSelected] = React.useState<string>("https://cdn.picpng.com/icon/upload-files-icon-66764.png")
    const [cropperObj, setCropperObj] = useState<Cropper>();
    const imgRef = useRef<HTMLImageElement>(null);


    const selectImage = async (url: string) => {
        if (!cropperObj) {
            const cropper = new Cropper(imgRef.current as HTMLImageElement, {
                aspectRatio: 1 / 1,
                viewMode: 1,
                dragMode: 'move',
            });
            cropper.replace(url);
            setCropperObj(cropper);
        }
        else
            cropperObj?.replace(url);

        const modalEle = modalRef.current;
        const bsModal = new Modal(modalEle as unknown as Element, {
            backdrop: "static",
            keyboard: false,
        });
        bsModal.show();
    }

    const base64ImageToBlob = (str: string) => {
        var pos = str.indexOf(';base64,');
        var type = str.substring(5, pos);
        var b64 = str.substr(pos + 8);

        var imageContent = atob(b64);

        var buffer = new ArrayBuffer(imageContent.length);
        var view = new Uint8Array(buffer);

        for (var n = 0; n < imageContent.length; n++) {
            view[n] = imageContent.charCodeAt(n);
        }

        var blob = new Blob([buffer], { type: type });

        return blob;
    }
    const handleImageChange = async function (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;
        if (!fileList || fileList.length == 0) return;
        selectImage(URL.createObjectURL(fileList[0]));
    };

    const rotateImg = () => {
        cropperObj?.rotate(90);
    };

    const modalSave = async function (e: React.MouseEvent<HTMLElement>) {
        const base = cropperObj?.getCroppedCanvas().toDataURL() as string;
        await setFileSelected(base)
    };


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
                                if (cropperObj) {
                                    let blob: Blob;
                                    if (imgRef.current?.src) {
                                        blob = base64ImageToBlob(imgRef.current?.src)
                                        var file = new File([blob], "image");
                                        setLoading(true)
                                        await RegisterUser(values, file);
                                        toast.success("User successfully registered!");
                                        navigate("/");
                                    }
                                }
                                else {
                                    toast.error("Register failed. File is required!");
                                }
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
                                        <img id="img_preview" className="w-100" src={fileSelected} style={{ cursor: "pointer" }} />
                                    </label>
                                    <input name="image" id="image" type="file" accept="image/*" onChange={handleImageChange} className="form-control d-none" />
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
                            <button
                                type="button"
                                className="btn btn-primary mb-3"
                                onClick={rotateImg}
                            >
                                Rotate
                            </button>
                            <div>
                                <img ref={imgRef as LegacyRef<HTMLImageElement>}
                                    src={fileSelected} id="image" />
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
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={modalSave}>
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