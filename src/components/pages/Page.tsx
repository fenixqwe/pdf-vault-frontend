import {Outlet} from "react-router-dom";

import HeaderBar from "@/components/common/header/HeaderBar.tsx";

function Page() {

    return (
        <div className={"page-wrapper bg-[#1E293B] h-screen flex flex-col"}>
            <HeaderBar />
            <div className={"main-page-block w-full h-full"}>
                <div className={"main-page-block-wrapper w-full h-full flex rounded-t-[20px] p-[30px] transition duration-300 bg-[#CBD5E1]"}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Page;