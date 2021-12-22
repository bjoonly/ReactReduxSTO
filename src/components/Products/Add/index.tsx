import "cropperjs/dist/cropper.css"
import "bootstrap/dist/css/bootstrap.css"
import { Formik, Form } from "formik";
import React, { useState } from "react";
import InputGroup from "../../common/inputGroup";
import { useActions } from "../../../hooks/useActions";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { CreateProductScheme } from "./validation";
import { IProductModel, IUpsertProductError } from "../types";


const AddProductPage: React.FC = () => {
    const { AddProduct } = useActions();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [file, setFile] = React.useState<string>("https://cdn.picpng.com/icon/upload-files-icon-66764.png")
    const [fileForSend, setFileForSend] = React.useState<File>()

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;

        if (!fileList) return;
        setFile(URL.createObjectURL(fileList[0]))
        setFileForSend(fileList[0]);
    };

    const initialValues: IProductModel = { name: '', detail: '' };


    return (
        <>
            <div className="my-3">
                <div className="col-12  col-md-8 col-lg-6 mx-0 mx-md-auto">
                    <h1>Create product</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={CreateProductScheme}
                        onSubmit={async (values: IProductModel, { setFieldError }) => {
                            try {
                                setLoading(true)
                                if (fileForSend) {
                                    await AddProduct(values, fileForSend);
                                    toast.success("Product added successfully!");
                                    navigate("/products/list");
                                }
                                else {
                                    setLoading(false)
                                    let message = "Failed to add product! File is required."
                                    toast.error(message);
                                }
                            }
                            catch (ex) {
                                setLoading(false)
                                const serverErrors = ex as IUpsertProductError;
                                Object.entries(serverErrors).forEach(([key, value]) => {
                                    if (Array.isArray(value)) {
                                        setFieldError(key, value[0]);
                                    }
                                });
                                let message = "Failed to add product! "
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
                                        label="Detail"
                                        field="detail"
                                        touched={touched.detail}
                                        error={errors.detail} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Image">
                                        <img src={file}
                                            width="200px"
                                            style={{ cursor: "pointer" }}
                                        />
                                    </label>
                                    <input className="form-control d-none" type="file" name="Image" id="Image" onChange={handleImageChange} />
                                </div>
                                <button type="submit" disabled={loading} className="btn btn-success">Create Product</button>
                            </Form>
                        )}
                    </Formik>


                </div>
            </div>


        </>
    );


}
export default AddProductPage;