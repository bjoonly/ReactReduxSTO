import { Link } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { BsPersonCircle } from "react-icons/bs";
import { useActions } from "../../../hooks/useActions";

const Header = () => {
    const { LogoutUser } = useActions();

    const onLogout = async () => {
        await LogoutUser();
    }
    const { isAuth, user } = useTypedSelector((redux) => redux.auth);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Car Service
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {isAuth ? (
                        <>
                            <ul className="navbar-nav  mb-0">
                                <li className="nav-item mr-0">
                                    <Link className="nav-link " to="/products/list">
                                        Product list </Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link " to="/profile">
                                        <BsPersonCircle />
                                        &nbsp;&nbsp;
                                        {user?.email}
                                    </Link>
                                </li>
                                <li className="nav-item nav-link " role="button" onClick={onLogout}>
                                    Logout
                                </li>
                            </ul>
                        </>
                    ) : (
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">
                                    Register
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;