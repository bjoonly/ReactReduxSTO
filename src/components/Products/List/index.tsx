import { useEffect, useState } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { IProductSearch } from "../types";
import classNames from "classnames";
const ProductListPage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const { products, lastPage } = useTypedSelector((redux) => redux.product);
    const { GetProducts, DeleteProduct } = useActions();
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState<IProductSearch>(
        {
            page: searchParams.get("page"),
            name: searchParams.get("name"),
        }
    )

    async function getProducts() {
        try {
            setLoading(true)
            let res = await GetProducts(search);
            setLoading(false)
            if (res.length < 1 && search.page && search.page > 1) {
                setSearch({ page: 1 })
                navigate("/products/list")
            }
        }
        catch (ex) {
            let message = "Failed to load products."
            toast.error(message);
            console.log(ex)
        }
    }
    useEffect(() => {
        getProducts()

    }, [search])
    const onDeleteProduct = async (id: number) => {
        try {
            await DeleteProduct(id)
            await getProducts()
            toast.success("Product delete successfully!");
        }
        catch (ex) {
            let message = "Failed to delete product."
            toast.error(message);
        }
    }
    const buttons = [];
    for (var i = 1; i <= lastPage; i++) {
        buttons.push(i);
    }
    return (
        <>
            {loading ? <h2>Loading...</h2> :
                <>
                    <div className="row">
                        <h1>Product List</h1>
                        <Link className="btn col-3 my-auto ms-auto me-3 btn-success btn-lg w-auto" to={"/products/add"}>
                            Add product
                        </Link>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" >Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Details</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td width="15%">{item.id}</td>
                                        <td width="32%">{item.name}</td>
                                        <td width="32%">{item.detail}</td>
                                        <td >
                                            <div className="text-end">
                                                <Link className="btn btn-warning w-auto mx-1" to={'/products/edit?id=' + item.id}>
                                                    <BsPencilFill className=" mx-2 mb-1" color="white" />
                                                </Link>
                                                <button className="btn btn-danger w-auto mx-1 " key={item.id} onClick={() => onDeleteProduct(item.id)}  >
                                                    <BsTrashFill className=" mx-2 mb-1" color="white" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table >
                    <div className="text-center">
                        {buttons.map((item, key) => {
                            return (
                                <Link
                                    onClick={() => {
                                        setSearch({ page: item })
                                    }}
                                    key={key}
                                    to={"/products/list?page=" + item}
                                    className={classNames("btn btn-primary mx-2",
                                        { "disabled": item.toString() === search.page?.toString() })}
                                >
                                    {item}
                                </Link>
                            );
                        })}
                    </div>
                </>
            }
        </>
    );
}

export default ProductListPage;