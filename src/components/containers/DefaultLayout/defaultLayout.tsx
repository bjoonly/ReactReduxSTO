import { Outlet } from "react-router-dom";
import Header from "./header";

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <div className="container">
                <Outlet />
            </div>
        </>
    );
}

export default DefaultLayout;