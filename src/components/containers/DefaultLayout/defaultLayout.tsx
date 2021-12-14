import { Outlet } from "react-router-dom";
import Header from "./header";

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <div className="container my-2">
                <Outlet />
            </div>
        </>
    );
}

export default DefaultLayout;