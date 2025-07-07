import logo from "@/assets/pdf_logo.svg"

function HeaderBar() {
    return (
        <header className={"header w-full flex justify-center items-center py-[20px]"}>
            <div className={"header-wrapper flex justify-center items-center gap-[10px]"}>
                <div className={"logo-block max-w-[70px] max-h-[80px]"}>
                    <img src={logo} alt="logo"/>
                </div>
                <div className={"title-block text-[70px] font-medium text-[#E2E8F0] "}>
                    <p>PDF Vault</p>
                </div>
            </div>
        </header>
    );
}

export default HeaderBar;