import { useEffect, useState } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from 'react-toastify';
import qs from "qs";
import { IProductSearch } from "../types";
import classNames from "classnames";
import { url } from "../../../http_common"

const ProductListPage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const { products, lastPage } = useTypedSelector((redux) => redux.product);
    const { GetProducts, DeleteProduct } = useActions();
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState<IProductSearch>(
        {
            page: searchParams.get("page"),
            id: searchParams.get("id"),
            name: searchParams.get("name"),
            detail: searchParams.get("detail"),
        }
    )

    async function getProducts() {
        try {
            setLoading(true)
            let res = await GetProducts(search);
            setLoading(false)
            if (res.length < 1 && search.page && search.page > 1) {
                let data: IProductSearch = {
                    ...search,
                    page: 1
                };
                setSearch(data)
                setSearchParams(qs.stringify(data));
                navigate("/products/list?" + qs.stringify(data))
            }
        }
        catch (ex) {
            setLoading(false)
            let message = "Failed to load products."
            toast.error(message);
            console.log(ex)
        }
    }

    useEffect(() => {
        getProducts()

    }, [search.page])

    const onDeleteProduct = async (id: number) => {
        try {
            await DeleteProduct(id)
            await getProducts()
            toast.success("Product delete successfully!");
        }
        catch (ex) {
            setLoading(false)
            let message = "Failed to delete product."
            toast.error(message);
        }
    }
    const buttons = [];
    for (var i = 1; i <= lastPage; i++) {
        buttons.push(i);
    }
    const onChangeIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let data: IProductSearch = {
            ...search,
            id: e.target.value,
        };
        setSearch(data);
    }
    const onChangeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let data: IProductSearch = {
            ...search,
            name: e.target.value,
        };
        setSearch(data);
    }
    const onChangeDetailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let data: IProductSearch = {
            ...search,
            detail: e.target.value,
        };
        setSearch(data);
    }
    const onClickSearch = () => {
        let data: IProductSearch = {
            ...search,
            page: 1
        };
        setSearch(data)
        setSearchParams(qs.stringify(data));
        getProducts()
    }
    return (
        <>
            {loading ? <h2>Loading...</h2> :
                <>
                    <div className="row ">
                        <h1>Product List</h1>
                        <div className="col-12 col-sm-6 col-md-3 col-ld-1 px-md-0 ms-auto">
                            <Link className="btn btn-success btn-lg w-100" to={"/products/add"}>
                                Add product
                            </Link>
                        </div>
                    </div>

                    <div className="row my-2 ">
                        <div className="col-12 py-2 py-md-0 col-sm-6 col-md">
                            <input type="text" className="form-control" placeholder="id" value={search.id ?? ""} onChange={onChangeIdHandler} />
                        </div>
                        <div className="col-12 py-2 py-md-0 col-sm-6 col-md">
                            <input type="text" className="form-control" placeholder="name" value={search.name ?? ""} onChange={onChangeNameHandler} />
                        </div>
                        <div className="col-12 py-2 py-md-0 col-sm-6 col-md">
                            <input type="text" className="form-control" placeholder="detail" value={search.detail ?? ""} onChange={onChangeDetailHandler} />
                        </div>
                        <div className="col-12 py-2 py-md-0 col-sm-6 col-md-3 col-lg-2 px-md-0 ms-auto">
                            <Link className="btn btn-primary w-100" onClick={onClickSearch} to={"?" + qs.stringify({ page: 1, id: search.id, name: search.name, detail: search.detail })}>Search</Link>
                        </div>
                    </div>


                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" >Id</th>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Details</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td width="10%">{item.id}</td>
                                        <td width="15%">
                                            <img src={`${url}${item.image}`} alt='image' width='100' />
                                        </td>
                                        <td width="25%">{item.name}</td>
                                        <td width="25%">{item.detail}</td>
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
                            const data: IProductSearch = {
                                ...search,
                                page: item,
                            };
                            return (
                                <Link
                                    onClick={() => {
                                        setSearch(data);
                                        setSearchParams(qs.stringify(data));
                                    }}
                                    key={key}
                                    to={"?" + qs.stringify(data)}
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