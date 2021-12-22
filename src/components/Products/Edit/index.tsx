import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import InputGroup from "../../common/inputGroup";
import { useActions } from "../../../hooks/useActions";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { EditProductScheme } from "./validation";
import { IProductError, IProductItem } from "../types";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { url as serverURL } from "../../../http_common"

const EditProductPage: React.FC = () => {
    const { GetProduct, UpdateProduct } = useActions();
    const [loadingPage, setLoadingPage] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { currentProduct } = useTypedSelector((redux) => redux.product);
    const navigate = useNavigate();

    const [file, setFile] = React.useState<string>("")
    const [fileForSend, setFileForSend] = React.useState<File>()

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;

        if (!fileList) return;
        setFile(URL.createObjectURL(fileList[0]))
        setFileForSend(fileList[0]);
    };

    useEffect(() => {
        async function getProduct() {
            try {
                setLoadingPage(true)
                const url = window.location.search;
                const params = new URLSearchParams(url);
                let id = params.get("id");
                if (id === null || id === undefined || id === "")
                    navigate("/products/list");
                else {
                    await GetProduct(id);
                }
                setLoadingPage(false)
            }
            catch (ex) {
                setLoadingPage(false)
                let serverError = ex as IProductError
                toast.error(serverError.message);
                navigate("/products/list");
            }
        }
        getProduct()

    }, [])
    const initialValues: IProductItem = { id: currentProduct.id, name: currentProduct.name, detail: currentProduct.detail };
    return (
        <> {loadingPage ? <h1>Loading ... </h1> :
            <div className="my-3">
                <div className="col-12  col-md-8 col-lg-6 mx-0 mx-md-auto">
                    <h1>Update product</h1>
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        validationSchema={EditProductScheme}
                        onSubmit={async (values: IProductItem, { setFieldError }) => {
                            try {
                                setLoading(true)
                                await UpdateProduct(values, fileForSend);
                                toast.success("Product updated successfully!");
                                navigate("/products/list");

                            }
                            catch (ex) {
                                setLoading(false)
                                const serverErrors = ex as IProductError;
                                Object.entries(serverErrors).forEach(([key, value]) => {
                                    if (Array.isArray(value)) {
                                        setFieldError(key, value[0]);
                                    }
                                });
                                let message = "Failed to update product! "
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
                                        <img src={file == "" ? `${serverURL}${currentProduct.image}` : file}
                                            width="200px"
                                            style={{ cursor: "pointer" }}
                                        />
                                    </label>
                                    <input className="form-control d-none" type="file" name="Image" id="Image" onChange={handleImageChange} />
                                </div>
                                <button type="submit" disabled={loading} className="btn btn-success">Update Product</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div >
        }
        </>
    );
}

export default EditProductPage;