import logo from "@/assets/pdf_logo.svg"

function HeaderBar() {
    return (
        <header className={"header w-full flex justify-center items-center py-[20px]"}>
            <div className={"header-wrapper flex justify-center items-center gap-[10px]"}>
                <div className={"logo-block max-w-[70px] max-h-[80px] max-[1024px]:max-w-[50px] max-[1024px]:max-h-[60px]"}>
                    <img src={logo} alt="logo"/>
                </div>
                <div className={"title-block text-[70px] font-medium text-[#E2E8F0] max-[1024px]:text-[50px] max-[400px]:text-[40px]"}>
                    <p>PDF Vault</p>
                </div>
            </div>
        </header>
    );
}

export default HeaderBar;