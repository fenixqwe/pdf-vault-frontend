import {Outlet} from "react-router-dom";

function Page() {

    return (
        <div className="page-wrapper">
            {/* Здесь может быть общий layout для всех страниц */}
            <Outlet />
        </div>
    );
}

export default Page;